#!/usr/bin/env node
'use strict';

var layouts = require('metalsmith-layouts');
var autoprefixer = require('metalsmith-autoprefixer');
var markdown = require('metalsmith-markdown');
var beautify = require('metalsmith-beautify');
var ignore = require('metalsmith-ignore');
var discoverPartials = require('metalsmith-discover-partials');
var sass = require('metalsmith-sass');
var s3 = require('metalsmith-s3');

var cons = require('consolidate');
var handlebars = require('handlebars');

var metalsmithPrismicServer = require('metalsmith-prismic-server');
var config = metalsmithPrismicServer.cliConfig;
var utils = require('./utils/utils.js');

function run() {
  handlebars.registerHelper('json', function(context) {
      return JSON.stringify(context);
  });

  // Configure metalsmith-prismic linkResolver
  // Generates prismic links and paths of prismic collections
  // Note: does not affect single prismic files
  // *TEMPLATE* adjust this example function to suit your prismic content and folder structures
  // *TEMPLATE* If ommited, links and paths will be generated with the default format of:
  // *TEMPLATE* "/<document.type>/<document.id>/<document.slug>"
  config.prismicLinkResolver = function(ctx, doc) {
    if (doc.isBroken) {
      return;
    }

    var language = utils.getLanguageFromTags(doc);
    if (language) {
      switch (doc.type) {
        case 'i18n-example':
          return '/' + language + '/' + 'index.html';
        default:
          return '/' + language + '/' + doc.type + '/' +  (doc.uid || doc.slug) + '/index.html';
        }
    } else {
      switch (doc.type) {
        case 'home':
          return 'index.html';
        default:
          return '/' + doc.type + '/' +  (doc.uid || doc.slug) + '/index.html';
      }
    }
  };

  // Metalsmith plugins
  // *TEMPLATE* switch out any plugins to fit your setup
  var plugins = {
    common: [
      // Render markdown files to html
      markdown(),
      // Render with handlebars templates
      layouts({
        engine: 'handlebars',
        directory: 'layouts',
        partials: 'partials',
        //default: 'base.handlebars',
        pattern: '**/*.html'
      }),
      // Style using sass
      sass({
        outputDir: 'style/'
      }),
      // Autoprefix styles
      autoprefixer({
        // Supporting browsers based on these versions
        browsers: ['last 2 versions',
                   '> 5%']
      }),
      // Make output pretty
      beautify({
        indent_size: 2,
        indent_char: ' ',
        wrap_line_length: 0,
        end_with_newline: true,
        css: true,
        html: true
      }),
      // Ignore some superfluous files
      ignore([
        '**/*.scss'
      ])
    ],
    dev: [],
    preview: [],
    build: [
      s3({
        action: 'write',
        bucket: 'metalsmith-prismic-template.futurice.com',
        region: 'eu-west-1'
      })
    ]
  };

  // Start server
  var app = metalsmithPrismicServer.server(plugins, config);
  app.listen();
}

if (require.main === module) {
  // Only run server if run from script
  run();
}
