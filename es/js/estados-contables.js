
;(function(){
 	/*
	 * Variables
	*/
	var selectForm20 = $(".select-form20"),
		selectInformeAnual = $(".select-informe-anual");

	/* Selects */

 	selectForm20.on("change", function(event){

 		$(".docs-form20").hide();
        $(".docs-form20[data-year=" + $(this).find('option:selected').data('year') + "]").show();

 	});

 	selectInformeAnual.on("change", function(event){

 		$(".docs-informe-anual").hide();
        $(".docs-informe-anual[data-year=" + $(this).find('option:selected').data('year') + "]").show();

 	});

})();