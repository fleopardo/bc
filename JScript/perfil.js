$(function() {

	/*Levantar mensaje de alerta d salida de carrito*/

	$('.carrito .resumen-container a.volver-catalogo').click(function(){
		$('.mascaraFormularioEnviado').fadeIn();
	});


	/* Funcion para eliminar los rows */

	$(".eliminar-bloque").each(function(){
		$(this).click(function(){
			$(this).parents(".content-eliminar").fadeOut(function(){
				$(this).remove();
			})
		})
	});


	/* Modal de error */

	$("#ir-catalogo").click(function(event){
		event.preventDefault();
		event.stopPropagation();

		$(".modal-error").modal({

			onOpen: function (dialog) {

				dialog.overlay.fadeIn('fast', function () {
					dialog.container.slideDown('fast', function () {
						dialog.data.fadeIn('fast');
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

	/* Modal ver mas datos */

	$(".col-mas-datos > a, .rows.mas-datos a").click(function(event){
		event.preventDefault();
		event.stopPropagation();

		$(".modal-mas-datos").modal({
			persist: true,

			onOpen: function (dialog) {
				$('select').selectmenu();

				dialog.overlay.fadeIn('fast', function () {
					dialog.container.slideDown('fast', function () {
						dialog.data.fadeIn('fast');
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