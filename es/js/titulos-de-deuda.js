$('.headerColapsible').click(function(){
	if ( $(this).hasClass('opened') ) {
		$(this).removeClass('opened');
		$(this).addClass('closed');

	} else if ($(this).hasClass('closed')){
		$(this).removeClass('closed');
		$(this).addClass('opened');
	}

	$(this).nextUntil('tr.anchor').not('.noColapsible').slideToggle(100, function(){

    });

});