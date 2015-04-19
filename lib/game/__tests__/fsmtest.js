/*eslint-env jasmine*/
var Game = require("../Game");
var gameFsm = require("../gameFsm");

describe("Game Fsm", function() {
  it("should run the prep correctly", function() {
    var game = new Game();
    var fsmActions = gameFsm(game);
    var fsm = fsmActions.fsm;
    var prepFsm = fsmActions.preparation.fsm;

    fsmActions.start();
    expect(fsm.state).toBe("preparation");
    fsmActions.preparation.separateGroup("test1", "test2");
    expect(prepFsm.state).toBe("gitane");

    fsmActions.preparation.todo();
    expect(prepFsm.state).toBe("garde champetre");

    fsmActions.preparation.todo();
    expect(prepFsm.state).toBe("voleur");
    fsmActions.preparation.todo();
    expect(prepFsm.state).toBe("voleur");
    fsmActions.preparation.voleurSelection();
    expect(prepFsm.state).toBe("comedian");
    fsmActions.preparation.todo();

    expect(fsm.state).toBe("firstNight");

  });
});

