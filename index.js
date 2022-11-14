const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);
let userCount=0;
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
    userCount =userCount +1;
    let userName=`User${userCount}`;
    console.log(`${userName} connected`);
    socket.emit('hi',`Welcom ${userName}`);
    socket.on('disconnect', () => {
        console.log('user disconnected');
    });
    socket.on('chat message', (msg) => {
        console.log('message: ' + `${userName} : ${msg}`);
        io.emit('chat message', `${userName} : ${msg}`);
        // socket.emit('chat message', msg);
    });
});
io.on('disconnect',()=>{
    console.log("disconneted");
});

server.listen(3000, () => {
    console.log('listening on *:3000');
});