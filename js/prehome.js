/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	$(".acciones").delegate("a",latitud.event.TAP,function(){


		if( $(this).hasClass("primary") ){

			alert("Verifico de mentiras si se quiere recordar..")

			if( $("#recordarme").prop("checked") ){

				//Guardo cookie
				// Averiguar en que se va a programar el site, la lectura de la cookie al principio deberia ser serverside para luego redireccionarlo a la home en caso de estar recordado.

				alert("se quiso recordar");

			}

		}else{

			alert("no tenes permisos para ver el site");

		}

	});

})(window);