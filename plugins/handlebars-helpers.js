var Handlebars = require('handlebars');

module.exports = function() {
  var helpers = {
    json: function(value, indentation) {
      return JSON.stringify(value, null, indentation);
    }
  };

  for(var key in helpers) {
    if(helpers.hasOwnProperty(key)) {
      Handlebars.registerHelper(key, helpers[key]);
    }
  }

  return function(files, metalsmith, done) {
    done();
  };
};
