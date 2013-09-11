/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
 * Componente para manejar la navegacion async y animada
*/

// Chequeo si ya existe el namespace, sino lo instancio.
var shale = shale || {};


shale.navegacion = (function(window){

	var id_seccion_actual = $(".mascara .slide > section").attr("id"),
		mascara = $('.mascara'),
		slide = mascara.find(".slide"),
		flag_direction;

		if(history.replaceState){

			history.replaceState({'page_id':id_seccion_actual}, null, window.location);

		}


	function crearContenedor(page_id){

		if( flag_direction == "left" ){

			slide.prepend('<div class="ajax-container-'+page_id+'" style="float: left;"></div>');

		}else{

			slide.append('<div class="ajax-container-'+page_id+'" style="float: left;"></div>');

		}

	}


	function peticion(src,page_id){

		$(".ajax-container-"+page_id).load(src + " .contenido", function(response, status, xhr){

			if(status == "success"){

				// Si appendeo en la izquierda muevo el scroll hacia la seccion donde estaba parado con velocidad 0, porque cuando agregas algo en la izquierda logicamente se corre todo el contenido..
				if( flag_direction == "left" ){

					$.scrollTo.window().queue([]).stop();

					mascara.scrollTo("#" + id_seccion_actual, {speed:0, easing: shale.navegacion.easing});

				}

				// Fix carga de la seccion antes que esten cargadas las imagenes
				setTimeout(function(){

					if(window.history.pushState){

						window.history.pushState({'page_id':page_id}, page_id, src);

					}else{

						window.location.hash = "#!"+page_id;

					}

					$(".contenido").removeClass("active");
					$("#"+page_id).addClass("active");

					$.scrollTo.window().queue([]).stop();

					mascara.scrollTo("#" + page_id, {speed:shale.navegacion.speed, easing: shale.navegacion.easing});

					$("#loading").remove();

					//Ahora la seccion actual es hacia la que me movi

					id_seccion_actual = page_id;

					// Activo los links en el header
					/*if( $(".headerYPF").length > 0 && $(".contenedor-principal").hasClass("home")){
						headerYPF.removeActives();
						headerYPF.setActive($(".headerYPF ."+state.page_id+" > a"));
					}*/

					// lanzo un evento
					$(window).trigger("navegacion");

				},800);


			}else if(status == "error"){

				$("#loading").remove();

				alert("Error! La pagina que buscas no existe.");

			}

		})

	}


	function init(conf){

		shale.navegacion.speed = conf.speed || 1000;
		shale.navegacion.easing = conf.easing || "linear";

		// obtener link clickeado
		var that = conf.trigger;

		// Obtener el id de la pagina que se quiere cargar
		var page_id = that.data("page-id");

		// obtener url que se quiere cargar
		var src = that.attr("href");

		// Si la seccion ya esta cargada en el documento..
		if ( $("#" + page_id).length > 0 ){

			$(".contenido").removeClass("active");
			$("#"+page_id).addClass("active");

			//Voy a la seccion directamente
			$.scrollTo.window().queue([]).stop();

			mascara.scrollTo("#" + page_id, shale.navegacion.speed);

			if(window.history.pushState){

				window.history.pushState({'page_id':page_id}, page_id, src);

			}else{

				window.location.hash = "#!"+page_id;

			}

			//Ahora la seccion actual es hacia la que me movi
			id_seccion_actual = page_id;

			// Activo los links en el header
			if( $(".headerYPF").length > 0 && $(".contenedor-principal").hasClass("home")){
				headerYPF.removeActives();
				headerYPF.setActive($(".headerYPF ."+state.page_id+" > a"));
			}

			// lanzo un evento
			$(window).trigger("navegacion");

		}else{

			// obtener la direccion hacia donde se mover
			if( that.data("nav") == "prev"){

				flag_direction = "left";

			}else{

				flag_direction = "right";

			}

			// Crear el contenedor
			crearContenedor(page_id);

			// Muestro loading
			$("body").append('<div id="loading"></div>');

			// Hago la peticion
			peticion(src,page_id);

		}


		// Used to detect initial (useless) popstate.
		// If history.state exists, assume browser isn't going to fire initial popstate.
		var popped = ('state' in window.history),
			initialURL = window.location.href;

		// popstate handler takes care of the back and forward buttons
		//
		// You probably shouldn't use pjax on pages with other pushState
		// stuff yet.
		window.onpopstate = function(event) {

			// Ignore inital popstate that some browsers fire on page load
			var initialPop = !popped && location.href == initialURL

			popped = true

			if ( initialPop ) return

			var state = event.state;

			if ( state ) {

				if ($("#" + event.state.page_id).length > 0){

					mascara.scrollTo("#" + event.state.page_id, shale.navegacion.speed);

					$(".contenido").removeClass("active");
					$("#"+state.page_id).addClass("active");

					// Activo los links en el header
					if( $(".headerYPF").length > 0 && $(".contenedor-principal").hasClass("home")){
						headerYPF.removeActives();
						headerYPF.setActive($(".headerYPF ."+state.page_id+" > a"));
					}

					// lanzo un evento
					$(window).trigger("navegacion");
				}

			}else{


			}

		}

	}

	return {
		init: init
	}

})(window);