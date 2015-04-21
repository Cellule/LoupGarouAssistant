/*eslint-env jasmine*/
var Game = require("../Game");
var gameFsm = require("../gameFsm");
var Player = require("./../Player");
var _ = require("lodash");
var Characters = require("./../characters");
var enums = require("./../enums");

function createPlayers(numberPlayers) {
  return _.range(0, numberPlayers).map(() => new Player());
}

function makeDeck(characterNames) {
  return characterNames.map(name => new Characters.allCharacters[name]());
}

// give cards in order to the player
function giveCharacters(characters, game) {
  characters.forEach( (character, i) =>
    expect(game.giveCharacter(i, character.name)).toBeTruthy()
  );
}

describe("Game Fsm", function() {
  it("should skip most of the prep with no players", function() {
    var game = new Game();
    var actions = gameFsm(game);
    var fsm = actions.fsm;

    actions.start();
    expect(fsm.state).toBe("preparation");
    actions.preparation.separateGroup("test1", "test2");
    expect(fsm.state).toBe("playing");
    expect(actions.game.fsm.state).toBe("firstNight");

  });

  it("should correctly distribute characters", function() {
    var characters = makeDeck(["Werewolf", "Townsfolk", "Townsfolk", "Werewolf", "Townsfolk"]);
    var players = createPlayers(5);
    var game = new Game(players, characters);
    giveCharacters(characters, game);

    expect(players[0].getCharacter().name).toBe("Werewolf");
    expect(players[3].getCharacter().name).toBe("Werewolf");
    expect(players[1].getCharacter().name).toBe("Townsfolk");
    expect(players[2].getCharacter().name).toBe("Townsfolk");
    expect(players[4].getCharacter().name).toBe("Townsfolk");
  });

  it("should swap card correctly", function() {
    var characters = makeDeck(["Werewolf", "Townsfolk"]);
    var players = createPlayers(2);
    var game = new Game(players, characters);
    giveCharacters(characters, game);
    game.swapCharacters(0, 1);

    expect(players[0].getCharacter().name).toBe("Townsfolk");
    expect(players[1].getCharacter().name).toBe("Werewolf");
  });

  it("should know which cards are in the deck", function() {
    var characters = makeDeck(["Werewolf", "Townsfolk"]);
    var game = new Game([], characters);

    enums.Characters.forEach((i, char) => {
      if(char === "Werewolf" || char === "Townsfolk") {
        expect(game.isCharaterInDeck(char)).toBeTruthy();
      } else {
        expect(game.isCharaterInDeck(char)).toBeFalsy();
      }
    });
  });
});

