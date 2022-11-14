const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);

app.get('/hello', (req, res) => {
    res.send('<h1>Hello world</h1>');
});
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
  });
server.listen(3000, () => {
    console.log('listening on *:3000');
});