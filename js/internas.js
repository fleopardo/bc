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