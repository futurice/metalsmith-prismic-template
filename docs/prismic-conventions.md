# Prismic.io content conventions

\*TEMPLATE\* These are our template's recommeneded conventions, adjust to these to fit your needs. Some conventions are examples and are not demonstrated in this template. Please keep these updated with any other good conventions.

## Prismic.io Custom types

[Prismic.io custom types](https://prismic.io/docs/custom-types) are the way to define the Prismic content's document types, e.g. 'Blog post' or 'Author'. The custom types structure how the content is created in the editor UI and how it is returned by the API. The API's returned content can be viewed with [Prismic's API browser](https://metalsmith-prismic-template.prismic.io/api/documents/search?ref=Vsz0KiUAAB0AEhiu&q=%5B%5B%3Ad+%3D+at(document.type%2C+%22i18n-blog-post%22)%5D%5D&q=%5B%5B%3Ad+%3D+at(document.tags%2C+%5B%22language%3Afi%22%5D)%5D%5D#format=html).

Design your custom types carefully, it’s tedious to change later when you have content and collaborate with the content creators early!

Prismic does not version custom types. To be safe and track changes, it's a good idea to keep manual copies in `prismic-custom-types`. Each file should be named in the format <custom type name>.json.

Custom types are defined as JSON files in the Prismic.io settings and should in this project follow the conventions outlined below.

## Prismic.io Fragments

Fragments are gathered in tab sections (e.g. "Main information", "Meta"); this is only used to organize fragment by tabs in the writing-room's editor, and doesn't impact the outcome through the API.

## Naming conventions


| Prismic element               | Naming                       | Example  |
| ----------------------------- |------------------------------| ---------|
| Custom types                  | kebab-case                   | `blog-post` |
| Fragments in Main section     | snake_case                   |  `title` for `<title>` element |
| Fragments in other sections   | {SECTION_NAME}_snake_case    |  `meta_title` for `<title>` element |
| uid fragments                 | snake_case                   |  `uid` |

**Important: Removing or renaming fragment fields will not automatically update the contents of the documents** Removing or renaming fields will not remove, nor hide, the existing content in existing documents. This means that they will be returned by the API, but are not accessible in the editor. Saving and publishing a new version of the document will remove any fields not present in the fragment, but until that is done for each document with a specific type, the API results and fragment field definition might be out of sync.



## Fragment conventions

Fragments should follow the conventions below to ease the work for both content creators and template developers.

### Headers

Each page should contain a `h1` level page title with the name `title`. Each page can also contain a `title_image` which will be used as the hero image of the page. Prismic.io recommends to have at least one StructuredText fragment in a document in order to be able to display a title in editor.

### Metadata

Each page can contain following metadata properties:

  * `uid`: unique identifier that is part of the page url, e.g. uid `minna` will result in url `/fi/author/minna`. If not included in the meta fragment, the automatically generated slug will be used, e.g. `/blog-post/my-first-blog-post`.
  * `meta_title`: HTML `<title>` element content

### Links

Links should **not** be defined as a `StructuredText` fields, unless links are directly part of a longer piece of content because it makes the content creator UI quite cumbersome. Additionally it makes it difficult to style the link or separate links from text in the templates.

Instead links should be defined as groups with two fields `target` and `text` which contain the link target and link text. See Link could also include additional fields like `image` or `popup` to further control the link behavior. For example:

```json
{
  "author_link" : {
    "type" : "Group",
    "config" : {
      "fields" : {
        "target" : {
          "type" : "Link",
          "config" : {
            "select" : "document",
            "customtypes" : [ "author" ],
            "placeholder" : "Select blog post authors..."
          }
        },
        "text" : {
          "type" : "Text",
          "config" : {
            "placeholder" : "Author link text here...",
            "label" : "Author link text"
          }
        }
      }
    }
  }
}
```

If due to nesting restrictions the link cannot be defined as a group, the link should be composed of multiple fields, each one prefixed with the link name, e.g. `author_link_target`.

Note: Anchor tags have to be manually added to links in the templates.


### StructuredText styling

To keep StructuredText field styling consistent across the application, content creators should be given as limited options as possible for styling. Also don’t give in to the temptation of using structured text for everything.

Headings should be updated as needed for proper page structuring.

In addition StructuredText fragments can be extended with [labels](https://blog.prismic.io/VAcbSjEAADMAtjS8/label-your-structured-text-for-richer-display-experience-quotes-tips-captions). These labels can even have icons ([undocumented feature](https://qa.prismic.io/250/label-icons-and-validity-documentation)).


#### Simple description (one paragraph)

Should be used for simple description texts, e.g. in headers. Includes only the minimum styling options.

```json
{
  "single": "paragraph,strong,em"
}
```

#### Simple content (multiple paragraphs)

Should be used for short descriptions in pages with limited styling options.

```json
{
  "multi": "heading3,heading4,heading5,heading6,preformatted,paragraph,strong,em,hyperlink,image"
}
```

#### Full content (multiple paragraphs)

Should be used for full content pages, such as blog posts. Includes all styling options except for `h1`, which should be a separate `title` fragment.

```json
{
  "multi": "heading2,heading3,heading4,heading5,heading6,preformatted,paragraph,strong,em,hyperlink,olist,o-list-item,ulist,list-item,image,embed"
}
```

### Other notes on custom types

* Prismic does *not* support nested lists in fragments
  * You can’t put a group within a group
  * You can’t use the array notation within a group


## Media library

“Tag” your images and documents in the media library by writing something in the “Private notes” fields. Otherwise it will be hard to find anything once there is a lot of content.


## i18n conventions

Prismic's recommendation for i18n is explained [here](https://qa.prismic.io/29/will-multi-lingual-sites-be-supported-in-the-future). It might not make sense to have a parent document in every case, so this project uses language tags instead.

Each document should have only one language tag of the format: `language:<ISO 639-1 language code>`, e.g. `language:fi`.


## Development and Production environments

We recommend keeping two copies of your Prismic repositories: development and production. After development ends and all production data is entered into a repository, you can ask Prismic.io to copy your repository. As default in development you should use the production Prismic content. But when changes to Prismic content are needed (especially custom types), you can switch to the development Prismic repository and freely play around with the content and try custom types changes. Changes that should go into production can be documented with the custom-type backups. When the changes are tested, they can be copied to the production Prismic repository.

## Resources

* [Old Prismic.io docs](https://developers.prismic.io/)
* [New Prismic.io docs (non-comprehensive)](https://prismic.io/docs#?lang=node)
* [Forums](https://qa.prismic.io/)
