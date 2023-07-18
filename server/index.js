


const express = require('express');
// Build server with socket.io
const http = require('http');
// Socket.io deals with a lot of cors issues
const cors = require('cors');
const { Server } = require("socket.io");

const app = express();

app.use(cors());

const SERVER_PORT = 3002;
const REACT_PORT = 3003;

const server = http.createServer(app);

const io = new Server(server, {
    cors: {
        // Telling our server which url is going be calling our socket io server (react server)
        origin: `http://localhost:${REACT_PORT}`,
        methods: ["GET", "HEAD", "OPTIONS", "POST", "PUT"]
    }
});


io.on('connection', (socket) => {
    
    console.log("socket id: ", socket.id);

    // Data is the id of the room
    socket.on('join_room', (data) => { 
        socket.join(data);
        console.log(`user with id: ${socket.id} joined room: ${data}`)
    });

    socket.on('send_message', (data) => { 
        const {room ,author, message, time} = data;
        socket.to(data.room).emit('receive_message', data);
        console.log(`${author} send ${message} to room: ${room} at ${time}`);
    });

    socket.on('disconnect', () => {
        console.log("socket disconnected", socket.id);
    });
})

server.listen(SERVER_PORT, () => {
    console.log(`listening on http://localhost:${SERVER_PORT}`);
})