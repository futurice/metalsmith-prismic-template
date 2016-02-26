# Metalsmith Prismic template

A opinionated barebones template for static site generation from [prismic.io](https://prismic.io/) using [metalsmith](https://metalsmith.io/) and deploying to Amazon S3.

## This template includes ##

- Documentation on how to use this template and best practices
- [Handlebars](https://http://handlebarsjs.com/) templates
- [Sass](http://sass-lang.com/) styling
- [metalsmith-prismic-server](https://github.com/futurice/metalsmith-prismic-server) TODO
- TODO S3
- [Prismic.io example content](https://metalsmith-prismic-template.prismic.io/)


## How to use it ##

TODO PRISMIC_URL env var or `--prismic-url` commandline parameter
TODO S3_URL

### Directory structure

* `builds/`: Output directory for built sites
* `layouts/`: Extendable page layouts
* `partials/`: Embeddable page elements
* `src/`: Source files which will be transformed to output
* `server.js`: Server and build logic with metalsmith-plugins
