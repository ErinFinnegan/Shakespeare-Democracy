$(document).ready(function() {
	var socket = io.connect('http://localhost:8000');

	$('#scene-1').click(function(e) {
		console.log('emited scene1');
		e.preventDefault();
	});

	$('#scene-2').click(function(e) {
		console.log('emited scene2');
		e.preventDefault();
	});

	$('#back').click(function(e) {
		console.log('emited back');
		e.preventDefault();
		socket.emit('back');
	});

	$('#forward').click(function(e) {
		e.preventDefault();
		console.log('emited forward');
		socket.emit('forward');
		console.log('emited forward');
	});

	$('#reset').click(function(e) {
		console.log('emited reset');
		e.preventDefault();
		socket.emit('reset');
	});

});