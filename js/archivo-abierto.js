/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	$(window).load(function() {
	$('body').nivoZoom({
		speed:500,
		zoomHoverOpacity:0.8,
		overlay:false,
		overlayColor:'#333',
		overlayOpacity:0.5,
		captionOpacity:0.8
	});
});


})(window);