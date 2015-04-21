/*eslint-env jasmine*/
var Game = require("../Game");
var gameFsm = require("../gameFsm");
var Player = require("./../Player");
var _ = require("lodash");
var characters = require("./../characters");

function createPlayers(numberPlayers) {
  return _.range(0, numberPlayers).map(() => new Player());
}

function makeDeck(characterNames) {
  return characterNames.map(name => new characters.allCharacters[name]());
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

  it("should correctly distribute cards", function() {
    var cards = makeDeck(["Werewolf", "Werewolf", "Townsfolk", "Townsfolk", "Townsfolk"]);
    var players = createPlayers(5);
    var game = new Game(players, cards);
    expect(game.giveCharacter(0, "Werewolf")).toBeTruthy();
    expect(game.giveCharacter(3, "Werewolf")).toBeTruthy();
    expect(game.giveCharacter(2, "Townsfolk")).toBeTruthy();
    expect(game.giveCharacter(1, "Townsfolk")).toBeTruthy();
    expect(game.giveCharacter(4, "Townsfolk")).toBeTruthy();

    expect(players[0].getCharacter().name).toBe("Werewolf");
    expect(players[3].getCharacter().name).toBe("Werewolf");
    expect(players[1].getCharacter().name).toBe("Townsfolk");
    expect(players[2].getCharacter().name).toBe("Townsfolk");
    expect(players[4].getCharacter().name).toBe("Townsfolk");
  });
});

