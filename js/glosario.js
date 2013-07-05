/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var filtros = $("ol.letras a");
	var items = $("ol.items");
	var itemsDetalle = $("ol.items li");

	filtros.on("click",function(event){


		$('span.indicador').text($(this).text());

		event.preventDefault();

		var that = $(this);
		var filterBy = that.data("id");
		var itemToShow = $(".items[data-id="+filterBy+"]");

		if(itemToShow.is(":visible")) return;

		filtros.parent().removeClass("active");
		that.parent().addClass("active");

		items.hide();
		itemToShow.stop(true,true).fadeIn(800, function(){

		});
		itemToShow.find("li:first").click();

	});

	itemsDetalle.each(function(){
		$(this).click(function(e){
			e.preventDefault();
			if($(this).hasClass('active')) return;
			itemsDetalle.removeClass('active');
			$(this).addClass('active');
		});
	});


})(window);