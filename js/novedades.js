/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){

	var $galleryCarousel = $('#carousel-thumbs'),
		$notasPreview = $('.bloques-tabs article'),
		$notas = $('.notas-content');


	$notasPreview.on("click", function(event){

		 event.preventDefault();

		 if( $(this).hasClass('active') ){

		 	return false;

		 }else{

		 	var $notaActive = $(this).data('id');

		 	$notasPreview.removeClass('active');
		 	$(this).addClass('active');

		 	$notas.find('article').fadeOut();
		 	$notas.find('article[data-id="' + $notaActive + '"]').fadeIn();
		 }


	});


	/* Instancio carousel */
	$galleryCarousel.removeClass("mask").jcarousel();



}());
