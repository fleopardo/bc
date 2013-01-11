/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	/*
	 * Variables
	*/


	/*
	 * Animacion en modulos
	*/
	$(".fotos > article").bind({


		"mouseenter": function(){

			$(this).find(".info").stop().fadeIn()

		},

		"mouseleave": function(){

			$(this).find(".info").stop().fadeOut()

		}

	});

})(window);