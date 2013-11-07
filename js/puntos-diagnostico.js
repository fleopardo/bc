/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){

	var filtros = $(".img-cont a.pto-diagnostico"),
		descriptionInfo = $(".description-info");
	
	filtros.on("click",function(event){

		event.preventDefault();

		var that = $(this),
			filterBy = that.data("id"),
			descriptionToShow = $(".description-info[data-id="+filterBy+"]"),
			filtroId = that.attr("id");
			console.log(filtroId);
		if(descriptionToShow.is(":visible")) return;

		filtros.removeClass("active");
		that.addClass("active");

		descriptionInfo.stop(true,true).fadeOut(300, function(){});
		descriptionToShow.stop(true,true).delay(200).fadeIn(800);
		
		if(descriptionInfo.find('ul').find('li').hasClass('active')) return;
		descriptionInfo.find('ul').find("#"+filtroId).removeClass('active');
		descriptionInfo.find('ul').find("#"+filtroId).addClass('active');


	});


}());
