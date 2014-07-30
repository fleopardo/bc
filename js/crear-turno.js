/* TURNOS */

;(function(win){

	var step1 = $('.body-step1'),
		rows = step1.find('tr');

	rows.find('input[type="checkbox"]').on('click', function(){

		if ($(this).prop('checked') == true) {
			$(this).parents('tr').addClass('active');
		} else {
			$(this).parents('tr').removeClass('active');
		}

	})

}(window));
