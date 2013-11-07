/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){


	// Slider home
	if($("#sequence").length > 0){
		var options = {
			nextButton: true,
			prevButton: true,
			cycle: true,
			animateStartingFrameIn: true,
			transitionThreshold: 250,
			preloadTheseFrames: [1],
			//pagination: true,
			//showPaginationOnInit:true,
			fallback: {
	            theme: "fade",
	            speed: 500
        	}
		};

		var sequence = $("#sequence").sequence(options).data("sequence");

		sequence.afterLoaded = function(){
			$("#arrows").fadeIn(100);
			$("#arrows li:nth-child("+(sequence.settings.startingFrameID)+") a").addClass("active");
		}

		sequence.beforeNextFrameAnimatesIn = function(){
			$("#arrows li:not(:nth-child("+(sequence.nextFrameID)+")) a").removeClass("active");
			$("#arrows li:nth-child("+(sequence.nextFrameID)+") a").addClass("active");
		}

		$("#arrows li").click(function(){
			if(!sequence.active){
				$(this).children("a").removeClass("active").children("a").addClass("active");
				sequence.nextFrameID = $(this).index()+1;
				sequence.goTo(sequence.nextFrameID);
			}
		});

		$(".sequence-next").on("click", function(){
			sequence.next();
		})

		$(".sequence-prev").on("click", function(){
			sequence.prev();
		})

	}


	/*
 	 * Inicializo y bindeo todo los eventos necesarios para el header
 	*/

 		if( $(".headerYPF").length > 0 ){

			$('.jcarousel-header').removeClass("mask").jcarousel({
				scroll: 1,
				start : 1
			});

			// Bindeo para abrir submenus
			headerYPF.vars.header.find(".hasSubmenu").on("click",function(event){
				event.preventDefault();
				headerYPF.openSubmenu($(this));
			});

			// Bindeo para abrir buscador
			headerYPF.vars.header.find(".buscar > a").on("click", function(event){
				event.preventDefault();
				headerYPF.openSearch();
			});

			// Bindeo para cerrar buscador
			headerYPF.vars.buscador.find(".close").on("click", function(){
				headerYPF.closeSearch();
			});

		}

	/* :Hovers detalle*/
	// $('.box-img-detalle').mouseenter(function(){
	// 	$(this).find('.over-img').stop(true,true).fadeIn();
	// });

	// $('.box-img-detalle').mouseleave(function(){
	// 	$(this).find('.over-img').stop(true,true).fadeOut();
	// });


	/*INCIALIZACION DE PLUG IN SELECTMENU*/
	if($("select").length > 0){
		$('select').selectmenu({
			transferClasses:true
		});
	}

	//Placeholder fallback
	if($("input[placeholder],textarea[placeholder]").length > 0){
		$('input[placeholder],textarea[placeholder]').placeholder();
	}
}());
