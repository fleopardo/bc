/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){


	$.backstretch("./css/assets/fd-tc2000-equipo.jpg");



	/* Carousel de recomendados */
	$relatedCarousel = $("#carousel-equipo");
	$relatedCarousel.removeClass("mask").jcarousel();
	/*
	$relatedCarousel.find('li.jcarousel-item').each(function(){

		$(this).on("mouseover", function(){
			$(this).addClass('active');
		});

		$(this).on("mouseout",function(){
			$(this).removeClass('active');
		});

	});
	*/
}());
