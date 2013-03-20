;(function(window){

	$('.listado-container .left-col').each(function(){

			var altoLeft = $(this).height();

			$(this).next().css('height',altoLeft);

	});

})(window);