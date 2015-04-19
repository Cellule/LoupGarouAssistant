var machina = require("machina");
var logger = require("module-logger")(module);

var namespace = "loup-garou";
export default function makeGameFsm(game) {
  var prepFsm = new machina.Fsm({
    namespace,
    initialState: "separatingIn2",
    states: {
      _onEnter() {
        // this.emit("");
      },
      separatingIn2: {
        separate(group1, group2) {
          game.group1 = group1;
          game.group2 = group2;
          this.handle("next");
        },
        next: "gitane"
      },
      gitane: {
        // Todo:: implement
        "*": function() {
          this.handle("next");
        },
        next: "garde champetre"
      },
      "garde champetre": {
        // Todo:: implement
        "*": function() {
          this.handle("next");
        },
        next: "voleur"
      },
      voleur: {
        selection(newCard) {
          // todo:: find voleur and change his card
          this.handle("next");
        },
        next: "comedian"
      },
      comedian: {
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        }
      }
    }
  });
  prepFsm.initialize(game);

  var fsm = new machina.Fsm({
    namespace,
    initialState: "uninitialized",
    states: {
      uninitialized: {
        start: "preparation"
      },
      preparation: {
        _child: prepFsm,
        next: "firstNight"
      },
      firstNight: {
        next: "night"
      },
      night: {
        next: "morning"
      },
      morning: {
        // check if end game
        next: "day"
      },
      day: {
        // do vote and check if maid reacts
        next: "endVote"
      },
      endVote: {
        next: "night"
      }
    }
  });

  if(__DEV__ && !__TEST__) {
    fsm.on("*", function (eventName, data){
      logger.debug("fsm action:", eventName, data);
    });
  }

  var actions = {
    fsm: fsm,
    start() {
      fsm.handle("start");
    },
    preparation: {
      fsm: prepFsm,
      separateGroup(group1, group2) {
        fsm.handle("separate", group1, group2);
      },
      voleurSelection(newCard) {
        fsm.handle("selection", newCard);
      },
      todo() {
        logger.warn("Todo action");
        fsm.handle("todo");
      }
    }
  };

  return actions;
}
