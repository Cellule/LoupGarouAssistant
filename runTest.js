// Runs the test suite for exactly 1 file.
// Allows to use the debugger on that file
// usage: node runTest.js pathToTestFile.js

require("./requireHooks");
var jasmine = require("gulp-jasmine");

__DEV__ = true;
__PROD__ = false;

var jas = jasmine({
  verbose: true,
  includeStackTrace: true
});
jas._transform({
  path: process.argv[2],
  isNull: function() {return false; },
  isStream: function() {return false; },
}, null, function(){});
jas._flush(function() {

});

