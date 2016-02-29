# Metalsmith Prismic template

An opinionated, bare bones template for static site generation from [prismic.io](https://prismic.io/) using [metalsmith](https://metalsmith.io/) and deploying to Amazon S3.

## This template includes

* Documentation on how to use this template and best practices
* [Handlebars](https://http://handlebarsjs.com/) templates
* [Sass](http://sass-lang.com/) styling
* [metalsmith-prismic-server](https://github.com/futurice/metalsmith-prismic-server) Implements the client side of the Prismic io webhook "interfaces". TODO
* TODO S3
* [Prismic.io example content](https://metalsmith-prismic-template.prismic.io/)

TODO overview image

## How to use this template

* Fork this template.
* Set up a Prismic.io
  * Create a repository
  * Add tokens:
    * `export PRISMIC_URL='https://{APP_NAME}.cdn.prismic.io/api'`
    * `export PRISMIC_TOKEN='{PRISMIC_TOKEN}'`
  * Setup preview:
    * TODO
  * Setup webhooks:
    * TODO
* Setup a heroku app
  * TODO
* Setup Amazon S3
  * Create an account
  * Create IAM tokens
  * TODO?
  * Add tokens:
    * `export AWS_ACCESS_KEY_ID='{S3_ACCESS_KEY_ID}'`
    * `export AWS_SECRET_ACCESS_KEY='{S3_SECRET_ACCESS_KEY}'`
    * `export S3_BUCKET='{S3_BUCKET_NAME}'`
    * `export S3_REGION='{S3_END_POINT}'`, e.g. 'eu-west-1'
* Adjust the template to your needs (marked with *TEMPLATE*)
  * Adjust the metalsmith plugins in `server.js`
  * Configure the metalsmith-prismic linkResolver in `server.js` that generates prismic links and paths of prismic collections
  * Adjust the `docs/prismic-conventions.md`
  * Adjust the `src/`, `/layouts` and `partials/` directories' according to your content
* TODO what else?

### Directory structure

* `builds/`: Output directory for built sites
* `layouts/`: Page layouts
* `partials/`: Embeddable page elements
* `src/`: Source files which will be transformed to output
* `utils/`: Utility functions
* `server.js`: Server and build logic with metalsmith-plugins

TODO license
