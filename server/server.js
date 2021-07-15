//libraries
const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");

//Middleware
app.use(cors());

//App setup
const server = app.listen(3001, () =>
  console.log("listening to requests on port 3001")
);

//Socket setup
const io = socket(server, { cors: { origin: "*" } });

io.on("connection", (socket) => {
  console.log("socket id: " + socket.id);

  socket.on("join_room", (data) => {
    socket.join(data.room);
    console.log(`${data.user} joined the room: ${data.room}`);
  });

  socket.on("send_text", (data) => {
    socket.to(data.room).emit("recieve_text", data.content);
    console.log(data);
  });

  socket.on("disconnect", () => {
    console.log(`USER disconnected`);
  });
});
