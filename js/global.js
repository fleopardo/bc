/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var submenuSpeedUp = 300,

		submenuSpeedDown = 500,

		submenuOpen = false,

		$linksMenu = $(".header nav > ul > li > a"),

		$submenu = $(".submenu");

		$contentPage = $(".contentPage");


	minHeight();

	/*
	 * Inicializacion del lazy load en imagenes del header
	*/

	latitud.imglazyload($("header .img-lazy-load"));


 	/*
     * Menu implementation
    */

    if( $linksMenu.length > 0){

	    $linksMenu.on(latitud.event.TAP,function(event){

	    	event.preventDefault();
	    	event.stopPropagation();

	    	var that = $(this),				// link clickeado

	    		li = that.parent(),	 		// LI padre del link clickeado

	    		submenu = li.find("div");	// Submenu del link clickeado


	    	// Si el link ya esta activo
	    	if( li.hasClass("active") ){

	    		// Borro la class active
	    		li.removeClass("active");

	    		// Oculto el submenu
	    		submenu.stop().slideUp(submenuSpeedUp);

	    		// Subo la pantalla
	    		$contentPage.stop(true,true).animate({

	    			"top":"0"

	    		},submenuSpeedUp);

	    		// Seteo la variable en false porque no queda ninguno abierto
	    		submenuOpen = false;

	    		// Saco el dimmer
	    		$("#dimmer").remove();

	    	}else{

		    	// Remuevo los active por si hay alguno activo
		    	li.siblings().removeClass("active");

		    	// Si no hay submenu abierto lo abro instantaneamente..
		    	if( submenuOpen == false){

		    		// Pongo el dimmer
    				latitud.body.append('<div id="dimmer"></div>');

    				$("#dimmer").fadeIn("fast",function(){

    					$(this).one(latitud.event.TAP,function(){

    						$contentPage.stop(true,true).animate({

				    			"top":"0"

				    		},submenuSpeedUp);

    						$submenu.stop(true,true).slideUp(submenuSpeedUp);

    						$(".header nav > ul > li").removeClass("active");

    						submenuOpen = false;

    						$(this).remove();
    					});

    				});

    				// Bajo la pantalla
    				$contentPage.stop(true,true).animate({

		    			"top":submenu.outerHeight()

		    		},submenuSpeedDown);

	    			submenu.stop(true,true).slideDown(submenuSpeedDown,function(){

	    				submenuOpen = true;

	    				li.addClass("active");

	    			});

	    		}else{

	    			// Oculto los submenu por si hay otro abierto
	    			$submenu.stop(true,true).slideUp(submenuSpeedUp);

	    			// Lo abro con delay para que el submenu que este abierto llegue a retraerse y luego se abra el proximo..(Debido a que el callback no funciona como espero)
	    			setTimeout(function(){

		    			li.addClass("active");

		    			submenu.stop(true,true).slideDown(submenuSpeedDown,function(){

		    				submenuOpen = true;

		    			});

		    		},submenuSpeedUp);

		    	}

		    }

		});

	}

	$(window).resize(function(){
		minHeight();
	});

	function minHeight(){

		if( $('body > div').not('.homepage, .prehome') ){

			var altoWindow = $(window).height();
			var altoContenedor = $('.contentPage.principal').height();
			var altoHeader = $('header').height();
			var altoFooter = $('footer').height();
			var minHeightContainer = altoWindow - altoHeader - altoFooter;

			if( altoContenedor < minHeightContainer){
				$('.contentPage.principal').css('height',minHeightContainer);
			}
		}

	}

	(function(d, s, id) {
	  var js, fjs = d.getElementsByTagName(s)[0];
	  if (d.getElementById(id)) return;
	  js = d.createElement(s); js.id = id;
	  js.src = "//connect.facebook.net/es_ES/all.js#xfbml=1";
	  fjs.parentNode.insertBefore(js, fjs);
	}(document, 'script', 'facebook-jssdk'));

})(window);