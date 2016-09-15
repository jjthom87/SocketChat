var name = getQueryVariable('name') || 'Anonymous';
var room = getQueryVariable('room') || 'Anonymous';
var socket = io();
var form = $('#message-form');
var newMessage = $('#inputMessage');
//var newMessage = form.find('input[name=message]');

socket.on('connect', function(){
	console.log('Connected to socket.io server!');

	socket.emit('joinRoom', {
		name: name,
		room: room
	});
});

socket.on('message', function(message){
	var timeStamp = moment.utc(message.timestamp);
	var messages = $('.messages');

	$('#roomTag').text("Welcome to the " + room + " room")
	messages.append('<p><strong>' + message.name + ' ' + timeStamp.local().format('h:mm a') + '</strong></p>');
	messages.append('<p>' + message.text + '</p>');
});

form.on('submit', function(e){
	e.preventDefault();

	socket.emit('message', {
		room: room,
		name: name,
		text: newMessage.val()
	});

	newMessage.val('');
});