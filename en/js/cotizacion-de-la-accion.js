
;(function(){

 	var rowTableMercado = $(".list-mercados tr"),

 		selectorsMercado = $(".select-mercado input[type=checkbox]");



 	selectorsMercado.on("change", function(event){

 		if( $(this).prop("checked") === true ){

 			$(".list-mercados tr[data-id=" + $(this).val() + "]").show();

 		}else{

 			$(".list-mercados tr[data-id=" + $(this).val() + "]").hide();

 		}

 	});

})();