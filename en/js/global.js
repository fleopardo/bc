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

	//Funcion de breadcrumb newsletter y multimedia
	// $('.breadcrumb-container .options li a').on('click',function(event){
	// 	event.preventDefault();

	// 	if ( $(this).hasClass('active') ) {
	// 		$(this).removeClass('active');
	// 		$('#dimmerSubmenu').remove();
	// 		$(this).siblings('.submenu-breadcrumb').stop(true,true).fadeOut();

	// 	}else{

	// 		$('.breadcrumb-container .options li a').removeClass('active');
	// 		$('.submenu-breadcrumb').stop(true,true).fadeOut();
	// 		$('#dimmerSubmenu').remove();

	// 		$(this).addClass('active');
	// 		$(this).siblings('.submenu-breadcrumb').stop(true,true).fadeIn();
	// 		$('body').append('<div id="dimmerSubmenu"></div>');
	// 	}

	// 	$('#dimmerSubmenu').on('click',function(){
	// 		$('.breadcrumb-container .options li a').removeClass('active');
	// 		$('.submenu-breadcrumb').stop(true,true).fadeOut();
	// 		$('#dimmerSubmenu').remove();
	// 	});




	// });

	/*INCIALIZACION DE PLUG IN SELECTMENU*/
	if($("select").length > 0){
		$('select').selectmenu({
			transferClasses:true
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
				$("span",$(this)).html('Load less');
				$("span",$(this)).css('background-position', 'right -17px');
				expandibleCont.animate({
					height: expandibleCont.data('css-height')
				});

			}else{
				expandibleCont.animate({
					height: expCont100.height()
				});
				expandibleCont.addClass('expanded');
				$("span", $(this)).html('Load less');
				$("span",$(this)).css('background-position', 'right 4px');
				//$(this).find('span').css('background-position', 'right 4px');
			}

		});

	}


	// menu lateral colapsible

	var aside = $('aside.left'),
	linksExpandables;

	if (aside) {
		// listado de links que pueden ser expandibles
		linksExpandables = $('aside.left > ul > li > a');

		// Los recorro para ver cual tiene submenu y le agrego clases
		$.each(linksExpandables, function (i,e) {
			var $link = $(e),
				$submenu = $link.next();

			if ($submenu.length > 0) {
				$link.addClass('expandable');

				// Si el link activo esta en un submenu lo muestro abierto
				if ($submenu.find('.active').length > 0) {
					$link.addClass('opened');
					$submenu.slideToggle();
				}else{
					$link.addClass('closed');
				}

			}
		});

		aside.on('click', '.expandable', function (event) {
			var $trigger = $(event.target),
				$submenu = $trigger.next();

			// si esta abierto, se cierra..
			if ($submenu.is(":visible")) {
				$trigger.addClass('closed');
				$trigger.removeClass('opened');
			}else{
				$trigger.removeClass('closed');
				$trigger.addClass('opened');
			}
			$submenu.slideToggle();
			event.preventDefault();
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
