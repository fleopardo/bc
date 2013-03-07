/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var $contentPage = $(".contentPage"),
		$seccionLatitud = $(".latitud"),
		$seccionElOrigen = $(".el-origen"),
		$seccionLaCreacion = $(".la-creacion"),
		$seccionElVino = $(".el-vino"),
		$scrollCustom = $('.scroll'),

		$elOrigen_offset = $seccionElOrigen.offset().top,
		$laCreacion_offset = $seccionLaCreacion.offset().top,
		$elVino_offset = $seccionElVino.offset().top,

		$navSecciones = $(".scroll-nav");

	/*
	 * Funcion para activar color en lista de navegacion
	*/

	function activeNav(){

		var scrolled = latitud.window.scrollTop();

		// Si el scroll esta dentro del area "El Origen"..
		if ( (scrolled >= $elOrigen_offset) && (scrolled < $laCreacion_offset) ){

			$navSecciones.find("a").removeClass("active");
			$(".el-origen-nav").addClass("active");

		} else if ( (scrolled >= $laCreacion_offset) && (scrolled < $elVino_offset) ){

			$navSecciones.find("a").removeClass("active");
			$(".la-creacion-nav").addClass("active");

		} else if ( scrolled >= $elVino_offset ){

			$navSecciones.find("a").removeClass("active");
			$(".el-vino-nav").addClass("active");

		}else{

			$navSecciones.find("a").removeClass("active");
			$(".latitud-nav").addClass("active");

		}
	}

	/*
 	 * Inicializacion jsScrollPane
 	*/
	$scrollCustom.jScrollPane({
		verticalDragMaxHeight : 39,
		verticalDragMinHeight : 39,
		setWheelScrollingEnabled : true
	});

	/*
 	 * jsScrollPane soporte tactil
 	*/

	if(latitud.touch){

 		$scrollCustom.bind('touchstart', function(e){

			var cpos = dragPosition;

			e = e.originalEvent.touches[0];

			var sY = e.pageY;
			var sX = e.pageX;

			$scrollCustom.bind('touchmove',function(ev){
				ev.preventDefault();
				ev = ev.originalEvent.touches[0];

				var top = cpos-(ev.pageY-sY);
				positionDrag(top);

			});

			$scrollCustom.bind('touchend',function(ev){
				$scrollCustom.unbind('touchmove touchend');
			});

		});
 	}


 	/*
 	 * navegacion seccion nuestros vinos -> vinos
 	*/

 	// Si es desktop oculto los links, sino los dejo visible porque en tablets no existe :hover
 	if( !latitud.touch ){

 		$contentPage.addClass("parallax");

 		$seccionElVino.find("nav a").css("display","none");

 	}

 	// Muestro y oculto los links cuando me paro sobre el menu (No uso los eventos personalizados ya que solo es para desktop)
	$seccionElVino.find("nav li").on({

		mouseenter: function(){

			var link = $(this).find("a");

			if( !link.hasClass("active") ){

				link.stop(true,true).slideDown("fast");

			}

		},

		mouseleave: function(){

			var link = $(this).find("a");

			if( !link.hasClass("active") ){

				link.stop(true,true).slideUp("fast");

			}

		}

	});

	$seccionElVino.find(".botellas-container li").on({

		mouseenter: function(){

			var flag = $(this).data("class");

			$seccionElVino.find("nav ."+flag+" a").stop(true,true).slideDown("fast");
		},

		mouseleave: function(){

			var flag = $(this).data("class");

			$seccionElVino.find("nav ."+flag+" a").stop(true,true).slideUp("fast");

		}

	});



/*
	function abrirDetalle(that){

		if( !that.hasClass("active") ){

			if ( !$("#load-detalle").length > 0 ){
				$seccionElVino.find(".contenedorDetalleVino").append('<div id="load-detalle" style="display: none;"></div>');
			}else{
				//$("#load-detalle").fadeOut();
			}


			var sectionToGo = ( that.parent().attr("data-class") != undefined ) ? that.parent().attr("data-class") : that.parent().attr("class");

			var linkClickeado = $seccionElVino.find("nav li." + sectionToGo + " a");

			// Cargo la seccion
			$("#load-detalle").load(that.attr("href") + " .nuestros-vinos-interna", function(response, status, xhr){

				if(status == "success"){

					// Oculto la seccion principal
					$seccionElVino.find(".botellas-container").fadeOut("fast",function(){

						linkClickeado.addClass("active");

						// Muestro el detalle
						$("#load-detalle").fadeIn("fast", function(){

							//Bindeo el click al volver
							$(".volver-vinos").one(latitud.event.TAP,function(event){

								event.preventDefault();

								cerrarDetalle();

							})

						})

					})

				}else if(status == "error"){

					alert("error");
					cerrarDetalle();

				}

			})

		}

	}


	function cerrarDetalle(){

		$("#load-detalle").fadeOut("fast",function(){
			alert("lala");
			$seccionElVino.find(".botellas-container").fadeIn("fast");

			$seccionElVino.find("nav a").removeClass("active").hide();

		}).remove();

	}



	$seccionElVino.find("nav a").on(latitud.event.TAP,function(event){

		event.preventDefault();

		abrirDetalle($(this));

	});

	$seccionElVino.find(".botellas-container li a").on(latitud.event.TAP,function(event){

		event.preventDefault();

		abrirDetalle($(this));

	});
*/

	/*
	 * Bindeo a todos los links que necesitan moverse con scrollTo
	*/
	$(".scroll-to").on(latitud.event.TAP,function(event){

		var that = $(this),
			anchor = that.attr("data-scroll:anchor") || null,
			speed = parseInt(that.attr("data-scroll:speed")) || 1500,
			sectionName = that.text();

		if( anchor !== null ){

			event.preventDefault();

			$.scrollTo.window().queue([]).stop();
			$.scrollTo(anchor, {speed: speed, easing:'easeOutExpo'});

			if(window.history.pushState){
				window.history.pushState(null, sectionName, anchor);
			}

			/** actualizo los active **/
			//currentNavigation(that);
		}

	});


	/*
	 * Tooltips en navegacion
	*/
	$navSecciones.find("a").on(latitud.event.ENTER,function(){

		$(this).find("span").stop(true,true).fadeIn("200");

	});

	$navSecciones.find("a").on(latitud.event.LEAVE,function(){

		$(this).find("span").stop(true,true).fadeOut("200");

	});

	/* Chequeo el active al inicio*/
	activeNav();

	/* Chequeo el active on scroll cada 100 ms para no matar al browser */
	$(window).on("scroll",function(){

		setTimeout(function(){

			activeNav();

		},100);

	});




})(window);

