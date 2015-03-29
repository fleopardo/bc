;(function(){

	// sugerencias buscador

	$('#input-explorar').keypress(function(){
		$('.content-nav ul.sugerencias').fadeIn(200);
	});

	$('#input-explorar').blur(function(){
		$('.content-nav ul.sugerencias').fadeOut(200);
	});

})();
