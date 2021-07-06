import "./App.css";
import { useEffect } from "react";
import socketio from "socket.io-client";

let socket;
const endpoint = "localhost:3001/";

function App() {
  
  useEffect(() => {
    socket = socketio(endpoint);
  }, [endpoint]);

  return <div className="App">eros</div>;
}

export default App;
