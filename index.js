const {Server} = require('socket.io');
const dgram = require('dgram');

require('dotenv').config();

const httpServer = require('http').createServer();
const io = new Server(httpServer, {cors: '*'});

const {PORT = 4000, UDP_SERVER_PORT, UDP_SERVER_HOST} = process.env;

const udpClient = dgram.createSocket('udp4');

io.on('connection', socket => {
  console.log('Client connected');

  socket.on('sendMessage', message => {
    console.log('Message received from client:', message);

    const udpMessage = Buffer.from(JSON.stringify(message));
    udpClient.send(udpMessage, UDP_SERVER_PORT, UDP_SERVER_HOST, err => {
      if (err) console.error('UDP Error:', err);
    });
  });
});

httpServer.listen(PORT, () => {
  console.log('Node.js Server №1 listening on UDP port ' + PORT);
});
