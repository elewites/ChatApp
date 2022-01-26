//libraries
import { useEffect, useState } from "react";
import io from "socket.io-client";

//Components
import Login from "./components/login";
import Chat from "./components/chat";

//Styling
import "./css/App.css";

let socket;

function App() {
  //Before Login States
  const [loggedIn, setLoggedIn] = useState(false);
  const [user, setUser] = useState("");
  const [room, setRoom] = useState("");

  //After Login States
  const [text, setText] = useState("");
  const [textList, setTextList] = useState([]);

  const endpoint = "localhost:3001/";

  //connecting to endpoint
  //useEffect is used in case endpoint changes
  useEffect(() => {
    socket = io.connect(endpoint);
  }, [endpoint]);

  //listening for messages recieved from backend 
  useEffect(() => {
    socket.on("recieve_text", (data) => {
      setTextList([...textList, data]);
    });
  });

  //Connect to Room function
  const connectRoom = () => {
    let data = { room: room, user: user };
    setLoggedIn(true);
    socket.emit("join_room", data);
  };

  //Send Message function
  const sendText = () => {
    let textData = {
      room: room,
      content: { author: user, text: text },
    };
    socket.emit("send_text", textData);
    setTextList([...textList, textData.content]);
    setText("");
  };

  return (
    <div className="App">
      {!loggedIn ? (
        <Login connectRoom={connectRoom} setRoom={setRoom} setUser={setUser} />
      ) : (
        <Chat
          setText={setText}
          sendText={sendText}
          textList={textList}
          text={text}
        />
      )}
    </div>
  );
}

export default App;
