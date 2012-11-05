/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	/*
	 * Variables
	*/
	var boxDestacados = $(".lugares .jcarousel > li");

 	/*
	 * Init sliders
	*/
	$('.jcarousel').removeClass("notInit").jcarousel({
		scroll: 1
	});

	/*
	 * Mismo alto para todas las cajas
	*/
	ypf.equalHeight(boxDestacados);

})(window);