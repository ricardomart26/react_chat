import './App.css';
import io from 'socket.io-client';
import React, { useEffect, useState } from 'react';
import Chat from './Chat';
const socket = io.connect('http://localhost:3002');

function App() {

  const [username, setUsername] = useState('');
  const [room, setRoom] = useState('');
  const [joinedRoom, setJoinedRoom] = useState(false);


  useEffect(() => {

  }, [joinedRoom])

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setJoinedRoom(true);
    }
  }

  const displayJoinRoom = () => {
    return (
      <div>
        <h3>Join A Chat</h3>
        <input type="text" placeholder="Ricardo..." onChange={(event) => {
          setUsername(event.target.value)}
        }/>
        <input type="text" placeholder="Room Id..." onChange={(event) => {
          setRoom(event.target.value)}
        }/>
        <button onClick={joinRoom}>Join A Room</button>
      </div>
    );
  }

  return (
    <div className="App">
      {!joinedRoom ? displayJoinRoom() : <Chat socket={socket} room={room} username={username}></Chat>
    }
    </div>
  );
}

export default App;
