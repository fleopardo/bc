/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	latitud.imglazyload($("#maximage .img-lazy-load"));

	/* Slider */
	$('#maximage').maximage({
		cycleOptions: {
			fx: 'fade',
			speed: 1000,
			timeout: 0,
			prev: '#arrow_left',
			next: '#arrow_right',
			pause: 1,
			pager: '.cycle-nav ul',
            pagerAnchorBuilder: function(idx, slide) {
                return '<li><a href="#"></a></li>';
            }
		},

		onFirstImageLoaded: function(){

			if(!latitud.isMobile()){
				$(".arrows").fadeIn('fast');
			}

			$('#maximage').fadeIn('fast');
			// To show it is dynamic html text
			$('.info-slider').delay(200).fadeIn();
		}

	});

	/* Esto es para dispositivos touch */
	$('#maximage').touchwipe({
		wipeLeft: function() {
		    $('#maximage').cycle("next");
		},
		wipeRight: function() {
		    $('#maximage').cycle("prev");
		},

		preventDefaultEvents: false
	});




})(window);