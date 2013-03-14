/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

var navegacion = (function(window){

	var mascara = $('.mascara');
	var slide = mascara.find(".slide");
	var flag_direction;
	var scroll_speed = 500;


	function crearContenedor(){

		if( flag_direction == "left" ){

			slide.prepend('<div class="ajax-container" style="float: left;"></div>');

		}else{

			slide.append('<div class="ajax-container" style="float: left;"></div>');

		}

	}


	function peticion(src,page_id){

		$(".ajax-container").load(src + " .contenido", function(response, status, xhr){

			if(status == "success"){

				// Si appendeo en la izquierda muevo el scroll hacia la seccion donde estaba parado con velocidad 0, porque cuando agregas algo en la izquierda logicamente se corre todo el contenido..
				if( flag_direction == "left" ){

					mascara.scrollTo("#" + id_seccion_inicial, 0);

				}

				mascara.scrollTo("#" + page_id, scroll_speed);

				$("#loading").remove();

			}else if(status == "error"){

				$("#loading").remove();

				alert("Ocurrio un error");

			}

		})

	}


	function init(el){

		// obtener link clickeado
		var that = el;

		// Obtener el id de la pagina que se quiere cargar
		var page_id = "#" + that.data("page-id");

		// Si la seccion ya esta cargada en el documento..
		if ( $(page_id).length > 0 ){

			//Voy a la seccion directamente
			mascara.scrollTo(page_id, scroll_speed);

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
			crearContenedor();

			// Hago la peticion
			peticion(src,page_id);

		}

	}

	return {
		init: init
	}

})(window);


$.ajaxSetup({

	beforeSend: function() {

		var loading = '<div id="loading"></div>';
		$("body").append(loading);

	}

});

var id_seccion_inicial = $(".mascara .slide section").attr("id");

$(".navegacion").live("click",function(event){

	event.preventDefault();

	navegacion.init($(this));

})