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

 	$('dt a').click(function(event){
 		event.preventDefault();
 		event.stopPropagation();

 		if ( $(this).hasClass('texto') ) {

 			$('dd #texto').css('display','none');
 			$('dd table').css('display','block');

 			$(this).text("Ver texto");
 			$(this).removeClass('texto');
 			$(this).addClass('tabla');

 		}else{

 			$('dd table').css('display','none');
 			$('dd #texto').css('display','block');

 			$(this).text("Ver cuadro");
 			$(this).removeClass('tabla');
 			$(this).addClass('texto');
 		}

 	});

})(window);