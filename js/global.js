/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/

// Chequeo si ya existe el namespace, sino lo instancio.

var app = app || {};

;(function(){

	/*
	 * Flag para saber si es ipad
	*/

		app.isiPad = navigator.userAgent.match(/iPad/i) != null;

		if(app.isiPad){ $("html").addClass("ipad") }


	/*
	 * Flag para saber si es dispositivo touch
	*/

		app.touch = 'createTouch' in document;

	/*
	 * Eventos personalizados para soportar mobile y desktop
	*/

		app.event = {};

		app.event.DOWN = (app.touch) ? 'touchstart' : 'mousedown';

		app.event.UP = (app.touch) ? 'touchend' : 'mouseup';

		app.event.MOVE = (app.touch) ? 'touchmove' : 'mousemove';

	    app.event.TAP = (app.touch) ? 'touchend' : 'click';

	    app.event.ENTER = (app.touch) ? 'touchstart' : 'mouseenter';

	    app.event.LEAVE = (app.touch) ? 'touchend' : 'mouseleave';


	/* Inicializo tooltips */
	$('[title]').tipTip();


	/*
 	 * Inicializo y bindeo todo los eventos necesarios para el header
 	*/

 		if( $(".headerYPF").length > 0 ){

			$('.jcarousel-header').removeClass("mask").jcarousel({
				scroll: 1,
				start : 1
			});

			// Bindeo para abrir submenus
			headerYPF.vars.header.find(".hasSubmenu").on("click",function(event){
				event.preventDefault();
				headerYPF.openSubmenu($(this));
			});

			// Bindeo para abrir buscador
			headerYPF.vars.header.find(".buscar > a").on("click", function(event){
				event.preventDefault();
				headerYPF.openSearch();
			});

			// Bindeo para cerrar buscador
			headerYPF.vars.buscador.find(".close").on("click", function(){
				headerYPF.closeSearch();
			});

		}



}());