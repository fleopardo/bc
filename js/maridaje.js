/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var $scrollCustom = $('.scroll');

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


 	$('dt').each(function(){
 		$(this).click(function(){
 			$(this).parent().siblings('dl').find('dd').slideUp();
 			$(this).parent().siblings('dl').find('dt').removeClass('active');
 			$(this).toggleClass('active');
 			$(this).siblings('dd').slideToggle();
 		});
 	});
	

})(window);