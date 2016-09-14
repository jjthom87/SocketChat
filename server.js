var PORT = process.env.PORT || 5000;
var express = require('express');
var app = express();
var http = require('http').Server(app);
var io = require('socket.io')(http);

app.use(express.static(__dirname + '/public'));

io.on('connection', function (socket) {
	console.log('User connected via socket.io');

	socket.on('message', function(message){
		console.log('Message received: ' + message.text);

		// io.emit sends to every person
		//below sends to every person but the sender
		socket.broadcast.emit('message', message);
	});

	socket.emit('message', {
		text: 'Welcome to the chat'
	});
});

http.listen(PORT, function (){
	console.log('Server Started');
});

