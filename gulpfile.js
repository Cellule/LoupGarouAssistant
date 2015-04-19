require("./requireHooks");
var gulp = require("gulp");
var jasmine = require("gulp-jasmine");
var through = require("through2");

__DEV__ = true;
__PROD__ = false;

var rootTestFolders = ["lib", "app"];
var testFolder = "__tests__";
var testGlobs = rootTestFolders.map(function(folder) {
  return folder + "/**/" + testFolder + "/**/*.js";
});

// Testing tasks
gulp.task("test", function() {
  __TEST__ = true;
  return gulp.src(testGlobs)
    .pipe(through.obj(function(file, enc, cb) {
      console.log(file.path);
      cb(null, file);
    }))
    .pipe(jasmine({
      verbose: true,
      includeStackTrace: true
    }));
});
