/* TURNOS */

;(function(win){

	var breadcrumb = $('.breadcrumb'),
		steps = $('.body-steps'),
		step1 = $('.body-step1'),
		step2 = $('.body-step2'),
		step3 = $('.body-step3'),
		rowsStep1 = step1.find('tr'),
		rowsStep2 = step2.find('tr'),
		rowsStep3 = step3.find('tr'),
		datepicker = $('#datepicker');


	/* Funcionalidad step 1 */

	// datepicker jquery ui
	$( "#datepicker" ).datepicker({
    	monthNames: ['Enero','Febrero','Marzo','Abril','Mayo','Junio','Julio','Agosto','Septiembre','Octubre','Noviembre','Diciembre'],
        monthNamesShort: ['Ene','Feb','Mar','Abr','May','Jun',
        'Jul','Ago','Sep','Oct','Nov','Dic'],
        dayNames: ['Domingo','Lunes','Martes','Mi&eacute;rcoles','Jueves','Viernes','S&aacute;bado'],
        dayNamesShort: ['Dom','Lun','Mar','Mi&eacute;','Juv','Vie','S&aacute;b'],
        dayNamesMin: ['Do','Lu','Ma','Mi','Ju','Vi','S&aacute;'],
        onSelect: function (date) {
			console.log(date);
			$("#datepicker").hide();
		}
    });

	// Expandos
	$('.seleccionar-fecha').on('click', function () {
		$('.seleccionar-horario').removeClass('active');
		$(this).addClass('active');
		step1.find('.seleccionar-horario-content').hide();
		datepicker.show();
	});

	$('.seleccionar-horario').on('click', function () {
		$('.seleccionar-fecha').removeClass('active');
		$(this).addClass('active');
		step1.find('.seleccionar-horario-content').show();
		datepicker.hide();
	});

	// Rows de la tabla
	rowsStep1.find('input[type="checkbox"]').on('click', function () {
		if ($(this).prop('checked') == true) {
			$(this).parents('tr').addClass('active');
		} else {
			$(this).parents('tr').removeClass('active');
		}
	});

	// Boton siguiente
	step1.find('.btn-next').on('click', function (event) {
		event.preventDefault();
		step1.hide();
		step2.show();
		breadcrumb.find('li').removeClass('active');
		breadcrumb.find('.step2').addClass('active');
	});



	/* Funcionalidad step 2 */

	// Boton siguiente
	step2.find('.btn-next').on('click', function (event) {
		event.preventDefault();
		step2.hide();
		step3.show();
		breadcrumb.find('li').removeClass('active');
		breadcrumb.find('.step3').addClass('active');
	});


	/* Funcionalidad step 3 */


}(window));
