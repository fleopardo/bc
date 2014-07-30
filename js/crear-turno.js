/* TURNOS */

;(function(win){

	var steps = $('.body-steps'),
		step1 = $('.body-step1'),
		step2 = $('.body-step2'),
		step3 = $('.body-step3'),
		rowsStep1 = step1.find('tr'),
		rowsStep2 = step2.find('tr'),
		rowsStep3 = step3.find('tr');


	/* Funcionalidad step 1 */

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
	});



	/* Funcionalidad step 2 */

	// Boton siguiente
	step2.find('.btn-next').on('click', function (event) {
		event.preventDefault();
		step2.hide();
		step3.show();
	});


	/* Funcionalidad step 3 */


}(window));
