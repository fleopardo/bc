/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var $contentPage = $(".contentPage"),
		$seccionLatitud = $(".latitud"),
		$seccionElOrigen = $(".el-origen"),
		$seccionLaCreacion = $(".la-creacion"),
		$seccionElVino = $(".el-vino"),
		$scrollCustom = $('.scroll'),

		$elOrigen_offset = $seccionElOrigen.offset().top,
		$laCreacion_offset = $seccionLaCreacion.offset().top,
		$elVino_offset = $seccionElVino.offset().top,

		$navSecciones = $(".scroll-nav");

	/*
	 * Funcion para activar color en lista de navegacion
	*/

	function activeNav(){

		var scrolled = latitud.window.scrollTop();

		// Si el scroll esta dentro del area "El Origen"..
		if ( (scrolled >= $elOrigen_offset) && (scrolled < $laCreacion_offset) ){

			$navSecciones.find("a").removeClass("active");
			$(".el-origen-nav").addClass("active");

		} else if ( (scrolled >= $laCreacion_offset) && (scrolled < $elVino_offset) ){

			$navSecciones.find("a").removeClass("active");
			$(".la-creacion-nav").addClass("active");

		} else if ( scrolled >= $elVino_offset ){

			$navSecciones.find("a").removeClass("active");
			$(".el-vino-nav").addClass("active");

		}else{

			$navSecciones.find("a").removeClass("active");
			$(".latitud-nav").addClass("active");

		}
	}

	/*
 	 * Inicializacion jsScrollPane
 	*/
	$scrollCustom.jScrollPane({
		verticalDragMaxHeight : 39,
		verticalDragMinHeight : 39,
		setWheelScrollingEnabled : true
	});

	/*
 	 * jsScrollPane soporte tactil
 	*/

	if(latitud.touch){

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


 	/*
 	 * navegacion seccion nuestros vinos -> vinos
 	*/

 	// Si es desktop oculto los links, sino los dejo visible porque en tablets no existe :hover
 	if( !latitud.touch ){

 		$contentPage.addClass("parallax");

 		$seccionElVino.find("nav a").css("display","none");

 	}

 	// Muestro y oculto los links cuando me paro sobre el menu (No uso los eventos personalizados ya que solo es para desktop)
	$seccionElVino.find("nav li").on({

		mouseenter: function(){

			var link = $(this).find("a");

			if( !link.hasClass("active") ){

				link.stop(true,true).slideDown("fast");

			}

		},

		mouseleave: function(){

			var link = $(this).find("a");

			if( !link.hasClass("active") ){

				link.stop(true,true).slideUp("fast");

			}

		}

	});

	$seccionElVino.find(".botellas-container li").on({

		mouseenter: function(){

			var asociacionLink = $(this).attr("data-class");

			var linkActivo = $seccionElVino.find("nav ."+asociacionLink + " a");

			if( !linkActivo.hasClass("active") ){

				var flag = $(this).data("class");

				$seccionElVino.find("nav ."+flag+" a").stop(true,true).slideDown("fast");

			}
		},

		mouseleave: function(){

			var link = $(this).find("a");

			var asociacionLink = $(this).attr("data-class");

			var linkActivo = $seccionElVino.find("nav ."+asociacionLink + " a");

			if( !linkActivo.hasClass("active") ){

				var flag = $(this).data("class");

				$seccionElVino.find("nav ."+flag+" a").stop(true,true).slideUp("fast");

			}

		}

	});


	/*
	 * Bindeo a todos los links que necesitan moverse con scrollTo
	*/
	$(".scroll-to").on(latitud.event.TAP,function(event){

		var that = $(this),
			anchor = that.attr("data-scroll:anchor") || null,
			speed = parseInt(that.attr("data-scroll:speed")) || 1500,
			sectionName = that.text();

		if( anchor !== null ){

			event.preventDefault();

			$.scrollTo.window().queue([]).stop();
			$.scrollTo(anchor, {speed: speed, easing:'easeOutExpo'});

			if(window.history.pushState){
				window.history.pushState(null, sectionName, anchor);
			}

			/** actualizo los active **/
			//currentNavigation(that);
		}

	});


	/*
	 * Tooltips en navegacion
	*/
	$navSecciones.find("a").on(latitud.event.ENTER,function(){

		$(this).find("span").stop(true,true).fadeIn("200");

	});

	$navSecciones.find("a").on(latitud.event.LEAVE,function(){

		$(this).find("span").stop(true,true).fadeOut("200");

	});

	/* Chequeo el active al inicio*/
	activeNav();

	/* Chequeo el active on scroll cada 100 ms para no matar al browser */
	$(window).on("scroll",function(){

		setTimeout(function(){

			activeNav();

		},100);

	});







/*
 * Objeto con la funcionalidad para la navegacion entre vinos
*/


	var navegacion = {};


/*
 * Crea el div donde se va a cargar el detalle del vino
*/


	(function(){

		var div = '<div id="detalle-vino" style="display: none;"></div>';

		$(".contenedorDetalleVino").append(div);

	}());


/*
 * Flag para saber cuando está el detalle abierto
*/


	navegacion.isOpen = false;


/*
 * Funcion para mostrar el div con el detalle
*/


	navegacion.showDetalle = function(){

		$("#detalle-vino").delay(300).fadeIn(1000);

	};


/*
 * Funcion para cerrar el div con el detalle
*/


	navegacion.closeDetalle = function(){


		$("#detalle-vino").fadeOut(300,function(){

			$("#detalle-vino").empty();

			navegacion.isOpen = false;

		});

	};


/*
 * Funcion para mostrar el div con las botellas
*/


	navegacion.showBotellas = function(){

		$(".botellas-container").fadeIn(1000);

	};


/*
 * Funcion para ocultar el div con el detalle
*/


	navegacion.hideBotellas = function(){

		$(".botellas-container").fadeOut(300);

	};


/*
 * Funcion para activar el link
*/


	navegacion.activeLink = function(link){

		$seccionElVino.find("nav a").removeClass("active");

		link.addClass("active").show();

		$seccionElVino.find("nav a").not(".active").hide();

	};


/*
 * Funcion para desactivar el link
*/


	navegacion.desactiveLink = function(link){

		link.removeClass("active").hide();

	};


/*
 * Funcion para el GET
*/


	navegacion.peticion = function(url,link){

		if(!link.hasClass("active")){

			navegacion.closeDetalle();

			//Pongo un timer del mismo tiempo que el delay usando closeDetalle() Para que tenga tiempo de borrar el contenido
			setTimeout(function(){

				$("#detalle-vino").load(url + " .nuestros-vinos-interna", function(response, status, xhr){

					if(status == "success"){

						navegacion.hideBotellas();

						navegacion.showDetalle();

						$(".volver-vinos").one(latitud.event.TAP, function(event){

							event.preventDefault();

							navegacion.showBotellas();

							navegacion.closeDetalle();

							navegacion.isOpen = false;

							navegacion.desactiveLink(link);

						})

					}

					if(status == "error"){

						navegacion.closeDetalle();

						navegacion.showBotellas();

						navegacion.desactiveLink(link);

						navegacion.isOpen = false;

					}

				});

			},400);

		}

	}


	$seccionElVino.find("nav a").on(latitud.event.TAP,function(event){

		navegacion.isOpen = true;

		event.preventDefault();

		var url = $(this).attr("href");

		navegacion.peticion(url,$(this));

		navegacion.activeLink($(this));

	});

	$seccionElVino.find(".botellas-container li a").on(latitud.event.TAP,function(event){

		navegacion.isOpen = true;

		event.preventDefault();

		var url = $(this).attr("href");

		var asociacionLink = $(this).parent().attr("data-class");

		var link = $seccionElVino.find("nav ."+asociacionLink + " a");

		navegacion.peticion(url,link);

		navegacion.activeLink(link);

	});








})(window);

