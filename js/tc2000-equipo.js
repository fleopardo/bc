/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){


	$.backstretch("./css/assets/fd-notas.jpg");



	/* Carousel de recomendados */
	$relatedCarousel = $("#carousel-equipo");
	$relatedCarousel.removeClass("mask").jcarousel();

	$relatedCarousel.find('li.jcarousel-item').each(function(){
		$(this).mouseenter(function(){
			$(this).addClass('active');
		});

		$(this).mouseleave(function(){
			$(this).removeClass('active');
		});
		
	});

}());
