$(document).ready(function() {
	var myID,
		emotionList,
		emotionList2,
		voted = false,
		socket = io.connect('http://localhost:8000');



	//GET EMOTION LISTS
	var request = new XMLHttpRequest(),
	request2 = new XMLHttpRequest();

	request.onload = function() {
		var emotionText = this.responseText;
		console.log('e1 ', emotionText);
		emotionList = emotionText.split('\n');
		socket.emit('emotions', {
			l: emotionList.length
		});
	}
	request.open('GET', '../assets/emotions.txt', true);
	request.send();

	request2.onload = function() {
		var emotionText2 = this.responseText;
		console.log('e2 ', emotionText2);
		emotionList2 = emotionText2.split('\n');
	}
	request2.open('GET', '../assets/emotions2.txt', true);
	request2.send();


	//ENTRANCE
	socket.on('entrance', function(data) {
		myID = data.id;
		message = data.message;
		console.log(message, 'Your id is ' + myID + '.');
	})


	//ON NEW EMOTION
	socket.on('newEmotion', function(data) {
		voted = false;
		console.log('e1 ,', emotionList[data.emotion]);
		console.log('e2 ,', emotionList2[data.emotion]);

    $('#parent').addClass('transition');
    setTimeout(function() {
  		$('#parent').removeClass('transition').html(
  			'<div id="select"><h1>select</h1></div>'
  		+	'<div class="choice tk-de-walpergens-pica" id="choice-one"><em>'+emotionList[data.emotion]+'</em></div>'
  		+	'<div id="or"><h1>or</h1></div>'
  		+	'<div class="choice tk-de-walpergens-pica" id="choice-two"><em>'+emotionList2[data.emotion]+'</em></div>');
    }, 200);
	})

	$(document).on('tap', '.choice', function(){
		var selected = $(this).attr('id');
		if (!voted){
  		socket.emit('vote', {
  			vote: $(this).attr('id'),
  			id: myID
  		})
  		console.log('which vote ', $(this).attr('id'));
  		voted = true;
		}

    $('#parent').addClass('transition');
    setTimeout(function() {
  		$('#parent').removeClass('transition').html(
  			'<div id="select"><h1>you</br>selected</h1></div>'
  		+	'<div class="ur-choice tk-de-walpergens-pica"><em>' + $('#'+selected).text() + '</em></div>'
  		+	'<div><h1>please wait...</h1></div>');
    },200);
	})

})