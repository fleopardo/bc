/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	/*
	 * Variables
	*/
	var boxDestacados = $(".modulos .info");
	var parrafoDestacados = $(".modulos .parrafo");

 	/*
	 * Init sliders
	*/
	$('.jcarousel').removeClass("notInit").jcarousel({
		scroll: 1
	});

	/*
	 * Mismo alto para todas las cajas
	*/
	ypf.equalHeight(parrafoDestacados);
	ypf.equalHeight(boxDestacados);


})(window);