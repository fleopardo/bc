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

 	/*$('dt a').click(function(){
 		if ( $(this).hasClass('texto') ) {
 			alert('sdfs')
 			$('dd #texto').css('display','none');
 			/*$('table').css('display','block');
 			$(this).removeClass('texto');
 			$(this).addClass('tabla');
 		}

 		if ( $(this).hasClass('tabla') ) {
 			$('dd table').css('display','none');
 			$('dd #texto').css('display','block');
 			$(this).removeClass('tabla');
 			$(this).addClass('texto');
 		}
 	});*/
	

})(window);