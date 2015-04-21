var Player = require("./Player");
var Character = require("./characters/Character");

export default class Card {
  character: Character;
  // null when card is unused
  player: Player;

  constructor(character) {
    this.character = character;
    this.player = null;
  }
}
