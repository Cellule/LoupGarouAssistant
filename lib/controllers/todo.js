var todosDb = require("../database").todo;

module.exports = function addControllers(app) {
  app.get("/_/todo/*", function(req, res) {
    var todo = req.params[0].split("+");
    res.setHeader("Content-Type", "application/json");
    var data;
    if(todo.length === 1) {
      data = todosDb.get(todo[0], {});
    } else {
      data = todo.reduce(function(obj, todo) {
        obj["_" + todo] = todosDb.get(todo, {});
        return obj;
      }, {});
    }
    res.end(JSON.stringify(data));
  });

  app.post("/_/todo/*", function(req, res) {
    var todo = req.params[0];
    res.setHeader("Content-Type", "application/json");
    res.end(JSON.stringify(todosDb.update(todo, {$merge: req.body})));
  });
}
