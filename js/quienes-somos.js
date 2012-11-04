/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	/*
	 * Variables
	*/
 	var boxPersonas = $(".consejo-administrativo .info");

	/*
	 * Mismo alto para todas las cajas
	*/
	(function(){

		var height = 0;

		boxPersonas.each(function(){

			if ($(this).height() > height){

				height = $(this).height();

			}

		});

		boxPersonas.css("height",height);

	})();

})(window);