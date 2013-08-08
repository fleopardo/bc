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
	 * Flag para saber si es ipad
	*/

		shale.isiPad = navigator.userAgent.match(/iPad/i) != null;

		if(shale.isiPad){ $("html").addClass("ipad") }


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
					verticalDragMinHeight : 100,
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
		if( $("html").hasClass("ie7") || shale.touch ){
			return false;
		}else{
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
		if( !$("html").hasClass("ie7")){
			shale.scrollCustom();
		}


	/*
	 * Abrir videos en modal
	*/

		// Todos los links con class video abren videos en modal
		$(".video").live(shale.event.TAP, function(event){

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

  					// Muestro finalmente el contenedor
					$("#container-video").fadeIn("fast",function(){
						// Llamo el script que inicializa los videos y carousel
						$.getScript("./js/videos.js");

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

					});

					// Muevo el scroll hasta arriba para ver el modal desde el principio
					$.scrollTo(0);

				}

			});

		});

	/*
	 * Recursos no convencionales location
	*/
		//El problema es que no podemos tener un <a> dentro de otro <a>. Por eso vamos a redirigir el link por JS
		$(".falso-link").live(shale.event.TAP,function(event){
			event.stopPropagation();
			event.preventDefault();

			var src = $(this).data("href");

			if( src ){
				document.location.href = src;
			}
		})

	/* back To Top Button */

	var linkBackToTop = $(".backToTop");

	linkBackToTop.live("click", function(event){
		event.preventDefault();
		$(window).scrollTo(0, {speed:500, easing: shale.navegacion.easing});
	});

	/*
	 * Cuando se anima la pagina se lanza el evento personalizado "navegacion"
	*/

		$(window).on("navegacion",function(){

			// Instancio Scroll Personalizado
			shale.equalHeightListados();

			if( !$("html").hasClass("ie7")){
				shale.scrollCustom();
			}

			// Seteo el alto de la seccion que viene a la mascara. Esto es porque si una seccion es muy alta y otra muy baja, la mascara toma el alto de la mas alta..y el footer queda abajo...dejando mucho espacio vacio
			$(".mascara").css("height",$(".contenido.active").height());

		});


	/* Compartir */

	/*$(".compartir").live(shale.event.TAP, function(){

		// creo y appendeo un contenedor
		$("body").append("<div class='wrapperCompartir'>");

		var wrapper = $(".wrapperCompartir");

		// hago la peticion
		wrapper.load("compartir.html", function(response, status, xhr) {

			if(status == "success"){

				var compartirWindow = $(".compartirWindow");

				// Acomodo el compartir en el centro
				var positionTop = ( $(window).height() - compartirWindow.height() ) / 2;
				var positionLeft = ( $(window).width() - compartirWindow.width() ) / 2;

				compartirWindow.css({
					"position":"absolute",
					"top": positionTop + "px",
					"left": positionLeft + "px"
				});

				// Bindeo el submit
				compartirWindow.find("#share-form").on("submit", function(event){




					// ..aca pueden validarlo.. (agregando class error al input se muestra el estilo de error)

					// ..hacen el envio por ajax..




					// Muestro mensaje de confirmacion

					compartirWindow.find(".content").hide();

					compartirWindow.find(".confirmacion").show();

						// Y bindeo el evento al boton de compartir con mas amigos

						compartirWindow.find(".mas-amigos").on(shale.event.TAP, function(event){

							event.preventDefault();

							compartirWindow.find(".content").show();

							compartirWindow.find(".confirmacion").hide();

						});

					event.preventDefault();

				});

				// Bindeo el close
				compartirWindow.find(".close").on(shale.event.TAP, function(){

					wrapper.fadeOut("fast", function(){

							wrapper.remove();

					});

				});

			}

			if(status == "error"){

				wrapper.remove();

			}

		})

	});*/


	/*
	 * Home de Novedades
	*/

	$("#novedades").find(".lista li").live("mouseenter", function(e){

		// pongo los estilos al active
		$("#novedades").find(".lista li").removeClass("active");
		$(this).addClass("active");

		//muestro la noticia ampliada arriba
		var position = $(this).data("position");

		$("#novedades").find(".detalle-novedad article").hide();
		$("#novedades").find(".detalle-novedad article[data-position='"+position+"']").show();



	});


}());