$(document).ready(function(){
	var socket = io.connect('http://localhost:8000');

	//GET EMOTION LISTS
	var emotionList, emotionList2;
	var request = new XMLHttpRequest(),
	request2 = new XMLHttpRequest();

	request.onload = function() {
		var emotionText = this.responseText;
		console.log('e1 ', emotionText);
		emotionList = emotionText.split('\n');
		$('#winner').html(emotionList[0]);
		$('#up-next').html(emotionList[0]);
	}
	request.open('GET', '../assets/emotions.txt', true);
	request.send();

	request2.onload = function() {
		var emotionText2 = this.responseText;
		console.log('e2 ', emotionText2);
		emotionList2 = emotionText2.split('\n');
		$('#up-next').append(" ", emotionList2[0]);
	}
	request2.open('GET', '../assets/emotions2.txt', true);
	request2.send();



	socket.on('winner', function (data){
		var winner;
		console.log('got winner ', data.winner)
		if (data.winner == "choice-one"){
			winner = emotionList[data.emotion]
		}else{
			winner = emotionList2[data.emotion]
		}
		$('#winner').html(winner);
		$('#up-next').html(emotionList[data.emotion + 1] + "&nbsp;" + emotionList2[data.emotion + 1]);
		console.log('e1 ', emotionList[data.emotion + 1], " ", 'e2 ', emotionList2[data.emotion + 1]);
	});



});