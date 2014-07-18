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
var selectInformeAnual = $(".select-model");

/* Selects */

selectInformeAnual.on("change", function(event){
	var option = $(this).find('option:selected').data('model');

	if (option === 'all'){
		$('tr[data-model]').show();
	}else{
		$('tr[data-model]').hide();
	$("tr[data-model=" + option + "]").show();
	}
});
