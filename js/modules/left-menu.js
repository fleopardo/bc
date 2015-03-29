;(function(){

	// menu lateral colapsible

    var aside = $('.filtros-left'),
        linksExpandables;

    if (aside) {

    	// listado de links que pueden ser expandibles
        linksExpandables = $('.filtros-left > li > label');
        AllLabels = $('.filtros-left > li label');

        // Los recorro para ver cual tiene submenu y le agrego clases
        $.each(linksExpandables, function (i,e) {

            var $link = $(e),
                $submenu = $link.next();

            if ($submenu.length > 0) {
                $link.addClass('expandable closed');
	            $submenu.slideToggle();

                // Si el link activo esta en un submenu lo muestro abierto
                if ($submenu.find('.active').length > 0) {
                    $link.addClass('opened');
                    $submenu.slideToggle();
                }else{
                    $link.addClass('closed');
                }

            }
        });

        aside.on('click', '.expandable', function (event) {
            var $trigger = $(event.target),
                $submenu = $trigger.next();

            // si esta abierto, se cierra..
            if ($submenu.is(":visible")) {
                $trigger.addClass('closed');
                $trigger.removeClass('opened');
            }else{
                $trigger.removeClass('closed');
                $trigger.addClass('opened');
            }
            $submenu.slideToggle();
            event.preventDefault();
        });

        aside.on('click', 'label', function (){

        	if ($(this).find('input').prop('checked') === true){
        		$(this).addClass('selected');
        	} else {
        		$(this).removeClass('selected');
        	}

        });

        $('.filtros-left input[type="checkbox"]').ezMark();

    }

})();