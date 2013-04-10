/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var $contenedorSlider = $('#maximage'),
		sliderAutoplay = true,
		sliderAutoPlaySpeed = 6000;

	/* inicializacion de lazy load para las fotos del slider */
	latitud.imglazyload($("#maximage .img-lazy-load"));

	/* Slider */
	$contenedorSlider.maximage({
		cycleOptions: {
			fx: 'fade',
			speed: 1000,
			timeout: 0,
			prev: '#arrow_left',
			next: '#arrow_right',
			pause: 0,
			pager: '.cycle-nav ul',
            pagerAnchorBuilder: function(idx, slide) {
                return '<li><a href="#"></a></li>';
            }
		},

		onFirstImageLoaded: function(){

			if(!latitud.touch){
				$(".arrows").fadeIn('fast');
			}

			$contenedorSlider.fadeIn('fast');
			// To show it is dynamic html text
			$('.info-slider').delay(200).fadeIn();
		}

	});

	/* Esto es para dispositivos touch */
	$contenedorSlider.touchwipe({
		wipeLeft: function() {
		    $contenedorSlider.cycle("next");
		},
		wipeRight: function() {
		    $contenedorSlider.cycle("prev");
		},

		preventDefaultEvents: false
	});

	/** Autoplay personalizado del slider (puede activarse desde el plugin, pero queremos entender si el menu esta expandido o no, y eso se maneja desde otro JS) */
	if( sliderAutoplay ){

		setInterval(function(){
			if( !$(".submenu").is(":visible") ){
				$contenedorSlider.cycle("next");
			}

		},sliderAutoPlaySpeed);

	}



})(window);