/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var filtros = $(".filter-container a");
	var recetas = $(".description");

	filtros.on("click",function(event){

		event.preventDefault();

		var that = $(this);
		var filterBy = that.data("id");
		var recetaToShow = $(".description[data-id="+filterBy+"]");

		if(recetaToShow.is(":visible")) return;

		filtros.parent().removeClass("active");
		that.parent().addClass("active");

		recetas.stop(true,true).fadeOut(500);
		recetaToShow.stop(true,true).fadeIn(800);


	})

})(window);