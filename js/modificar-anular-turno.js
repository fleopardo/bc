/* TURNOS */

;(function(win){

	var tableCont = $('.table-container'),
		rows = tableCont.find('tr')


	/* Funcionalidad step 1 */

	// Rows de la tabla
	rows.find('input[type="checkbox"]').on('click', function () {
		if ($(this).prop('checked') == true) {
			$(this).parents('tr').addClass('active');
		} else {
			$(this).parents('tr').removeClass('active');
		}
	});


}(window));
