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

		}


	/*
	 * Funcionamiento submenu Desafio energetico
	*/

		shale.submenuGraficosRecursosNoConvencionales = function(){

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

		}


	/*
	 * Instancias onload
	*/

		shale.sliderInternas();
		shale.submenuGraficosRecursosNoConvencionales();

	/*
	 * Cuando se anima la pagina se lanza el evento personalizado "navegacion"
	*/

		$(window).on("navegacion",function(){

			//Instancias on navegacion
			shale.sliderInternas();
			shale.submenuGraficosRecursosNoConvencionales();

		});





}());