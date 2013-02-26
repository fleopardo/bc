/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var $scrollCustom = $('.scroll');

	// Inicializacion jsScrollPane
	$scrollCustom.jScrollPane({
		verticalDragMaxHeight : 39,
		verticalDragMinHeight : 39
	});

	// jsScrollPane soporte tactil

	if(latitud.isMobile()){

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

})(window);