var _ = require("lodash");

var elem = {test: 2};
var array = [{e: elem}, {e:12}];

console.dir(_.remove(array, function(a){return a.e === elem}));
console.dir(array);
