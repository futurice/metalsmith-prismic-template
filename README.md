# Metalsmith Prismic template

An opinionated, bare bones template for static site generation from [prismic.io](https://prismic.io/) using [metalsmith](https://metalsmith.io/) and deploying to Amazon S3.

## This template includes

* Documentation on how to use this template and best practices
* [Handlebars](https://http://handlebarsjs.com/) templates
* [Sass](http://sass-lang.com/) styling
* [metalsmith-prismic-server](https://github.com/futurice/metalsmith-prismic-server)
  * Provides a webhook that Prismic.io can trigger to build and deploy on CMS content changes
  * Provides a server endpoint to preview unpublished content in Prismic.io
  * Provides a live reloading development mode that fetches Prismic.io content
* [Deployment to AWS S3](https://github.com/mwishek/metalsmith-s3)
* [Prismic.io example content](https://metalsmith-prismic-template.prismic.io/)
  * [Example content in API browser](https://metalsmith-prismic-template.prismic.io/api/)
  * [Generated example site deployed to S3](http://metalsmith-prismic-template.futurice.com/)
  * [Preview of unpublished content](https://metalsmith-prismic.herokuapp.com/builds/master/)


TODO overview image

## How to use this template

* Fork this template.
* Use `.env.tmpl` to create `.env`
* Set up a Prismic.io
  * Create a repository
  * Add tokens to `.env`:
    * `PRISMIC_URL=https://{APP_NAME}.cdn.prismic.io/api`
    * `PRISMIC_TOKEN={PRISMIC_TOKEN}`
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
  * Add tokens to `.env`:
    * `AWS_ACCESS_KEY_ID={AWS_ACCESS_KEY_ID}`
    * `AWS_SECRET_ACCESS_KEY={AWS_SECRET_ACCESS_KEY}`
    * `S3_BUCKET={S3_BUCKET_NAME}`
    * `S3_REGION={S3_END_POINT}`, e.g. 'eu-west-1'
* Adjust the template to your needs (marked with \*TEMPLATE\*)
  * Adjust the metalsmith plugins in `server.js`
  * Configure the metalsmith-prismic linkResolver in `server.js` that generates prismic links and paths of prismic collections
  * Adjust the `docs/prismic-conventions.md`
  * Structure the `src/`, `/layouts` and `partials/` directories' according to your content

### Directory structure

* `builds/`: Output directory for built sites
* `layouts/`: Page layouts
* `partials/`: Embeddable page elements
* `plugins/`: Custom metalsmith plugins
* `src/`: Source files which will be transformed to output
* `utils/`: Utility functions
* `server.js`: Server and build logic with metalsmith-plugins

TODO license
