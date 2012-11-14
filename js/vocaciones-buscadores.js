/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	/*
	 * Cambiar de Carreras
	*/
	$(".left-col li a").bind("click",function(e){

		e.preventDefault();

		if( $(this).hasClass('active') ){

			return false;

		}else{

			$(".left-col li a").removeClass('active');

			$(this).addClass("active");

			var section = $(this).attr("href");

			$(".description").hide();

			$(section).show();

		}

	});

	/*
	 * Filtrar por universidades
	*/
	$(".filtros a").bind("click",function(e){

		e.preventDefault();
		console.log();

		$(".filtros a").removeClass("active");

		var section = $(this).attr("class");
		$(this).parent().siblings("ul").hide();
		$(this).parent().siblings("ul."+section).show();

		$(this).addClass("active");
	});

})(window);