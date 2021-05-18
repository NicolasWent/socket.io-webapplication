const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

users = [];

io.on('connection', (socket) => {
    console.log('a user connected');
    socket.on('disconnect', () => {
        console.log("user disconnected");
    });

    const currId = users.length;
    console.log(users);
    console.log(currId);

    socket.on('username', (username) => {
        users.push(username);
    });

    socket.on('chat message', (msg) => {
        io.emit('chat message', users[currId] + msg);
        // socket.broadcast.emit('hi'); <= will send message to everyone except himself
    });
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});
