$(function() {

	
	
	

	//LLAMADA DE FUNCION PARA QUE TODAS LAS LISTAS DE THUMBNAILS TENGAN MISMA ALTURA
	if ( $(".listado-thumbnails-container li").length > 0 ){
		heightThumbsListados = equalHeight( $(".listado-thumbnails-container li") );
		$(".listado-thumbnails-container li").css("height",heightThumbsListados);
	}


	//Para que el slider se pueda agarrar bien

	var slider = document.getElementById("wrapperSlider");

	if( slider != null ){
		slider.onselectstart = function(){return false;}
		slider.onmousedown = function(){return false;}
	}

	$(".enviar-amigo").click(function(event){
		event.preventDefault();
		event.stopPropagation();
		
		
		
		$(".form-enviar-amigo").modal({
			
			overlayClose : true,
			
			onOpen: function (dialog) {
				dialog.overlay.fadeIn('fast', function () {
					dialog.container.slideDown('fast', function () {
						dialog.data.fadeIn('fast',function(){
							
							$('.form-enviar-amigo form').bind('submit', function(e) {
								/*
								 * 
								 * Si el envio es exitoso se debe ejecutar el siguiente codigo
								 * 
								 */
								e.preventDefault();
								$('.form-enviar-amigo').html('<h1 style="padding: 20px 0;text-align: center;">El mensaje fue enviado correctamente.</h1>');
								$('.simplemodal-container').animate({
									
									'height': 60
									
								}, {
									step : function(){
										var altoPantalla = $(window).height();
										var altoSimplemodal = $('.simplemodal-container').height();
										
										var centradoModal = ( altoPantalla - altoSimplemodal)  / 2;
										
										$('.simplemodal-container').css('top', centradoModal);
									}
								});
							});
							
							/*
							 * 
							 *  [FIN] codigo si el submit es exitoso
							 * 
							 */
							
						});
					});
				});
			},

			onClose: function (dialog) {
				dialog.data.fadeOut('fast', function () {
					dialog.container.slideUp('fast', function () {
						dialog.overlay.fadeOut('fast', function () {
							$.modal.close(); // must call this!
						});
					});
				});
			}

		});
	});

});