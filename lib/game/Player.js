var Character = require("./characters/Character");

export default class Player {
  character: Character;
  isAlive: boolean;

  constructor() {
    this.character = null;
    this.isAlive = true;
  }
}
