;(function(){

	// menu lateral colapsible

    $('ul.options-left li > span').on('click', function(){
        $(this).siblings('ul').slideToggle();
    });

})();