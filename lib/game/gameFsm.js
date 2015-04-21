var machina = require("machina");
var logger = require("module-logger")(module);
var todo = require("./../utils/todo");

var namespace = "loup-garou";

export default function makeGameFsm(game) {
  var prepFsm = new machina.Fsm({
    namespace,
    initialState: "separatingIn2",
    states: {
      separatingIn2: {
        separate(group1, group2) {
          todo();
          game.group1 = group1;
          game.group2 = group2;
          this.handle("next");
        },
        next: "gitane"
      },
      gitane: {
        _onEnter() {
          if(!game.isCharaterInDeck("Gitane")) {
            // skipping this step
            return this.handle("next");
          }
        },
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "garde champetre"
      },
      "garde champetre": {
        _onEnter() {
          if(!game.isCharaterInDeck("Guard")) {
            // skipping this step
            return this.handle("next");
          }
        },
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "voleur"
      },
      voleur: {
        _onEnter() {
          if(!game.isCharaterInDeck("Thief")) {
            // skipping this step
            return this.handle("next");
          }
        },
        next: "comedian"
      },
      comedian: {
        _onEnter() {
          if(!game.isCharaterInDeck("Comedian")) {
            // skipping this step
            return this.handle("next");
          }
        },
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
        _onEnter() {
          if(!game.shouldCallCharacter("Thief")) {
            return this.handle("next");
          }
        },
        selection(newCard) {
          // todo:: find voleur and change his card
          this.handle("next");
        },
        next: "cupido"
      },
      cupido: {
        _onEnter() {
          if(!game.shouldCallCharacter("Cupido")) {
            return this.handle("next");
          }
        },
        lovers(player1: number, player2: number) {
          // todo:: setup lovers
          this.handle("next");
        },
        next: "jugeBegue"
      },
      jugeBegue: {
        _onEnter() {
          if(!game.shouldCallCharacter("Judge")) {
            return this.handle("next");
          }
        },
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "freresSoeurs"
      },
      freresSoeurs: {
        _onEnter() {
          if(!game.shouldCallCharacter("Brother")) {
            return this.handle("next");
          }
        },
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "enfantSauvage"
      },
      enfantSauvage: {
        _onEnter() {
          if(!game.shouldCallCharacter("SavageChild")) {
            return this.handle("next");
          }
        },
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        }
      }
    }
  });

  var nightFsm = new machina.Fsm({
    namespace,
    initialState: "comedian",
    states: {
      comedian: {
        _onEnter() {
          if(!game.shouldCallCharacter("Comedian")) {
            return this.handle("next");
          }
        },
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "fortuneTeller"
      },
      fortuneTeller: {
        _onEnter() {
          if(!game.shouldCallCharacter("FortuneTeller")) {
            return this.handle("next");
          }
        },
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "renard"
      },
      renard: {
        _onEnter() {
          if(!game.shouldCallCharacter("Fox")) {
            return this.handle("next");
          }
        },
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "savior"
      },
      savior: {
        _onEnter() {
          if(!game.shouldCallCharacter("Savior")) {
            return this.handle("next");
          }
        },
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
        _onEnter() {
          if(!game.shouldCallCharacter("Witch")) {
            return this.handle("next");
          }
        },
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "gypsy"
      },
      gypsy: {
        _onEnter() {
          if(!game.shouldCallCharacter("Gypsy")) {
            return this.handle("next");
          }
        },
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "flute"
      },
      flute: {
        _onEnter() {
          if(!game.shouldCallCharacter("FlutePlayer")) {
            return this.handle("next");
          }
        },
        // Todo:: implement
        "todo": function() {
          this.handle("next");
        },
        next: "frereSoeur"
      },
      frereSoeur: {
        _onEnter() {
          if(!game.shouldCallCharacter("Brother")) {
            return this.handle("next");
          }
        },
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
    initialState: "distributeCards",
    states: {
      distributeCards: {
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
          todo("kill player");

          this.emit("death", deadPlayer);
          // todo:: check if first vote and if player dead is angel end game
          todo("check angel");

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
    game: {
      fsm: gameFsm
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
        todo();
        fsm.handle("todo");
      }
    }
  };

  return actions;
}
