#!/usr/bin/env node
'use strict';

var layouts = require('metalsmith-layouts');
var autoprefixer = require('metalsmith-autoprefixer');
var markdown = require('metalsmith-markdown');
var beautify = require('metalsmith-beautify');
var ignore = require('metalsmith-ignore');
var discoverPartials = require('metalsmith-discover-partials');
var sass = require('metalsmith-sass');
var ms3 = require('metalsmith-s3');

var cons = require('consolidate');
var handlebars = require('handlebars');

var metalsmithPrismicServer = require('metalsmith-prismic-server');

var argv = require('process').argv;

var plugins = List([]);

var buildPlugins = plugins.push();

var config = {
  // check src/config.js in metalsmith-prismic-server for full options

  prismicUrl: "https://metalsmith-prismic-template.prismic.io/api",

  // *TEMPLATE* adjust this example function to suit your prismic content and folder structures
  prismicLinkResolver (ctx, doc) {
    if (doc.isBroken) {
      return;
    }
    switch (doc.type) {
      case 'home':
        return 'index.html';

      case 'i18n-example':
        var languageTag = doc.tags[0]; //TODO
        var language = '';
        if (languageTag) {
          languageTag = languageTag.split(':');
          language = languageTag ? '/' + languageTag[1] : '';
        }

        return language + '/' + 'index.html';
      default:
        return '/' + doc.type + '/' +  (doc.uid || doc.slug) + '/index.html';
    }
  },

  plugins: {
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
    build: [
      s3({
        action: 'write',
        bucket: 'metalsmith-prismic-template.futurice.com',
        region: 'eu-west-1'
      })
    ]
  }
};

function run() {
  handlebars.registerHelper('json', function(context) {
      return JSON.stringify(context);
  });

  // Start server
  if (argv[2] === 'dev') {
    config.plugins = plugins;
    metalsmithPrismicServer.dev(config);
  } else {
    config.plugins = buildPlugins;
    metalsmithPrismicServer.prod(config);
  }
}

if (require.main === module) {
  // Only run server if run from script
  run();
}
