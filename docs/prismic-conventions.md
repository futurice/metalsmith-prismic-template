# Prismic content conventions

*TEMPLATE* These are our template's recommeneded conventions, adjust to these to fit your needs. Some conventions are examples and are not demonstrated in this template. Please keep these updated with any other good conventions.

[Prismic.io custom types](https://prismic.io/docs/custom-types) are the way to define the Prismic content's document types, e.g. 'Blog post' or 'Author'. The custom types structure how the content is created in the editor UI and how it is returned by the API.

Design your custom types carefully, it’s tedious to change later when you have content and collaborate with the content creators early!

Custom types are defined as JSON files in the Prismic.io settings and should follow the conventions outlined below throughout the project.



## Naming conventions

### Custom types

Custom type names should be written in lowercase dash-separated strings (kebab-case), e.g. `blog-post`.

### Fragments

Fragments are gathered in tab sections (e.g. "Main information", "Meta"); this is only used to organize fragment by tabs in the writing-room's editor, and doesn't impact the outcome through the API. Within the tab names, the fragments should be written in lowercase underscore_separated strings (snake_case), e.g. `link_text`. This is to differentiate it from JavaScript camelCase and file naming conventions.

Fragments in other tab sections than the main section should be prefixed with the tab name to make the field's purpose clear, e.g. "meta_title" for the HTML `<title>` element value. The only exception to this is the meta fragment's `uid` field.

**!Important: Do not rename fragment fields!** Removing or renaming fields will not remove, or even hide, the existing content in existing documents. This means that they will be returned by the API, but are not accessible in the editor.




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

Instead links should be defined as groups with two fields `target` and `text` which contain the link target and link text. Link could also include additional fields like `image` or `popup` to further control the link behavior.

If due to nesting restrictions the link cannot be defined as a group, the link should be composed of multiple fields, each one prefixed with the link name. For example:

 * `author_link_target`
 * `author_link_text`

Note: Anchor tags have to be manually added to links in the templates

Example of dedicated link group:

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

Example of non-nested element

```json
{
  "author_link" : {
    "type": "Group",
    "config": {
      "fields": {
        "author_link_target" : {
          "type" : "Link",
          "config" : {
            "select" : "document",
            "customtypes" : [ "author" ],
            "placeholder" : "Select blog post authors..."
          }
        },
        "author_link_text" : {
          "type": "Text",
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

### StructuredText styles

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



## i18n conventions

Prismic's recommendation for i18n is explained [here](https://qa.prismic.io/29/will-multi-lingual-sites-be-supported-in-the-future). It might not make sense to have a parent document in every case, so this project uses language tags instead.

Each document should have only one language tag of the format: `language:<ISO 639-1 language code>`, e.g. `language:fi`.



## Resources

* [Old Prismic.io docs](https://developers.prismic.io/)
* [New Prismic.io docs (non-comprehensive)](https://prismic.io/docs#?lang=node)
* [Forums](https://qa.prismic.io/)