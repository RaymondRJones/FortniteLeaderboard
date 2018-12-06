var express = require('./express');

module.exports.start = function() {
  var app = express.init();
  app.listen('8080', function() {
    console.log('App listening on port', '8080');
  });
};
