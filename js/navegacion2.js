/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
 * Componente para manejar la navegacion async y animada
*/

// Chequeo si ya existe el namespace, sino lo instancio.
var shale = shale || {};


shale.navegacion2 = (function(window){

	var flag_direction;
	var sectionActive = 0;

	function move(n){

		// muevo la columna 1
		$(".col1").scrollTo('article:eq('+n+')', shale.navegacion2.speed );

		// muevo la columna 2, parte de arriba
		$(".col2 .arriba").scrollTo('article:eq('+n+')', shale.navegacion2.speed );

		// muevo la columna 2, parte de abajo
		$(".col2 .abajo").scrollTo('article:eq('+n+')', shale.navegacion2.speed );

		// muevo la columna 3, parte de arriba
		$(".col3 .arriba").scrollTo('article:eq('+n+')', shale.navegacion2.speed );

		// muevo la columna 3, parte de abajo
		$(".col3 .abajo").scrollTo('article:eq('+n+')', shale.navegacion2.speed );

		// muevo la columna 4
		$(".col4").scrollTo('article:eq('+n+')', shale.navegacion2.speed );
	}

	function setActiveMenu(n){

		$(".cadena-de-energia-detalle .menu li").removeClass("active");
		$(".cadena-de-energia-detalle .menu li[data-position="+n+"]").addClass("active");

	}


	function init(conf){

		shale.navegacion2.speed = conf.speed || 1000;
		shale.navegacion2.easing = conf.easing || "linear";
		shale.navegacion2.cantSection = conf.cantSection - 1;

		// obtener link clickeado
		var that = conf.trigger;

		// Si estoy clickeando en el mapa o el menu tengo data-position
		if( that.data("position") >= 0 ){

			sectionActive = that.data("position");

		// Sino estoy clickeando en las fechas de navegacion

		}else{


			// Si clickeo ANTERIOR
			if( that.data("nav") == "prev"){

				flag_direction = "left";

				// Valido que haya articulos anteriores
				if(sectionActive == 0){
					return;
				}else{
					// muevo hacia atras
					sectionActive--;

				}

			// Si clickeo en siguiente
			}else{


				flag_direction = "right";

				if(sectionActive >= shale.navegacion2.cantSection){
					return;
				}else{
					// muevo hacia atras
					sectionActive++;
				}
			}

		}

		move(sectionActive);
		setActiveMenu(sectionActive);


	}

	return {
		init: init
	}

})(window);