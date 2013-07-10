/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	/*
	 * Variables
	*/
	var boxDestacados = $(".modulos .superior .info");

 	/*
	 * Init sliders
	*/

	if( $('.jcarousel').length > 0){
		$('.jcarousel').removeClass("notInit").jcarousel({
			scroll: 1
		});
	}

	/*
	 * Mismo alto para todas las cajas
	*/
	ypf.equalHeight(boxDestacados);


})(window);