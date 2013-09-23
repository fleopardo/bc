/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){

	var $galleryCarousel = $('#carousel-thumbs'),
		$notasPreview = $('.bloques-tabs article'),
		$notas = $('.notas-content'),
		$altoNotaContentInicial = $notas.find('.active').height();

	$notas.css('height',$altoNotaContentInicial);

	
	$notasPreview.on("click", function(event){

		 event.preventDefault();

		 if( $(this).hasClass('active') ){

		 	return false;

		 }else{

		 	var $notaActive = $(this).data('id'),
		 		$altoNotaActive = $notas.find('article[data-id="' + $notaActive + '"]').height();

		 	console.log($altoNotaActive);

		 	$notasPreview.removeClass('active');
		 	$(this).addClass('active');

		 	$notas.find('article').fadeOut();
		 	$notas.css('height',$altoNotaActive);
		 	$notas.find('article[data-id="' + $notaActive + '"]').fadeIn();
		 }


	});


	/* Instancio carousel */
	$galleryCarousel.removeClass("mask").jcarousel();



}());
