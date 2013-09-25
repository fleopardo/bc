/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){


	$.backstretch("./css/assets/fd-notas.jpg");


	var $galleryCarousel = $('#carousel-thumbs'),
		$galleryZoom = $(".galeria .zoom");


	/* Instancio carousel */
	$galleryCarousel.removeClass("mask").jcarousel();


	/* ZOOM de carousel */
	$galleryCarousel.find("li").on("click", function(event){

		event.preventDefault();

		$galleryZoom.find("article").hide();
		$galleryZoom.find("article[data-id='" + $(this).data('id') + "']").show();

	});

	/* Carousel de recomendados */
	$relatedCarousel = $("#carousel-relacionados");
	$relatedCarousel.removeClass("mask").jcarousel();


	app.scrollCustom($(".news .scrollCustom"));

	/* twitter */
	$("div.tweets").twitscroller({user: ''});


}());
