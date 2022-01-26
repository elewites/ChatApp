//Libraries
import React from "react";

//Styling
import "../css/login.css";

function Login(props) {
  const setUser = props.setUser;
  const setRoom = props.setRoom;

  return (
    <div className="form">
      <div className="inputs">
        <input
          type="text"
          placeholder="name..."
          onChange={(e) => {
            setUser(e.target.value);
          }}
        ></input>
        <input
          type="text"
          placeholder="room..."
          onChange={(e) => {
            setRoom(e.target.value);
          }}
        ></input>
      </div>
      <button onClick={props.connectRoom}>Join room</button>
    </div>
  );
}

export default Login;
