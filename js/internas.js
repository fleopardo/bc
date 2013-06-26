/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/

;(function(){

	/*
	 * Instancio carouseles para todas las internas. (Necesita class="jcarousel-slider-interna")
	*/
		shale.sliderInternas = function(){

			var $slider = $(".jcarousel-slider-interna:not(.init)");

			if($slider.length > 0){

				$slider.removeClass("mask").jcarousel({
					scroll: 1,
					start : 1
				}).addClass("init");

			}

			if(!shale.isiPad){
				$(".jcarousel-slider-interna").find(".jcarousel-prev-horizontal").addClass("off");
				$(".jcarousel-slider-interna").find(".jcarousel-next-horizontal").addClass("off");
			}
		}

		/* Ocultar del slide para que no molesten y tapen los graficos */
		if(!shale.isiPad){

			$(".jcarousel-slider-interna").live("mouseenter", function(){
				$(this).find(".jcarousel-prev-horizontal").removeClass("off");
				$(this).find(".jcarousel-next-horizontal").removeClass("off");
			});

			$(".jcarousel-slider-interna").live("mouseleave", function(){
				$(this).find(".jcarousel-prev-horizontal").addClass("off");
				$(this).find(".jcarousel-next-horizontal").addClass("off");
			});
		}

	/*
	 * Funcionamiento graficos de Recursos convencionales
	*/

		shale.graficosRecursosConvencionales = function(){

			var $graficos = $(".recursos-convencionales .graficos:not(.init)");

			if($graficos.length > 0){

				$graficos.find("li > img").on(shale.event.TAP, function(){

					$(".recursos-convencionales .graficos").find("li").removeClass("active");

					$(this).parent().addClass("active");

				});

			}

		}

	/*
	 * Funcionamiento submenu Desafio energetico
	*/

		/*shale.submenuGraficosRecursosNoConvencionales = function(){

			var $menu = $(".recursos-no-convencionales .menu:not(.init)");

			if($menu.length > 0){

				// Impide la seleccion de texto, soluciona bug que se selecciona solo el texto cuando clickeas
				var menu = document.getElementById("menu");
				if( menu != null ){
					menu.onselectstart = function(){return false;}
					menu.onmousedown = function(){return false;}
				}

				// Marco que fue inicializado
				$menu.addClass("init");

				// Muestro opciones
				$menu.find("dt").on(shale.event.TAP,function(event){

					event.preventDefault();
					event.stopPropagation();
					$menu.find("dd").toggle();

				});

				// cambio graficos
				$menu.find("dd").on(shale.event.TAP,function(event){

					event.preventDefault();
					event.stopPropagation();

					var id = $(this).data("id");

					$menu.find("dd").removeClass("active");
					$(this).addClass("active");

					$(".recursos-no-convencionales .imgs img").removeClass("active");
					$(".recursos-no-convencionales .imgs img[data-id="+id+"]").addClass("active");

					$menu.find("dd").hide();
				});

				$(".recursos-no-convencionales").on(shale.event.TAP,function(){
					$menu.find("dd").hide();
				});

			}

		}*/


	shale.showHideMap = function(){
		if( $(".icon-menu").hasClass("active") ){
			$(".icon-menu").removeClass("active");
		}else{
			$(".icon-menu").addClass("active");
		}

		$(".menu").animate({width: 'toggle'});
	}

	/*
	 * Cadena de energia: Detectar hash e ir a la primer posicion
	*/
		if(document.location.search == "?map=off"){
			shale.showHideMap();
		}

	/*
	 * Cadena de energia: Abir y cerrar mapa desde el icono
	*/
		$(".cadena-de-energia-detalle .icon-menu").live(shale.event.TAP, function(){
			shale.showHideMap();
		});

	/*
	 * Cadena de energia: Hovers mapa interactivo
	*/
		// Hover
		$(".cadena-de-energia-detalle .menu li").on("mouseover", function(){

			var element = $(this).data("position");

			// Reseteo los hovers
			$(".cadena-de-energia-detalle .menu li").removeClass("hover");

			// Agrego el hover a los 2 elementos que tienen el mismo data-position
			$(".cadena-de-energia-detalle .menu li[data-position="+element+"]").addClass("hover");

		});

		// on Mouseleave borro el hover
		$(".cadena-de-energia-detalle .menu li").on("mouseleave", function(){
			$(".cadena-de-energia-detalle .menu li").removeClass("hover");
		});

	/*
	 * Navegacion para cadena de energia
	*/
	$(".navegacion2, .cadena-de-energia-detalle .menu li").live(shale.event.TAP,function(event){

		event.preventDefault();

		var that = $(this);

		// Si clickee en el mapa o el menu, o si clickee en las flechas y el menu esta abierto lo cierro primero y despues animo.
		if( that.parents(".menu").length > 0 || $(".menu").is(":visible") ){

			shale.showHideMap();

			setTimeout(function(){
				shale.navegacion2.init({
					trigger: that,
					speed: 600,
					cantSection: 14,
					easing: "easeInOutExpo"
				});
			},300);

		// Sino animo directamente
		}else{

			shale.navegacion2.init({
				trigger: that,
				speed: 600,
				cantSection: 14,
				easing: "easeInOutExpo"
			});

		}

	});

	/*
	 * Instancias onload
	*/

		shale.sliderInternas();
		//shale.submenuGraficosRecursosNoConvencionales();
		shale.graficosRecursosConvencionales();

	/*
	 * Cuando se anima la pagina se lanza el evento personalizado "navegacion"
	*/

		$(window).on("navegacion",function(){

			//Instancias on navegacion
			shale.sliderInternas();
			//shale.submenuGraficosRecursosNoConvencionales();
			shale.graficosRecursosConvencionales();

		});





}());