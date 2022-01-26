//libraries
const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const mongoose = require("mongoose");
const dotenv = require("dotenv");

const { Server } = require("socket.io");

//Middleware
app.use(cors());
dotenv.config();

//App setup
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log("sever is running");
});

//database connection
mongoose.connect(
  `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.exjg5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`,
  () => {
    console.log("connected to database");
  }
);

//Socket setup
const io = new Server(server, {
  cors: { origin: "*" },
});

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
