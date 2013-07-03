/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var filtros = $(".filter-container a");
	var vinosContainer = $(".vinos-container");
	var procesoTinto = $(".vinos-tintos-container li");
	var procesoBlanco = $(".vinos-blancos-container li");

	filtros.on("click",function(event){

		event.preventDefault();

		var that = $(this);
		var filterBy = that.data("id");
		var vinosContainerToShow = $(".vinos-container[data-id="+filterBy+"]");


		if(vinosContainerToShow.is(":visible")) return;

		filtros.removeClass("active");
		that.addClass("active");

		vinosContainer.stop(true,true).fadeOut(300, function(){});
		vinosContainerToShow.stop(true,true).delay(200).fadeIn(800);


	});

	procesoBlanco.each(function(){
		$(this).click(function(e){
			e.preventDefault();
			if($(this).hasClass('active')) return;
			procesoBlanco.removeClass('active');
			$(this).addClass('active');
		});
	});

	procesoTinto.each(function(){
		$(this).click(function(e){
			e.preventDefault();
			if($(this).hasClass('active')) return;
			procesoTinto.removeClass('active');
			$(this).addClass('active');
		});
	});

})(window);