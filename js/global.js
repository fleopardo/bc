/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){


	var ypf = {};

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

	//Funcion login submenu
	$('.breadcrumb-container .login .username').on('click',function(event){
		event.preventDefault();

		if ( $(this).hasClass('active') ) {
			$(this).removeClass('active');
			$('#dimmerSubmenu').remove();
			$(this).siblings('.submenu-breadcrumb').stop(true,true).fadeOut();

		}else{

			$('.breadcrumb-container .login .username').removeClass('active');
			$('.submenu-breadcrumb').stop(true,true).fadeOut();
			$('#dimmerSubmenu').remove();

			$(this).addClass('active');
			$(this).siblings('.submenu-breadcrumb').stop(true,true).fadeIn();
			$('body').append('<div id="dimmerSubmenu"></div>');
		}

		$('#dimmerSubmenu').on('click',function(){
			$('.breadcrumb-container .options li a').removeClass('active');
			$('.submenu-breadcrumb').stop(true,true).fadeOut();
			$('#dimmerSubmenu').remove();
		});
	});

	/*INCIALIZACION DE PLUG IN SELECTMENU*/
	/*if($("select").length > 0){
		$("select").selectmenu({
			transferClasses:true
		});
	}*/

/*BUSCADOR PRINCIPAL */
	var $headerSearch = $('.buscador-principal'),
		$sugerencias = $headerSearch.find('.sugerencias');

	$headerSearch.find('input[type="text"]').on('input', function () {
		$sugerencias.show();
	});

	$headerSearch.find('input[type="text"]').on('blur', function () {
		$sugerencias.hide();
	});
/**/

	$(".openmenu").click(function(e) {
  		e.preventDefault();
		$(".navNuevo").toggleClass("open");
		$(this).toggleClass( "open" );
	});

	$(".openotras").click(function(e) {
  		e.preventDefault();
		$("ul.options-left").toggleClass("open");
		$(this).toggleClass( "open" );
	});

	/* carrousel */
	if( $(".owl-carousel").length > 0 ){
		$('.owl-carousel').owlCarousel({
		    loop:false,
		    margin:0,
		    nav:false,
		    responsiveClass:true,
		    responsive:{
		        0:{
		            items:3,
		            dots:true,
		        },
		        768:{
		            items:7,
		            dots:false
		        },
		        1024:{
		            items:7
		        }
		    }
		});
	}

	//Placeholder fallback
	if($("input[placeholder],textarea[placeholder]").length > 0){

		console.log()
		$('input[placeholder],textarea[placeholder]').placeholder();

	}



	if( ('.expansible-container').length > 0 ){

		// me guardo los heights iniciales
		$('.expansible-container').each(function(){
			$(this).attr('data-css-height',$(this).height());
		});


		//Funcionalidad link contrae y expande info
		$('a.exp-contraer').on('click', function(event){
			event.preventDefault();

			var expandibleCont = $(this).siblings('.expansible-container'),
				expCont100 = $(this).siblings('.expansible-container').find('.content-expandible')


			if( expandibleCont.hasClass('expanded') ){

				expandibleCont.removeClass('expanded');
				$("span",$(this)).html('Cargar más');
				$("span",$(this)).css('background-position', 'right -17px');
				expandibleCont.animate({
					height: expandibleCont.data('css-height')
				});

			}else{
				expandibleCont.animate({
					height: expCont100.height()
				});
				expandibleCont.addClass('expanded');
				$("span", $(this)).html('Cargar menos');
				$("span",$(this)).css('background-position', 'right 4px');
				//$(this).find('span').css('background-position', 'right 4px');
			}

		});

	}


	//Funcion equalHeight
	ypf.equalHeight = function(element){

        var height = 0;

        element.each(function(){

                if ($(this).height() > height){

                        height = $(this).height();

                }

        });

        element.css("height",height);

    }

    window.ypf = ypf;

}());
