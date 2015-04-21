var Character = require("./characters/Character");
var Card = require("./Card");

export default class Player {
  card: Card;
  isAlive: boolean;

  constructor() {
    this.character = null;
    this.isAlive = true;
  }

  // Change the character of the player and return its old one
  giveCard(card: Card) {
    var oldCard = this.card;
    if(card) {
      card.player = this;
    }
    this.card = card;

    if(oldCard) {
      oldCard.player = null;
    }
    return oldCard;
  }

  getCard() {
    return this.card;
  }

  getCharacter() {
    return this.card ? this.card.character : null;
  }
}
