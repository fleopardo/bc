/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){

	// var filtros = $(".img-cont a.pto-diagnostico"),
	// 	descriptionInfo = $(".description-info");

	// filtros.on("click",function(event){

	// 	event.preventDefault();

	// 	var that = $(this),
	// 		filterBy = that.data("id"),
	// 		descriptionToShow = $(".description-info[data-id="+filterBy+"]"),
	// 		filtroId = that.attr("id");
	// 		//console.log(filtroId);

	// 	if(that.hasClass('active')) {
	// 		return;

	// 	}else{
	// 		filtros.removeClass('active');
	// 		that.addClass('active');
	// 		descriptionInfo.find('ul').find('li').removeClass('active');
	// 		descriptionInfo.find('ul').find("#"+filtroId).addClass('active');
	// 	}

	// 	if(descriptionToShow.is(":visible")) return;

	// 	//filtros.removeClass("active");
	// 	//that.addClass("active");

	// 	descriptionInfo.stop(true,true).fadeOut(300, function(){});
	// 	descriptionToShow.stop(true,true).delay(200).fadeIn(800);




	//});

	var filtros = $("ul.lista-principal > li > a"),
		detalle = $("ul.lista-principal > li > ul > li > a"),
		imgCont = $('.img-cont'),
		items = $("ul.lista-principal > li > ul"),
		detalleID,
		imageToShow;




	filtros.click(function(event){
		event.preventDefault();


		if( $(this).hasClass('active') || imgCont.hasClass('ver-completo') ){
			return;
		}else{
			filtros.removeClass('active');
			items.stop(true,true).fadeOut();

			$(this).siblings('ul').stop(true,true).fadeIn();
			$(this).addClass('active');

		}
	});

	detalle.click(function(event){
		event.preventDefault();

		if( $(this).hasClass('active')  || imgCont.hasClass('ver-completo') ){
			return;
		}else{
			detalleID = $(this).attr('id');

			detalle.removeClass('active');
			$(this).addClass('active');

			imgCont.find('img.active').stop(true,true).fadeOut(function(){
				imgCont.find('img.active').removeClass('active');
				imgCont.find('img#' + detalleID).stop(true,true).fadeIn();
				imgCont.find('img#' + detalleID).addClass('active');
			});

		}

	});

	$('#ver-todos').click(function(event){
		event.preventDefault();
		if ( $(this).hasClass('active') ) {
			return;
		}else{
			$(this).addClass('active');
			imgCont.addClass('ver-completo');
			$('#ver-unico').removeClass('active');
			imgCont.find('img.active').stop(true,true).fadeOut();
			imgCont.find('img.active').removeClass('active');
			imgCont.find('img#vehiculo-completo').stop(true,true).fadeIn();
			imgCont.find('img#vehiculo-completo').addClass('active');
			items.fadeIn();
		}

	});

	$('#ver-unico').click(function(event){
		event.preventDefault();
		if ( $(this).hasClass('active') ) {
			return;
		}else{
			$(this).addClass('active');
			imgCont.removeClass('ver-completo');
			$("ul.lista-principal > li > a").removeClass('active');
			$('#ver-todos').removeClass('active');
			imgCont.find('img.active').stop(true,true).fadeOut();
			imgCont.find('img.active').removeClass('active');
			imgCont.find('img#default').stop(true,true).fadeIn();
			imgCont.find('img#default').addClass('active');
			items.fadeOut();
		}

	});


}());
