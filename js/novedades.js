/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){

	var $galleryCarousel = $('#carousel-thumbs'),
		$notasPreview = $('.bloques-tabs article'),
		$notas = $('.notas-content'),
		$altoNotaContentInicial = $notas.find('.active').height();

	$notas.css('height',$altoNotaContentInicial);


	$notasPreview.on("click", function(event){

		 event.preventDefault();

		 if( $(this).hasClass('active') ){

		 	return false;

		 }else{

		 	var $notaActive = $(this).data('id'),
		 		$altoNotaActive = $notas.find('article[data-id="' + $notaActive + '"]').height();


		 	$notasPreview.removeClass('active');
		 	$(this).addClass('active');

		 	$notas.find('article').fadeOut();
		 	$notas.css('height',$altoNotaActive);
		 	$notas.find('article[data-id="' + $notaActive + '"]').fadeIn();
		 }


	});


	/* Instancio carousel */
	//$galleryCarousel.removeClass("mask").jcarousel();
	/*
 	 * @public
 	 * Metodo para instanciar scroll personalizados
 	*/
		;(function(){

		 	var $scrollCustom = $(".lista-videos");

		 	if($scrollCustom.length > 0){

		 		//$scrollCustom.removeClass("mask");
		 		var width = 40 ;

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



}());
