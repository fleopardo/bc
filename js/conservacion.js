/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){



 	$('dt').each(function(){
 		$(this).click(function(){
 			$(this).parent().siblings('dl').find('dd').slideUp();
 			$(this).parent().siblings('dl').find('dt').removeClass('active');
 			$(this).toggleClass('active');
 			$(this).siblings('dd').slideToggle();
 		});
 	});
	

})(window);