/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){


	var latitud = {};


	/*
	 * Cache de variables cros-site / Helpers
	*/

	latitud.window = $(window);

	latitud.document = $(document);

	latitud.body = $("body");


	/*
	 * Flag para saber si es dispositivo touch
	*/

	latitud.touch = 'createTouch' in document;

	/*
	 * Eventos personalizados para soportar mobile y desktop
	*/

	latitud.event = {};

	latitud.event.DOWN = (latitud.touch) ? 'touchstart' : 'mousedown';

	latitud.event.UP = (latitud.touch) ? 'touchend' : 'mouseup';

	latitud.event.MOVE = (latitud.touch) ? 'touchmove' : 'mousemove';

    latitud.event.TAP = (latitud.touch) ? 'touchend' : 'click';

    latitud.event.ENTER = (latitud.touch) ? 'touchstart' : 'mouseenter';

    latitud.event.LEAVE = (latitud.touch) ? 'touchend' : 'mouseleave';


	/*
     * Funcion para carga async de imagenes
    */

    latitud.imglazyload = function(selector){

		selector.each(function(i,e){

			var srcOrig = $(e).attr("data-src");

			$(e).attr("src",srcOrig);

		});

	}

    /*
     * Export object
    */
	window.latitud = latitud;


	/*
	 * Elimino class no-js
	*/
	$("html").removeClass("no-js");
	
	if (latitud.touch) {
		$('html').addClass('touch');
	}

})(window);