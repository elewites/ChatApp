const mongoose = require("mongoose");

const roomSchema = mongoose.Schema({
  roomName: String,
  messages: [{ author: String, text: String }],
});

const RoomModel = mongoose.model("room", roomSchema);

module.exports = RoomModel;
