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

		galleryItemsWidth = galleryContainer.width(),

		sliderContainer = $("#wrapperSlider"),

		sliderBar = sliderContainer.find("#slider"),

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

		window.resize = function(){

			setTimeout(function(){

				//Actualizo el ancho de los items
				galleryItemsSetWidth();

				//Actualizo el valor del ancho del contenedor
				gallerySetWidth();

				//Actualizo el valor del ancho de los items
				galleryItemsWidth = refreshGalleryItemsWidth();

			},100);

		}

	})();


	/*
     * Inicializacion del slider de jquery ui para manejar la galeria
    */
	(function(){

		sliderBar.slider({
	        min: 0,
	        max: galleryItems.length - 1,
	        value: 0,
	        slide: function (event, ui) {

				galleryItemsWidth = galleryItems.width();

				galleryItemsContainer.animate({

					'left': - (galleryItemsWidth * ui.value)

				});

	        }
	    });

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