/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/

// Chequeo si ya existe el namespace, sino lo instancio.

var shale = shale || {};

;(function(){

	/*
	 * Flag para saber si es dispositivo touch
	*/

		shale.touch = 'createTouch' in document;

	/*
	 * Eventos personalizados para soportar mobile y desktop
	*/

		shale.event = {};

		shale.event.DOWN = (shale.touch) ? 'touchstart' : 'mousedown';

		shale.event.UP = (shale.touch) ? 'touchend' : 'mouseup';

		shale.event.MOVE = (shale.touch) ? 'touchmove' : 'mousemove';

	    shale.event.TAP = (shale.touch) ? 'touchend' : 'click';

	    shale.event.ENTER = (shale.touch) ? 'touchstart' : 'mouseenter';

	    shale.event.LEAVE = (shale.touch) ? 'touchend' : 'mouseleave';



    /*
 	 * @public
 	 * Funcion para mismo alto en columnas (Necesito ademas setearlo un alto al scroll content sino no anda el scroll)
 	*/
	 	shale.equalHeightListados = function(){

		    $('.listado-container .left-col').each(function(){

				var altoLeft = $(this).height();
				var rightCol = $(this).next();
				var scrollContent = rightCol.find(".scrollCustom");

				rightCol.css('height',altoLeft);
				scrollContent.css("height",altoLeft - 50);

			});

		}


	/*
 	 * @public
 	 * Metodo para instanciar scroll personalizados
 	*/
		shale.scrollCustom = function(){

		 	var $scrollCustom = $(".scrollCustom:not(.init)");

		 	if($scrollCustom.length > 0){

				$scrollCustom.jScrollPane({
					verticalDragMaxHeight : 400,
					verticalDragMinHeight : 200,
					setWheelScrollingEnabled : true
				}).addClass("init");

				/*
			 	 * jsScrollPane soporte tactil
			 	*/

				if(shale.touch){

			 		$scrollCustom.bind('touchstart', function(e){

						var cpos = dragPosition;

						e = e.originalEvent.touches[0];

						var sY = e.pageY;
						var sX = e.pageX;

						$scrollCustom.bind('touchmove',function(ev){
							ev.preventDefault();
							ev = ev.originalEvent.touches[0];

							var top = cpos-(ev.pageY-sY);
							positionDrag(top);

						});

						$scrollCustom.bind('touchend',function(ev){
							$scrollCustom.unbind('touchmove touchend');
						});

					});
			 	}

			}

		}


	/*
	 * Bindeo para que funcione la navegacion animada
	*/
		if( !$("html").hasClass("ie7") ){

			$(".navegacion").live(shale.event.TAP,function(event){

				event.preventDefault();

				shale.navegacion.init({
					trigger: $(this),
					speed: 800,
					easing: "easeOutExpo"
				});

			});
		}

	/*
	 * Instancio el scroll personalizado
	*/

		// Igualo el alto de la columna derecha con la izquierda antes de poner el scroll. Esto hace que se vean iguales, y ademas le setea el alto necesario para que el scrollCustom calcule las medidas.
		shale.equalHeightListados();

		// Instancio los scroll personalizado
		shale.scrollCustom();


		// Cuando se anima la pagina se lanza el evento personalizado "navegacion"
		$(window).on("navegacion",function(){

			shale.equalHeightListados();
			shale.scrollCustom();

			// Seteo el alto de la seccion que viene a la mascara. Esto es porque si una seccion es muy alta y otra muy baja, la mascara toma el alto de la mas alta..y el footer queda abajo...dejando mucho espacio vacio
			$(".mascara").css("height",$(".contenido.active").height());

		});


	/*
	 * Abrir videos en modal
	*/

		// Todos los links con class video abren videos en modal
		$(".video").on(shale.event.TAP, function(event){

			event.preventDefault();
			event.stopPropagation();

			// Guardo la ruta que se llamara por ajax
			var src = $(this).attr("href");

			// Guardo el ID del video a cargar
			shale.videoID = $(this).data("video:id");

			// Creo un contenedor para cargar los videos
			$(".contenedor-principal").append("<div id='container-video' style='display:none;'></div>");

			// Hago el ajax
			$("#container-video").load(src + " .contenido", function(response, status, xhr) {

  				if (status == "success") {

  					$("body").append("<div class='overlayVideo'></div>");

  					// Llamo el script que inicializa los videos y carousel
					$.getScript("./js/videos.js");

					// Muestro finalmente el contenedor
					$("#container-video").fadeIn();

					// Muevo el scroll hasta arriba para ver el modal desde el principio
					$.scrollTo(0);

					// Bindeo el evento para cerrar el modal
					$(".overlayVideo,#container-video .volver").one(shale.event.TAP, function(event){
						event.preventDefault();
						event.stopPropagation();

						$(".overlayVideo").fadeOut("fast",function(){
							$(this).remove();
						});

						$("#container-video").fadeOut("fast",function(){
							$(this).remove();
						});

  					});

				}

			});

		});


}());