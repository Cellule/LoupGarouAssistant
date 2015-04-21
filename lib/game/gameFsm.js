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

  var firstNightFsm = new machina.Fsm({
    namespace,
    initialState: "voleur",
    states: {
      voleur: {
        selection(newCard) {
          // todo:: find voleur and change his card
          this.handle("next");
        },
        next: "cupidon"
      },
      cupidon: {
        lovers(player1, player2) {
          // todo:: setup lovers
          this.handle("next");
        },
        next: "jugeBegue"
      },
      jugeBegue: {
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "freresSoeurs"
      },
      freresSoeurs: {
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "enfantSauvage"
      },
      enfantSauvage: {
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "montreurOurs"
      },
      montreurOurs: {
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        }
      }
    }
  });

  var nightFsm = new machina.Fsm({
    namespace,
    initialState: "comedien",
    states: {
      comedien: {
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "voyante"
      },
      voyante: {
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "renard"
      },
      renard: {
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "salvateur"
      },
      salvateur: {
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "loupGarou"
      },
      loupGarou: {
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "sorciere"
      },
      sorciere: {
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "gitane"
      },
      gitane: {
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "flute"
      },
      flute: {
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "frereSoeur"
      },
      frereSoeur: {
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
      }
    }
  });



  var gameFsm = new machina.Fsm({
    namespace,
    initialState: "firstNight",
    nights: 0,
    days: 0,
    lastVoteResult: null,
    states: {
      firstNight: {
        _child: firstNightFsm,
        next: "night"
      },
      night: {
        _onEnter() {
          this.nights++;
        },
        _child: nightFsm,
        next: "day"
      },
      day: {
        _onEnter() {
          this.days++;
        },
        // todo:: more events like grognement, spirite and garde champetre
        vote(deadPlayer) {
          this.lastVoteResult = deadPlayer;
          this.handle("playerKilled", deadPlayer);
          this.handle("next");
        },
        next: "endVote"
      },
      endVote: {
        maidReaction() {
          // change card with this.lastVoteResult
        },
        secondVote(deadPlayer) {
          this.lastVoteResult = deadPlayer;
          this.handle("playerKilled", deadPlayer);
        },
        next: "night"
      }
    }
  });

  var fsm = new machina.Fsm({
    namespace,
    initialState: "uninitialized",
    states: {
      uninitialized: {
        start: "preparation"
      },
      preparation: {
        _child: prepFsm,
        next: "playing"
      },
      playing: {
        _child: gameFsm,
        playerKilled(deadPlayer) {
          // todo:: kill that player and possibly other casualties

          this.emit("death", deadPlayer);
          // todo:: check if first vote and if player dead is angel end game

          // todo:: check if end game and alert
          if(false || game.isOver()) {
            this.handle("gameOver");
          }
        },
        gameOver: "gameOver"
      },
      gameOver: {
        _onEnter() {
          this.emit("gameOver");
        }
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
