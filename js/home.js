/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){

	var home_event = (app.touch) ? 'click' : 'mouseenter';

	$(".cols").on(home_event, function(){

		var that = $(this);

		if(that.hasClass("active")) return;

		/* pongo class active al correspondiente*/
		$(".cols").removeClass("active");
		that.addClass("active");


		/* Oculto el texto de la columna que activo */
		$(".cols:not(.active)").stop().find("article").hide(300);


		/* Achico el tamaño de la columna que deja de estar activa */
		$(".cols").stop(true,true).animate({
			'width': '20%'
		},300,"linear");


		/* Agrando el tamaño de la columna activa */
		that.stop(true,true).animate({
			'width': '39.9%'
		},300, "linear", function(){

			/* Muestro el texto de esta columna */
			that.find("article").stop().fadeIn(300);
		});


		/* Corro la posicion de la imagen para que se centre cuando se achica */
		$(".cols:not(.active)").find("img").animate({
			"right": "-36%"
		},250);

		that.find("img").animate({
			"right": "0%"
		},250);



	});

}());


