/*eslint-env jasmine*/
var Game = require("../Game");
var gameFsm = require("../gameFsm");

describe("Game Fsm", function() {
  it("should skip most of the prep with no players", function() {
    var game = new Game();
    var actions = gameFsm(game);
    var fsm = actions.fsm;
    var prepFsm = actions.preparation.fsm;

    actions.start();
    expect(fsm.state).toBe("preparation");
    actions.preparation.separateGroup("test1", "test2");
    expect(fsm.state).toBe("playing");
    expect(actions.game.fsm.state).toBe("firstNight");

  });
});

