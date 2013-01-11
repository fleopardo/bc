/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	/*
		Animacion en modulos
	*/

	$(".bloques .span6").bind({


		"mouseenter": function(){
			$(this).find(".description").stop(true,true).fadeIn()

		},

		"mouseleave": function(){

			$(this).find(".description").stop(true,true).fadeOut()

		}

	});

	/*
	 * Mismo alto en los bloques
	*/
	ypf.equalHeight($(".bloques .span6 > p"));

})(window);