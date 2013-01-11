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

		$(".filtros a").removeClass("active");

		var section = $(this).attr("class");
		$(this).parent().siblings("ul").hide();
		$(this).parent().siblings("ul."+section).show();

		$(this).addClass("active");
	});

	/*
	 * Target _blank valido para html5
	*/
	$(".description .universidades-interior a").attr("target","_blank");
	$(".description .universidades-bsas a").attr("target","_blank");


})(window);