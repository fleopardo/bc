
;(function(){

 	/*
	 * Variables
	*/
	var $acordeon = $(".acordeon-container .titulo"),
	    $tabs = $(".tabs li"),
	    selectForm20 = $(".select-form20"),
		selectInformeAnual = $(".select-informe-anual");


	if( $acordeon.length > 0){

	        $acordeon.each(function(){

	                var that = $(this);

	                that.bind("click",function(){

	                        if( that.find(".acordeon").hasClass("open") ){

	                                that.find(".acordeon").removeClass("open");

	                                that.next().slideUp();

	                        }else{

	                                that.find(".acordeon").addClass("open");

	                                that.next().slideDown();

	                        }

	                })

	        })

	}


	if( $tabs.length > 0 ){

	    $tabs.on("click", function(){

	        $tabs.removeClass("active");
	        $(this).addClass("active");
	        $(".acordeon-container").hide();
	        $(".acordeon-container[data-year='" + $(this).data("year") + "']").show()

	    });

	}


	/* Selects */

 	selectForm20.on("change", function(event){

 		$(".docs-form20").hide();
        $(".docs-form20[data-year=" + $(this).find('option:selected').data('year') + "]").show();

 	});

 	selectInformeAnual.on("change", function(event){

 		$(".docs-informe-anual").hide();
        $(".docs-informe-anual[data-year=" + $(this).find('option:selected').data('year') + "]").show();

 	});

 	$('.jcarousel').jcarousel();

})();