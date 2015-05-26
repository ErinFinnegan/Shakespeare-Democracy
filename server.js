var io = require('socket.io'),
	connect = require('connect'),
	sugar = require('sugar'),
	app = connect().use(connect.static('public')).listen(8000),
	room = io.listen(app);

var ID = 0,
	emotionListLength,
	currentEmotion = 0,
	votes = [],
	winningVote;

//CONFIGURE WEBSOCKETS
room.configure(function() {
	room.set("transports", ["websocket"]);
	room.set("log level", 2);
});


room.sockets.on('connection', function(socket) {

	socket.emit('entrance', {
		message: 'Welome to Twitch Plays Hamlet. Choose an emotion for our actors.',
		id: ID,
	});
	ID++;

	//GET LENGTH OF EMOTION LIST
	socket.on('emotions', function(data) {
		emotionListLength = data.l;
		console.log("There are this many emotions: " + emotionListLength);
		socket.emit('newEmotion', {
			emotion: currentEmotion
		});

	})

	socket.on('vote', function(data) {
		console.log(data.vote);
		votes.push(data.vote);
	});

	socket.on('forward', function(data) {
		if (votes.count('choice-one') > votes.count('choice-two') ){
			winningVote = 'choice-one';
		}else{
			winningVote = 'choice-two';
		}

		votes = [];
		room.sockets.emit('winner', {winner: winningVote, emotion: currentEmotion});
		console.log(winningVote);
		currentEmotion++;
		room.sockets.emit('newEmotion', {
			emotion: currentEmotion
		});
	});

	socket.on('back', function(data) {
		if (currentEmotion > 0) {
			currentEmotion--;
		}
		room.sockets.emit('newEmotion', {
			emotion: currentEmotion
		});
	});

	socket.on('reset', function(data) {
		currentEmotion = 0;
		room.sockets.emit('winner', {winner: 'choice-one', emotion: currentEmotion})
		room.sockets.emit('newEmotion', {
			emotion: currentEmotion
		});
	});

});
