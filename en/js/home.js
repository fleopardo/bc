/*
 	 * @public
 	 * Metodo para instanciar scroll personalizados
 	*/
		;(function(){

		 	var $scrollCustom = $(".scrollCustom");

		 	if($scrollCustom.length > 0){

		 		var width = 100 ;
		 		var height = 0;

		 		$scrollCustom.find("article").each(function(){

		 			width = width + $(this).width();

		 			if( $(this).height() > height ){
		 			
		 				height = $(this).outerHeight();
		 			
		 			}

		 		});

		 		$scrollCustom.find("div").css("width",width);
		 		$scrollCustom.find("div").css("height",height);


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