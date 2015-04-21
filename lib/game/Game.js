var _ = require("lodash");
var Player = require("./Player");
var logger = require("module-logger")(module);
var getCallStack = require("./../utils/getCallStack");
var Characters = require("./enums").Characters;
var Card = require("./Card");


/**
 *
 * players: Player[]
 * allCharacters: {[characterName: string]: {count: number} }
 **/
export default class Game {
  players: Array<Player>;
  deck: {[characterName: string]: Array<Card>};

  constructor(players: Array<Player>, characters: Array<Character>) {
    this.players = players;
    this.deck = {};
    // init deck for all characters
    Characters.forEach((i, name) => {
      this.deck[name] = [];
    });

    this.deck = _.reduce(
      characters,
      (deck, character) => {
        deck[character.name].push(new Card(character));
        return deck;
      },
      {}
    );
  }

  // Give a character to the player
  giveCharacter(playerIdx: number, characterName: string) {
    if(this.checkPlayerIdx(playerIdx)) {
      return false;
    }
    var player = this.players[playerIdx];
    var card = this.getFreeCard(characterName);
    if(!card) {
      logger.error("No card %s available", characterName);
      return false;
    }
    player.giveCard(card);
    return true;
  }

  swapCharacters(player1Idx: number, player2Idx: number) {
    if(this.checkPlayerIdx(player1Idx) || this.checkPlayerIdx(player2Idx)) {
      return false;
    }
    var player1 = this.players[player1Idx];
    var player2 = this.players[player2Idx];
    var card1 = player1.getCard();
    var card2 = player2.giveCard(card1);
    player1.giveCard(card2);

    return true;
  }

  isCharaterInDeck(characterName: string) {
    return this.deck[characterName].length > 0;
  }

  // Checks if one player is alive with that character or if the card is
  // in the deck, but no one has it
  shouldCallCharacter(characterName: string) {
    var cards = this.deck[characterName];
    var isCharacterPresent = false;
    cards.forEach(card => {
      if(card.player) {
        if(card.player.isAlive) {
          return true;
        }
        isCharacterPresent = true;
      }
    });
    // pretend the card is present if no one has it.
    return !isCharacterPresent;
  }

  // Utilities
  getFreeCards(characterName: string) {
    return _.filter(this.deck[characterName], card => !card.player);
  }

  getUsedCards(characterName: string) {
    return _.filter(this.deck[characterName], card => !!card.player);
  }

  getFreeCard(characterName: string) {
    return _.first(this.getFreeCards(characterName));
  }

  checkPlayerIdx(playerIdx: number) {
    if(playerIdx >= this.players.length) {
      logger.error(
        "Invalid player index. %d >= %d.",
        playerIdx,
        this.players.length,
        getCallStack()
      );
      return false;
    }
    return true;
  }

}
