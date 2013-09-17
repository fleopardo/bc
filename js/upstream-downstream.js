/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){


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

}());
