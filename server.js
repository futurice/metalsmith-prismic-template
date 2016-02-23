#!/usr/bin/env node
'use strict';

var layouts = require('metalsmith-layouts');
var less = require('metalsmith-less');
var autoprefixer = require('metalsmith-autoprefixer');
var markdown = require('metalsmith-markdown');
var beautify = require('metalsmith-beautify');
var ignore = require('metalsmith-ignore');
var discoverPartials = require('metalsmith-discover-partials');

var cons = require('consolidate');
var handlebars = require('handlebars');

var metalsmithPrismicServer = require('metalsmith-prismic-server');
var config = metalsmithPrismicServer.cliConfig;

function run() {
  handlebars.registerHelper('json', function(context) {
      return JSON.stringify(context);
  });

  // Configure prismic links
  config.prismicLinkResolver = function(ctx, doc) {
    if (doc.isBroken) {
      return;
    }
    switch (doc.type) {
        case 'home':
            return 'index.html';
        default:
        return '/' + doc.type + '/' +  (doc.uid || doc.slug) + '/index.html';
    }
  };

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
      // Style using less
      less({
        pattern: 'style/**/*.less'
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
        '**/*.less'
      ])
    ],
    dev: [],
    preview: [],
    build: []
  };

  // Start server
  var app = metalsmithPrismicServer.server(plugins, config);
  app.listen();
}

if (require.main === module) {
  // Only run server if run from script
  run();
}
