/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var filtros = $(".filter-container a");
	var vinosContainer = $(".vinos-container");

	filtros.on("click",function(event){

		event.preventDefault();

		var that = $(this);
		var filterBy = that.data("id");
		var vinosContainerToShow = $(".vinos-container[data-id="+filterBy+"]");


		if(vinosContainerToShow.is(":visible")) return;

		filtros.removeClass("active");
		that.addClass("active");

		vinosContainer.stop(true,true).fadeOut(500);
		vinosContainerToShow.stop(true,true).fadeIn(800);


	})

})(window);