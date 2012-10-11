(function(){

	/* Namespace YPF */
	var ypf = window.ypf = {

		/* Caché de las variables mas usadas */
		cache: {
			$window: window,
			$body: $("body")
		},

		/* Metodos generales */

		general: {

			/* Seteo de background con plugin ezBgResize */
			setBackground: function(){
				var fondo;
				(ypf.cache.$body.attr("id") == "home") ? fondo = "./images/fd_home.jpg" : fondo = "./images/fd_carreras.jpg";

				ypf.cache.$body.ezBgResize({
				    img : fondo
				});
			}
		},

		/* Metodos Home*/

		home: {

		},

		/* Metodos carreras */

		carreras: {
			navigation: function(){
				var $linksCarreras = $("#listaCarreras a");

				$linksCarreras.bind("click",function(event){
					event.preventDefault();
					event.stopPropagation();

					$linksCarreras.parent().removeClass("active");
					$(this).parent().addClass("active");

					var carrera = $(this).attr("href").replace("#","");
					$(".content article").hide();
					$("#"+carrera).show();

					//Actualizo el href de "Universidades (Breadcrumb) y "Donde estudiar esta carrera"
					var linkUniversidades = carrera + ".html";
					$(".universidadesLink").attr("href",linkUniversidades);

					//Actualizo el href de testimonios (Breadcrumb)
					var testimonios = $(this).attr("data-testimonios");
					$(".testimoniosLink").attr("href",testimonios);
				});



			}
		},

		universidades: {
			filtrar: function(){
				var $filtros = $("#filtros a");
				var $universidades = $(".content article li");

				$filtros.bind("click",function(event){
					event.preventDefault();
					event.stopPropagation();

					$filtros.parent().removeClass("active");
					$(this).parent().addClass("active");

					var criterio = $(this).attr("href").replace("#","");

					$universidades.hide();
					$universidades.each(function(i,e){
						if( $(this).attr("data-filtro") == criterio){
							$(this).show();
						}
					});
				});
			}
		},

		testimonios: {
			mostrar: function(){
				var $testimonios = $("#listaTestimonios li");

				$testimonios.bind({
					//mouseover: function(event){
					mouseenter: function(event){
						event.preventDefault();
						event.stopPropagation();

						//$(this).find(".citaCompleta").show();
						$(this).find(".citaCompleta").animate({
							'left': '0'
						});
					},
					//mouseout: function(event){
					mouseleave: function(event){
						event.preventDefault();
						event.stopPropagation();

						//$(this).find(".citaCompleta").hide();
						$(this).find(".citaCompleta").animate({
							'left': '621px'
						});;
					}

				});
			}
		}
	}

})(window);