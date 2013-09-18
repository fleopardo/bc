/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){


	var $slides = $('#slides');

	Hammer($slides[0]).on("swipeleft", function(e) {
		$slides.data('superslides').animate('next');
	});

	Hammer($slides[0]).on("swiperight", function(e) {
		$slides.data('superslides').animate('prev');
	});

	$slides.superslides({
		hashchange: true
	});


	$("#slides .container h3").css("paddingLeft", $(".layout").offset().left+"px");
	$("#slides .container > div").css("paddingLeft", $(".layout").offset().left+"px");

	$(window).on("resize", function(){

		$("#slides .container h3").css("paddingLeft", $(".layout").offset().left+"px");
		$("#slides .container > div").css("paddingLeft", $(".layout").offset().left+"px");

	});



}());
