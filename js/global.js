/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var ypf = {},

		$menu = $(".menuPrincipal"),

		$document = $(document),

		$body = $("body"),

		$footer = $("footer"),

		$containerPrincipal = $("#containerPrincipal"),

		$tooltipCompartir = $footer.find(".tooltipCompartir"),

		openMenu = function(){
			$body.css("padding-bottom","255px");
			$menu.addClass("show");
		},

		closeMenu = function(){
			$body.css("padding-bottom","140px");
			$menu.removeClass("show");
		};

	/*
	 * Funciones publicas
	*/
	ypf.equalHeight = function(element){

		var height = 0;

		element.each(function(){

			if ($(this).height() > height){

				height = $(this).height();

			}

		});

		element.css("height",height);

	}

	/*
     * Detect user agent
    */
    ypf.isMobile = (function(){

   		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
   			return true;
		}else{
			return false;
		}

    })();


	/*
	 * Elimino class no-js
	*/
	$("html").removeClass("no-js");


	/*
	 * Expandir y contraer el menu
	*/
	(function(){

		//Cerrar en el onload
		/*if( $containerPrincipal.hasClass("home") ){

			setTimeout(function(){

				closeMenu();

			},3000);

		}else{

			closeMenu();

		}*/
		if( !$containerPrincipal.hasClass("home") ){

			closeMenu();

		}

		//Abrir y cerrar clickeando en el icono
		$menu.find(".open").bind("click",function(){

			if( $menu.hasClass("show") ){

				closeMenu();

			}else{

				openMenu();

			}

		});

		//Abrir el menu clikeando los titulos que tienen submenu
		$menu.find(".fundacion > h3").bind("click",openMenu);
		$menu.find(".educacion > h3").bind("click",openMenu);
		$menu.find(".comunidad > h3").bind("click",openMenu);

	})();

	/*
	 * Abrir el popup de compartir
	*/
	(function(){

		$footer.find(".compartir").bind("click",function(event){

			event.stopPropagation();
			event.preventDefault();

			if( $(this).hasClass("active") ){

				$(this).removeClass("active");
				$tooltipCompartir.fadeOut();

			}else{

				$(this).addClass("active");
				$tooltipCompartir.fadeIn();

				/*
				 * Bindeo click al document para que cierre el tooltip
				*/
				$document.one("click",function(){
					$footer.find(".compartir").removeClass("active");
					$tooltipCompartir.fadeOut();
				});

			}

		});

		/*
		 * Bindeo click al layer para que no propague hasta el document y se cierre..
		*/
		$tooltipCompartir.on("click",function(event) {

			event.stopPropagation();

	    });

	})();

	/*
	 * inicializacion de plugins
	*/
	(function(){

		//Selectmenu plugin
		if( $containerPrincipal.hasClass("contacto") ){
			$('select').selectmenu({
				transferClasses:true
			});
		}

		//Placeholder fallback
		$('input[placeholder]').placeholder();

   })();

	/*
	 * Nav para mobile - Arregla compatibilidad con position:fixed;
	*/
	/*
	if(!ypf.isMobile){

		var $windowHeight = $(window).height(),
			$menuHeight = $menu.height(),
			$footerHeight = $footer.height();

		var position = ($windowHeight - ($menuHeight + $footerHeight)) / 2;

		$menu.css({
			"position": "absolute",
			"top": position,
			"bottom": 0
		});

	};
	*/

   /*
    * Expongo namespace
   */

   window.ypf = ypf;

})(window);