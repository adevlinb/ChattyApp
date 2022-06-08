import './App.css';
import io from "socket.io-client";
import { useState } from "react";
import Chat from './Chat';

const socket = io.connect("http://localhost:3001");



function App() {
  const [nameAndRoomInput, setNameAndRoomInput] = useState({
    name: "",
    room: "",
  });
  const [showChat, setShowChat] = useState(false);


  const handleChange = (e) => {
    setNameAndRoomInput({...nameAndRoomInput, [e.target.name]: e.target.value});
  }

  const joinRoom = () => {
    if (nameAndRoomInput.name !== "" && nameAndRoomInput !== "") {
      socket.emit("join_room", nameAndRoomInput)
      setShowChat(true);
    }
  }



  return (
    <div className="App">
      { !showChat ? 
      <div className="joinChatContainer">
        <h3>Join Chat</h3>
        <label htmlFor="nameInput">Your Name</label> 
        <input onChange={handleChange} type="text" name="name" value={nameAndRoomInput.name} id="nameInput" placeholder="John"></input>
        <input onChange={handleChange} type="text" name="room" value={nameAndRoomInput.room}  id="nameInput" placeholder="Room Number"></input>
        <button onClick={joinRoom}>Join Room</button>
      </div>
      :
      <Chat socket={socket} userInput={nameAndRoomInput}/> 
      }
    </div>
  );
}

export default App;
  