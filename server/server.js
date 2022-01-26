//libraries
const express = require("express");
const app = express();
const cors = require("cors");
const http = require("http");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const { Server } = require("socket.io");

//model imports
const MessageModel = require("./models/message");
const RoomModel = require("./models/room");

//Middleware
app.use(cors());
dotenv.config();
app.use(express.json());

//App setup
const PORT = process.env.PORT || 3001;
const server = http.createServer(app);
server.listen(PORT, () => {
  console.log("sever is running");
});

//database connection
mongoose
  .connect(
    `mongodb+srv://${process.env.DB_username}:${process.env.DB_password}@cluster0.exjg5.mongodb.net/myFirstDatabase?retryWrites=true&w=majority`
  )
  .then(() => console.log("connected to db on port: " + PORT));

//
//
//route used to get previous messages from a specific room
app.get("/getmessages", async (req, res) => {
  const fetchedRoom = await RoomModel.findOne({ roomName: req.body.roomName });
  res.send(fetchedRoom.messages);
});

//
//
//
//
//Socket setup
const io = new Server(server, {
  cors: { origin: "*" },
});

io.on("connection", (socket) => {
  console.log("socket id: " + socket.id);

  //listening for a join_room event
  socket.on("join_room", async (data) => {
    //new user joins room
    socket.join(data.room);

    //fetch room from database to determine if new room needs to be created
    const fetchRoom = await RoomModel.findOne({ room: data.room });

    //we create a new room if fetchRoom is null
    if (fetchRoom) {
      console.log("eros");
    } else {
      const newRoom = new RoomModel({ roomName: data.room, messages: [] });
      await newRoom.save();
    }

    console.log(`${data.user} joined the room: ${data.room}`);
  });

  //listening for a send_text event
  socket.on("send_text", async (data) => {
    //emitting data to data.room through recieve_text event
    socket.to(data.room).emit("recieve_text", data.content);

    //formatting message to include in database
    const author = data.content.author;
    const text = data.content.text;
    const message = { author: author, text: text };

    //fetching room from database
    const fetchedRoom = await RoomModel.findOne({ room: data.room });
    //uploading new messages to the room in the databasef
    if (fetchedRoom) {
      fetchedRoom.messages.push(message);
      await fetchedRoom.save();
    }

    console.log(data);
  });

  //disconnect event
  socket.on("disconnect", () => {
    console.log(`USER disconnected`);
  });
});
