import React, { useState, useEffect } from "react";

function Chat({ socket, username }) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        author: username,
        message: currentMessage,
      };
      socket.emit("send_message", messageData);
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("broadcast_message", (data) => {
      setMessageList((list) => [...list, data]);
    });
    return () => socket.off("broadcast_message");
  }, [socket]);

  return (
    <div className="chat-window">
      <div className="chat-header">
        <p>Your nickname is '{username}'</p>
      </div>
      <div className="chat-body">
        {messageList.map((messageContent) => {
          return (
            <div
              className={`message ${
                username === messageContent.author ? "me" : "other"
              }`}
            >
              <div>
                <div
                  className={`message-content ${
                    username === messageContent.author ? "me" : "other"
                  }`}
                >
                  <p>{messageContent.message}</p>
                </div>
                <div className="message-meta">
                  <p id="author">{messageContent.author}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyDown={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
    </div>
  );
}

export default Chat;
