var enums = require("./../enums");
var path = require("path");

export var allCharacters = {};
enums.Characters.forEach(
  (__, char) => allCharacters[char] = require(path.join(__dirname, char))
);
