#!/usr/bin/env node
'use strict';

// Setup env variables from local .env file. After this call, all variables
// from .env file can be access via `process.env`.
var dotEnvLoaded = require('dotenv').config({
    silent: true,
});
console.log('.env file loaded:', dotEnvLoaded);

var autoprefixer = require('metalsmith-autoprefixer');
var beautify = require('metalsmith-beautify');
var ignore = require('metalsmith-ignore');
var layouts = require('metalsmith-layouts');
var markdown = require('metalsmith-markdown');
var s3 = require('metalsmith-s3');
var sass = require('metalsmith-sass');

var metalsmithPrismicServer = require('metalsmith-prismic-server');

var handlebarsHelpers = require('./plugins/handlebars-helpers');
var utils = require('./utils/utils.js');

var argv = require('process').argv;

var config = {
  // See src/config.js in metalsmith-prismic-server for all options

  /**
   * Configure metalsmith-prismic linkResolver
   * Generates prismic links and paths for the files in a prismic collections
   *
   * E.g. The paths for each blog-post in the blog-post.md collection will be generated as:
   *      /blog-post/my-second-blog-post/index.html
   *
   * E.g. The paths for prismic author links will be generated as:
   *      /author/bob/
   *
   * Note: the linkResolver does not affect single prismic files
   *
   * *TEMPLATE* adjust this example function to suit your prismic content and folder structures
   * *TEMPLATE* If omitted, links and paths will be generated with the default format of:
   * *TEMPLATE* "/<document.type>/<document.id>/<document.slug>"
   */
  prismicLinkResolver (ctx, doc) {
    if (doc.isBroken) {
      return;
    }

    // For prismic collection files append 'index.html'
    // Leave it out for prismic link paths
    var filename = doc.data ? 'index.html' : '';

    var language = utils.getLanguageFromTags(doc);
    if (language) {
      // *TEMPLATE-i18n* Use this linkResolver to generate i18n-links based on languages tags defined in Prismic
      // *TEMPLATE-i18n* E.g. The paths for each blog-post in the fi/i18n-blog-post.md collection will be generated as:
      // *TEMPLATE-i18n*      /fi/i18n-blog-post/mun-toka-blogipostaus/index.html
      // *TEMPLATE-i18n* Note: if all documents in prismic have a language tag, the root needs to handled manually
      switch (doc.type) {
        case 'i18n-example':
          return '/' + language + '/' + filename;
        default:
          return '/' + language + '/' + doc.type + '/' +  (doc.uid || doc.slug) + '/' + filename;
      }
    } else {
      switch (doc.type) {
        case 'home':
          return '/' + filename;
        default:
          return '/' + doc.type + '/' +  (doc.uid || doc.slug) + '/' + filename;
      }
    }
  },

  // Metalsmith plugins passed to metalsmithPrismicServer
  plugins: {
    common: [
      // Render markdown files to html
      markdown(),
      // Register handlebars helpers
      handlebarsHelpers(),
      // Render with handlebars templates
      layouts({
        engine: 'handlebars',
        directory: 'layouts',
        partials: 'partials',
        pattern: '**/*.html'
      }),
      // Style using sass
      sass({
        outputDir: 'style/'
      }),
      // Autoprefix styles
      autoprefixer({
        // Support browsers based on these versions
        browsers: ['last 2 versions',
                   '> 5%']
      }),
      // Prettify output
      beautify({
        indent_size: 2,
        indent_char: ' ',
        wrap_line_length: 0,
        end_with_newline: true,
        css: true,
        html: true
      }),
      // Ignore some files
      ignore([
        '**/*.scss'
      ])
    ],
    deploy: [
      s3({
        action: 'write',
        bucket: 'metalsmith-prismic-template.futurice.com',
        region: 'eu-west-1'
      })
    ]
  }
};

function run() {
  // Start server
  switch (argv[2]) {
    case 'dev':
      metalsmithPrismicServer.dev(config);
      break;
    case 'prod':
      metalsmithPrismicServer.prod(config);
      break;
    case 'build':
      metalsmithPrismicServer.build(config, []);
      break;
    default:
      console.error(`invalid command '${argv[2]}'`);
  }
}

if (require.main === module) {
  // Only run server if run from script
  run();
}
