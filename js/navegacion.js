/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
 * Componente para manejar la navegacion async y animada
*/

var shale = shale || {};

shale.navegacion = (function(window){

	var id_seccion_actual = $(".mascara .slide > section").attr("id"),
		mascara = $('.mascara'),
		slide = mascara.find(".slide"),
		flag_direction;


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

					mascara.scrollTo("#" + id_seccion_actual, {speed:0, easing: shale.navegacion.easing});

				}

				mascara.scrollTo("#" + page_id, {speed:shale.navegacion.speed, easing: shale.navegacion.easing});

				$("#loading").remove();

				//Ahora la seccion actual es hacia la que me movi
				id_seccion_actual = page_id;

			}else if(status == "error"){

				$("#loading").remove();

				alert("Ocurrio un error");

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

		// Si la seccion ya esta cargada en el documento..
		if ( $("#" + page_id).length > 0 ){

			//Voy a la seccion directamente
			mascara.scrollTo("#" + page_id, shale.navegacion.speed);

		}else{

			// obtener url que se quiere cargar
			var src = that.attr("href");

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

	}

	return {
		init: init
	}

})(window);