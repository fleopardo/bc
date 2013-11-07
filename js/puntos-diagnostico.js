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

		var that = $(this);
		var filterBy = that.data("id");
		var descriptionToShow = $(".description-info[data-id="+filterBy+"]");


		if(descriptionToShow.is(":visible")) return;

		filtros.removeClass("active");
		that.addClass("active");

		descriptionInfo.stop(true,true).fadeOut(300, function(){});
		descriptionToShow.stop(true,true).delay(200).fadeIn(800);



	});


}());
