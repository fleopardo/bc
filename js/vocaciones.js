/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	$(".head h1 a").bind("click",function(e){
		e.preventDefault();
		if( $(this).hasClass('active') ){
			return false;
		}else{
			$(".head h1 a").removeClass('active');
			$(this).addClass("active");
			var section = $(this).attr("href");
			$(".extended-description").stop(true,true).fadeOut('slow',function(){
				$(section).stop(true,true).fadeIn('slow');
			});
		}
		
	})


})(window);