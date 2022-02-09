var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var port = process.env.PORT || 3000;

server.listen(port, function () {
  console.log('Server listening at port %d', port);
});

app.use(express.static('public'));


var numUsers = 0;

io.on('connection', function (socket) {
  var addedUser = false;

  socket.on('new message', function (data) {
    socket.broadcast.emit('new message', {
      username: socket.username,
    //   usering: socket.usering,
      message: data
    });
  });

  socket.on('add user', function (username, usering) {
    if (addedUser) return;

    socket.username = username;
    socket.usering = usering;
    ++numUsers;
    addedUser = true;
    socket.emit('login', {
      numUsers: numUsers
    });
    socket.broadcast.emit('user entrou', {
      username: socket.username,
     //  usering: socket.usering,
      numUsers: numUsers
    });
  });

  socket.on('typing', function () {
    socket.broadcast.emit('typing', {
      username: socket.username,
      // usering: socket.usering
    });
  });

  socket.on('stop typing', function () {
    socket.broadcast.emit('stop typing', {
      username: socket.username,
     //  usering: socket.usering
    });
  });

  socket.on('disconnect', function () {
    if (addedUser) {
      --numUsers;

      socket.broadcast.emit('user saiu', {
        username: socket.username,
     //  usering: socket.usering,
        numUsers: numUsers
      });
    }
  });
});
