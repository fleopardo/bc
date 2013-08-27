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



	/* ISOTOPE */
	;(function(){

		// cache container
		$container = $('.filterable');

		if($container.length > 0){

			$container.isotope({
			  // options
			  itemSelector : '.portfolio-item',
			  layoutMode : 'fitRows'
			});

			setTimeout(function(){
		        $container.isotope({
		          filter: '*',
		          resizeble: true,
		          animationOptions: {
		             duration: 750,
		             easing: 'linear',
		             queue: false,
		           }
		        });
		    }, 200);

			// filter items when filter link is clicked
			$('#filters .primary a').click(function(){

				var that = $(this);
				var selector = that.attr('data-filter');



				$('#filters .primary li').removeClass("active");
				that.parent().addClass("active");

				if(selector == ".ventas"){
					$("#filters .secondary").css("display","table");
				}else{
					$("#filters .secondary").hide();
					$('#filters .secondary li').removeClass("active");
				}

				$container.isotope({ filter: selector });
				return false;
			});

			// filter items when filter link is clicked
			$('#filters .secondary a').click(function(){

				var filterPrimary = $('#filters .primary li.active a').attr('data-filter');
				var selector = filterPrimary + $(this).attr('data-filter');

				$('#filters .secondary li').removeClass("active");
				$(this).parent().addClass("active");

				$container.isotope({ filter: selector });
				return false;
			});

		}

	}());

}());