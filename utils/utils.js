var _ = require('lodash');

// *TEMPLATE-i18n* Returns the language code of a Prismic document
function getLanguageFromTags(doc) {
  var languageTag;
  _.forEach(doc.tags, function(tag) {
    tag = tag.split(':');
    if (tag[0] === 'language') {
      if (languageTag) {
        // TODO make sure this breaks things.
        // throw `Document ${doc.uid} has more than one language tag.`;
      }
      languageTag = tag[1];
    }
  });
  return languageTag;
}

module.exports = {
    getLanguageFromTags,
};
