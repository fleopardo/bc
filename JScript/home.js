(function($) {
	//Funcion para alinear verticalmente
		$.fn.vAlign6 = function() {
		return this.each(function(i) {
			var ah = $(this).height();
			// var ph = $(window).height();
			window.ph = ph = $(window).height();
			var mh = (ph - ah) / 2;

			if (mh > 265) {
				$(this).css('padding-top', mh);
			} else {
				$(this).css('padding-top', 265);
			}

		});
	};

	$.fn.vAlign5 = function() {
		var navHeight = $(this).height();
		var destHeight = $("section.content").outerHeight();
		var winHeight = $(window).height();
		var result = (winHeight - destHeight - navHeight);

		$(this).css('padding-top', result);
	};

})(jQuery);


$(document).ready(function(){

	responsive();

	/* Alineacion vertical del texto del slider */
	$('.destacado').vAlign6();
	$('.pxs_navigation').vAlign5();

	/* Funcion para expandir cajas destacados */

	$('.destacados-container').delegate("li","mouseover",function(){		
		$(this).find('.background-mask').stop(true,true).fadeIn();
		//$(this).find('span.more').css('background-position','-272px -48px');
		$(this).find('.caja-cont').stop(true,true).animate({"margin-top":"33px"});
	});

	$('.destacados-container').delegate("li","mouseout",function(){
		$(this).find('.background-mask').stop(true,true).fadeOut();
		//$(this).find('span.more').css('background-position','-272px -75px');
		$(this).find('.caja-cont').stop(true,true).animate({"margin-top":"130px"});
	});

	//Inicializacion del slider
	$('#slider1').anythingSlider({
	    startStopped: true, // If autoPlay is on, this can force it to start stopped
	    width: 350, //980
	    height: 168, //470 480 Override the default CSS width
	    autoPlayLocked: false, // If true, user changing slides will not stop the slideshow
	    resumeDelay: 1000, // Resume slideshow after user interaction, only if autoplayLocked is true (in milliseconds).  
	    delay: 1000,
	    easing: "bounce",
	    animationTime: 500
	});

	//Inicializacion fullscreen para las imagenes del slider
	FullScreenBackground('.slide');

	/* Eventos onresize */
	$(window).resize(function() {

		FullScreenBackground('.slide');
		$('.destacado').vAlign6();
		$('.pxs_navigation').vAlign5();

		responsive();
	});
});