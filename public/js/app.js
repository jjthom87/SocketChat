var socket = io();

socket.on('connect', function(){
	console.log('Connected to socket.io server!')
});

socket.on('message', function(message){
	console.log('New message:');
	console.log(message.text);
});

//handles submitting of message
var form = $('#message-form');
var newMessage = $('#inputMessage')

form.on('submit', function(e){
	e.preventDefault();

	socket.emit('message', {
		text: newMessage.val()
	});
	
	newMessage.val('');
});