/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var submenuSpeedUp = 300,

		submenuSpeedDown = 500,

		submenuOpen = false;

		latitud = {};


	/* Helpers */

	latitud.$document = $(document);

	latitud.$body = $("body");

	latitud.contentPage = $(".contentPage");

	latitud.$linksMenu = $(".header nav > ul > li > a");

	/*
	 * Elimino class no-js
	*/
	$("html").removeClass("no-js");


	/*
     * Detect user agent
    */
    latitud.isMobile = function(){

   		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
   			return true;
		}else{
			return false;
		}

    };

    /*
     * Funcion para carga async de imagenes
    */
    latitud.imglazyload = function(selector){

		selector.each(function(i,e){

			var srcOrig = $(e).attr("data-src");

			$(e).attr("src",srcOrig);

		});

	}

	/*
	 * Si estoy en mobile o tablet uso evento touchstart para mejor perfomance y experiencia
	*/
	latitud.eventClick = (latitud.isMobile() == true) ? "touchstart" : "click";

    /*
     * Menu implementation
    */
    if( latitud.$linksMenu.length > 0){

	    $(".header nav > ul > li > a").on(latitud.eventClick,function(event){

	    	event.preventDefault();
	    	event.stopPropagation();

	    	var that = $(this); 			// link clickeado
	    	var li = that.parent();	 		// LI padre del link clickeado
	    	var submenu = li.find("div");	// Submenu del link clickeado

	    	// Si el link ya esta activo
	    	if( li.hasClass("active") ){

	    		// Borro la class active
	    		li.removeClass("active");

	    		// Oculto el submenu
	    		submenu.stop().slideUp(submenuSpeedUp);

	    		// Subo la pantalla
	    		latitud.contentPage.stop(true,true).animate({
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
    				latitud.$body.append('<div id="dimmer"></div>');

    				$("#dimmer").fadeIn("fast",function(){

    					$(this).one(latitud.eventClick,function(){

    						latitud.contentPage.stop(true,true).animate({
				    			"top":"0"
				    		},submenuSpeedUp);

    						$(".submenu").stop(true,true).slideUp(submenuSpeedUp);

    						$(".header nav > ul > li").removeClass("active");

    						submenuOpen = false;

    						$(this).remove();
    					});

    				});

    				// Bajo la pantalla
    				latitud.contentPage.stop(true,true).animate({
		    			"top":submenu.outerHeight()
		    		},submenuSpeedDown);

	    			submenu.stop(true,true).slideDown(submenuSpeedDown,function(){

	    				submenuOpen = true;

	    				li.addClass("active");

	    			});

	    		}else{

	    			// Oculto los submenu por si hay otro abierto
	    			$(".submenu").stop(true,true).slideUp(submenuSpeedUp);

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

	latitud.imglazyload($("header .img-lazy-load"));

    /*
     * Export object
    */
	window.latitud = latitud;

})(window);