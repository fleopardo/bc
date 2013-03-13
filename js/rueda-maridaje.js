/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){


	var value = 0

	function move(direction,event){

		value = (direction == "left") ? value -=40 : value +=40;
		$("#img").rotate({ animateTo:value})
		event.preventDefault();
	}

	$(".prev").on("click",function(event){

		move("left",event);

	})

	$(".next").on("click",function(event){

		move("right",event);

	})

	/* Esto es para dispositivos touch */
	$('#maridaje').touchwipe({
		wipeLeft: function() {
		    move("left",event);
		},
		wipeRight: function() {
		    move("right",event);
		},

		preventDefaultEvents: false
	});

})(window);