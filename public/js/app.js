var socket = io();
var time = moment().format("MMM Do YY");

socket.on('connect', function(){
	console.log('Connected to socket.io server!')
});

socket.on('message', function(message){
	console.log('New message:');
	console.log(message.text);
	var timeStamp = moment.utc(message.timestamp);

	$('.messages').append('<p><strong>' + timeStamp.local().format('h:mm a') + ": " + '</strong>' + message.text + '</p>');
});

//handles submitting of message
var form = $('#message-form');
var newMessage = $('#inputMessage');
//var newMessage = form.find('input[name=message]');

form.on('submit', function(e){
	e.preventDefault();

	socket.emit('message', {
		text: newMessage.val()
	});

	newMessage.val('');
});