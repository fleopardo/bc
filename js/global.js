/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var $document = $(document),

		$body = $("body");

	/*
     * Detect user agent
    */
    function isMobile(){

   		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
   			return true;
		}else{
			return false;
		}

    };

	/*
	 * Elimino class no-js
	*/
	$("html").removeClass("no-js");

	/* Slider de la home */
	$('#maximage').maximage({
		cycleOptions: {
			fx: 'fade',
			speed: 1000,
			timeout: 0,
			prev: '#arrow_left',
			next: '#arrow_right',
			pause: 1,
			pager: '#cycle-nav ul',
            pagerAnchorBuilder: function(idx, slide) {
                return '<li><a href="#"></a></li>';
            }
		},

		onFirstImageLoaded: function(){
			$('#maximage').fadeIn('fast');
		}
	});

	/* Esto es para dispositivos touch */
	$('#maximage').touchwipe({
		wipeLeft: function() {
		    $('#maximage').cycle("next");
		},
		wipeRight: function() {
		    $('#maximage').cycle("prev");
		}
	});

	// To show it is dynamic html text
	$('.info-slider').delay(200).fadeIn();



})(window);