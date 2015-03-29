;(function(){

	// share en barra horizontal
	$('.compartir a').click(function(){
		$('.content-nav ul.global-share').fadeToggle(150);
	});

	// share en opciones del contenido
	$('.det-options li.share a').click(function(event){
		event.preventDefault();
		$('section.content .content-center .options-content ul.global-share').fadeToggle(150);
	});

})();	