/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	/*
	 * Variables
	*/
	var	galleryContainer = $(".slider-principal"),

		galleryItemsContainer = galleryContainer.find("ul"),

		galleryItems = galleryContainer.find("li"),

		galleryItemsCant = galleryItems.length - 1;

		galleryItemsWidth = galleryContainer.width(),

		sliderContainer = $("#wrapperSlider"),

		sliderBar = sliderContainer.find("#slider"),

		autoplay = true,

		sliderSpeed = 4500;

		/*
		 * Seteo el ancho a los items
		*/
		galleryItemsSetWidth = function(){

			var width = galleryItemsContainer.width();

			galleryItems.each(function(){

				$(this).css("width",width);

			});

		},

		/*
		 * Seteo el ancho del contenedor del slider
		*/
		gallerySetWidth = function(){

			var width = galleryItems.length * galleryItemsWidth;

			galleryItemsContainer.css("width",width);

		},

		refreshGalleryItemsWidth = function(){

			return galleryItems.width();
		};

	/*
     * Seteo el ancho del contenedor de la galeria
    */
    (function(){

    	galleryItemsSetWidth();

		gallerySetWidth();

		/*window.resize = function(){

			setTimeout(function(){

				//Actualizo el ancho de los items
				galleryItemsSetWidth();

				//Actualizo el valor del ancho del contenedor
				gallerySetWidth();

				//Actualizo el valor del ancho de los items
				galleryItemsWidth = refreshGalleryItemsWidth();

			},100);

		}*/

	})();


	/*
     * Inicializacion del slider de jquery ui para manejar la galeria
    */
	(function(){

		function animateSlider(ui){
			galleryItemsWidth = galleryItems.width();
			galleryItemsContainer.animate({
				'left': - (galleryItemsWidth * ui)
			});
		}


		sliderBar.slider({
	        min: 0,
	        max: galleryItemsCant,
	        value: 0,
	        slide: function (event, ui) {
				animateSlider(ui.value);
	        }
	    });

		//Si estoy sobre la galeria no permito el autoplay
		galleryContainer.bind({
			"mouseover": function(){
				autoplay = false;
			},

			"mouseout": function(){
				autoplay = true;
			},
		});

		//Ejecuto autoslide
		setInterval(function(){

			//Si estoy con foco en el slider no hago nada.
			if(autoplay == false) return;

			//capturo la posicion actual del slider
			var nextItem = sliderBar.slider("value");

			//Si es la ultima posicion vuelvo a la primera, sino avanzo una
			nextItem = (nextItem == galleryItemsCant) ? 0 : nextItem + 1;

			//Muevo la posicion del slider
			sliderBar.slider("option","value",nextItem);

			//Animo
			animateSlider(nextItem);

		},sliderSpeed)

	})();


    /*
     * Evita la seleccion del area del slider para poder hacer drag del mismo
    */
    (function(){

    	var slider = document.getElementById("wrapperSlider");

	    if( slider != null ){

			slider.onselectstart = function(){return false;}

			slider.onmousedown = function(){return false;}

		}

	})();


	/*
     * Oculto el slider y seteo los eventos para mostrarlo on hover de la galeria
    */
    (function(){

    	sliderContainer.delay(1000).fadeOut();

	    galleryContainer.bind({

	    	"mouseover": function(){

	    		sliderContainer.fadeIn("fast");

	    	},

	    	"mouseleave": function(){

	    		sliderContainer.fadeOut("slow");

	    	}

	    });

	})();


	/*
	 * Mostrar y ocultar "Leer mas" en los modulos de la home
	*/
	(function(){

		$(".modulos .containerImg > div").delay(1000).fadeOut()
		$(".modulos .containerImg > div p").delay(1000).slideUp();

		$(".modulos > article").bind({

			"mouseenter": function(){

				$(this).find(".containerImg > div").stop().fadeIn(200,function(){

					$(this).find("p").stop().slideDown();

				});
			},

			"mouseleave": function(){

				$(this).find(".containerImg > div p").stop().slideUp();
				$(this).find(".containerImg > div").stop().fadeOut(300);

			}

		})

	})();

})(window);