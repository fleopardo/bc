/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var $menu = $(".menuPrincipal"),

		$body = $("body");


	/*
	 * Elimino class no-js
	*/
	$("html").removeClass("no-js");


	/*
	 * Expandir y contraer el menu
	*/
	$menu.find(".open").bind("click",function(){

		$menu.toggleClass("show");

		if( $menu.hasClass("show") ){

			$body.css("padding-bottom","243px");

		}else{

			$body.css("padding-bottom","130px");

		}

	});


})(window);