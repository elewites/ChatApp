const express = require("express");
const app = express();
const socket = require("socket.io");
const cors = require("cors");

const corsOptions = {
  credentials: true,
  origin: "http://localhost:3000/",
  methods: ["GET", "POST"],
};

app.use(cors(corsOptions));

const port = 3001;
const server = app.listen(port, () => console.log("server is running"));

let io = socket(server);
io.on("connection", (socket) => {
  console.log(socket.id);
});
