var _ = require("lodash");
var Player = require("./Player");

/**
 *
 * players: Player[]
 * allCharacters: {[characterName: string]: {count: number} }
 **/
export default class Game {
  players: Array<Player>;
  allAvailableCharacters: {[characterName: string]: {count: number} };

  constructor(players: Array<Player>, deck: Array<Character>) {
    this.players = players;
    this.allAvailableCharacters = _.reduce(
      deck,
      (allChars, character) => {
        if(allChars[character.name]) {
          allChars[character.name] = {count: 0};
        }
        allChars[character.name].count++;
        return allChars;
      },
      {}
    );
  }



}
