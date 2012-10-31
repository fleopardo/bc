/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var $menu = $(".menuPrincipal"),

		$body = $("body"),

		$containerPrincipal = $("#containerPrincipal"),

		openMenu = function(){
			$body.css("padding-bottom","255px");
			$menu.addClass("show");
		},

		closeMenu = function(){
			$body.css("padding-bottom","140px");
			$menu.removeClass("show");
		};

	/*
	 * Elimino class no-js
	*/
	$("html").removeClass("no-js");


	/*
	 * Expandir y contraer el menu
	*/
	(function(){

		//Cerrar en el onload
		if( $containerPrincipal.hasClass("home") ){

			setTimeout(function(){

				closeMenu();

			},3000);

		}else{

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
	 * inicializacion de plugings y placeholder
	*/

	(function(){

		 /*PLACEHOLDER CHROME*/

	    $('input, textarea').on('focus',function(){
	        if ( $(this).attr('placeholder') ) {
	            $(this).data('placeholder', $(this).attr('placeholder'))
	            .removeAttr('placeholder');
	        }
	    }).on('blur', function(){
	        if ( $(this).data('placeholder') ) {
	            $(this).attr('placeholder', $(this).data('placeholder'))
	            .removeData('placeholder');
	        }
	    });

	   	/* FIN PLACEHOLDER CHROME */


	   	
	   	//Inicializar selectmenu plugin
		if( $containerPrincipal.hasClass("contacto") ){
			$('select').selectmenu({
				transferClasses:true
			});
		}

   })();


})(window);