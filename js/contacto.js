/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	$(window).load(function() {

		/*
		 * Necesita estar en visibility hidden desde el CSS para que el plugin de menu encuentre los campos.
		 * En el JS, le pongo display none, le quito el hidden y hago un fadeIn. (FadeIn no funciona con visibiliity hidden)
		*/
		$(".formulario").hide().css("visibility","visible").fadeIn();

	});


})(window);