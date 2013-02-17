/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	var latitud = {};


	/* Helpers */

	latitud.$document = $(document);

	latitud.$body = $("body");

	/*
     * Detect user agent
    */
    latitud.isMobile = function(){

   		if( /Android|webOS|iPhone|iPad|iPod|BlackBerry/i.test(navigator.userAgent) ) {
   			return true;
		}else{
			return false;
		}

    };

	/*
	 * Elimino class no-js
	*/
	$("html").removeClass("no-js");

	window.latitud = latitud;

})(window);