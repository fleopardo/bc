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
     * Menu implementation
    */
    $(".header nav > ul li a").on("click",function(event){

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

    		// Seteo la variable en false porque no queda ninguno abierto
    		submenuOpen = false;

    	}else{

	    	// Remuevo los active por si hay alguno activo
	    	li.siblings().removeClass("active");

	    	// Si no hay submenu abierto lo abro instantaneamente..
	    	if( submenuOpen == false){

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

	latitud.imglazyload($("header .img-lazy-load"));

    /*
     * Export object
    */
	window.latitud = latitud;

})(window);