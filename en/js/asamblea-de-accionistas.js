
;(function(){

 	var select = $(".select-year");

 	select.on("change", function(event){

 		$(".docs").hide();
        $(".docs[data-year=" + $(this).find('option:selected').data('year') + "]").show();

 	});

})();