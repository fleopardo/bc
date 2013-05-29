/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	/*
	 * Variables
	*/
	var $acordeon = $(".acordeon");


	if( $acordeon.length > 0){

		$acordeon.each(function(){

			var that = $(this);

			that.bind("click",function(){

				if( that.hasClass("open") ){

					that.removeClass("open");

					that.parent().next().slideUp();

				}else{

					that.addClass("open");

					that.parent().next().slideDown();

				}

			})

		})

	}



})(window);