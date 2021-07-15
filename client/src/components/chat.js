//Libraries
import React from "react";

//Styling
import "../css/chat.css";

function Chat(props) {
  const setText = props.setText;
  const sendText = props.sendText;
  const textList = props.textList;
  const text = props.text;

  //Form Handling Functions
  const hitEnter = (e) => {
    if (e.keyCode === 13) {
      sendText();
    }
  };
  const prevent = (e) => {
    e.preventDefault();
  };

  return (
    <div className="chatContainer">
      <div className="messages">
        {textList.map((val, index) => {
          return (
            <h4 key={index}>
              {" "}
              {val.author}: {val.text}{" "}
            </h4>
          );
        })}
      </div>
      <form onSubmit={prevent} className="messageDiv">
        <input
          type="text"
          placeholder="Message..."
          onChange={(e) => {
            setText(e.target.value);
          }}
          onKeyUp={hitEnter}
          value={text}
        ></input>
        <button type="reset" onClick={sendText}>
          Send
        </button>
      </form>
    </div>
  );
}

export default Chat;
