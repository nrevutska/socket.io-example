import "./App.css";
import { useState } from "react";
import Chat from "./Chat";

const socket = null;

function App() {
  const [username, setUsername] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinChat = () => {
    if (username !== "") {
      setShowChat(true);
    }
  };
  return (
    <div className="App">
      {!showChat ? (
        <div className="joinChatContainer">
          <h3>Join A Chat</h3>
          <input
            type="text"
            placeholder="Your nick..."
            onChange={(event) => {
              setUsername(event.target.value);
            }}
          />

          <button onClick={joinChat}>Join A Chat</button>
        </div>
      ) : (
        <Chat socket={socket} username={username} />
      )}
    </div>
  );
}

export default App;
