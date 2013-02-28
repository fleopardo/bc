/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var $seccionLatitud = $(".latitud"),
		$seccionElOrigen = $(".el-origen"),
		$seccionLaCreacion = $(".la-creacion"),
		$seccionElVino = $(".el-vino"),
		$scrollCustom = $('.scroll');

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

 		$seccionElVino.find("nav a").css("display","none");

 	}

 	// Muestro y oculto los links cuando me paro sobre el menu (No uso los eventos personalizados ya que solo es para desktop)
	$seccionElVino.find("nav li").on({

		mouseenter: function(){
			$(this).find("a").stop(true,true).slideDown("fast");
		},

		mouseleave: function(){
			$(this).find("a").stop(true,true).slideUp("fast");
		}

	});

	$seccionElVino.find(".botellas-container li").on({

		mouseenter: function(){

			var flag = $(this).data("class");

			$seccionElVino.find("nav ."+flag+" a").stop(true,true).slideDown("fast");
		},

		mouseleave: function(){

			var flag = $(this).data("class");

			$seccionElVino.find("nav ."+flag+" a").stop(true,true).slideUp("fast");

		}

	});



})(window);