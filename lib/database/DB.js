import mongoose from "mongoose"
import {EventEmitter} from "events"

var eventEmitter = new EventEmitter();

mongoose.connect("mongodb://localhost");
var db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error:"));
db.once("open", () => {
  eventEmitter.emit("open");
});

export default {
  db: db,
  eventEmitter: eventEmitter
}
