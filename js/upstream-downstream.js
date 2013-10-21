/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){


	var $galleryCarousel = $('#carousel-thumbs'),
		$galleryZoom = $(".galeria .zoom");
		$prueba = $(".upstream-downstream section.content .galeria.left article > a");

	/* Instancio carousel */
	//$galleryCarousel.removeClass("mask").jcarousel();

	/*
 	 * @public
 	 * Metodo para instanciar scroll personalizados
 	*/
		;(function(){

		 	var $scrollCustom = $(".scrollCustom");

		 	if($scrollCustom.length > 0){

		 		//$scrollCustom.removeClass("mask");
		 		var width = 50 ;

		 		$scrollCustom.find("li").each(function(){

		 			width = width + $(this).width();

		 		});

		 		$scrollCustom.find("ul").css("width",width);


				$scrollCustom.jScrollPane({
					verticalDragMaxHeight : 400,
					verticalDragMinHeight : 100,
					setWheelScrollingEnabled : true
				});

				/*
			 	 * jsScrollPane soporte tactil
			 	*/

				if('createTouch' in document){

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

		})();

	/* ZOOM de carousel */
	$galleryCarousel.find("li").on("click", function(event){

		event.preventDefault();

		$galleryZoom.find("article").hide();
		$galleryZoom.find("article[data-id='" + $(this).data('id') + "']").show();

	});

	$prueba.mouseenter(function(){
		$(this).find('div').stop(true,true).fadeIn();
	});

	$prueba.mouseleave(function(){
		$(this).find('div').stop(true,true).fadeOut();
	});

}());
