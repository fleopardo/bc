
	$('.headerColapsible').click(function(){
		if ( $(this).hasClass('opened') ) {
			$(this).removeClass('opened');
			$(this).addClass('closed');

		} else if ($(this).hasClass('closed')){
			$(this).removeClass('closed');
			$(this).addClass('opened');
		}

		$(this).nextUntil('tr.anchor').slideToggle(100, function(){

	    	});

	});



 	/*
	 * Variables
	*/
	var selectInformeAnual = $(".select-informe-anual");

	/* Selects */

 	selectInformeAnual.on("change", function(event){
 		var option = $(this).find('option:selected').data('year');

 		if (option === 'all'){
 			$('tr[data-year]').show();
 		}else{
 			$('tr[data-year]').hide();
        	$("tr[data-year=" + option + "]").show();
 		}
 	});
