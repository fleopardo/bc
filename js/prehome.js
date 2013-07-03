/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	if($.cookie('lat33remember')){
		document.location.href = "home.html";
	};

	$(".acciones").delegate("a",latitud.event.TAP,function(){

		if( $(this).hasClass("primary") ){

			if( $("#recordarme").prop("checked") ){

				//Guardo cookie
				$.cookie('lat33remember', 'si');

			}

		}else{

			//alert("no tenes permisos para ver el site");
			$('p.no-permitido').css('display','block');
		}

	});

})(window);