const http = require('http');
const app = require('./server');
const { Server } = require('socket.io');

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*'
  }
});

io.on('connection', (socket) => {
  console.log('User connected');

  socket.on('task-change', (data) => {
    socket.broadcast.emit('task-update', data);
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 5000;
server.listen(PORT, () => console.log(`Server running on port ${PORT}`));
