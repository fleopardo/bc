/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	/*$('#articles').masonry({
	  /*itemSelector: '.item',
	  columnWidth: function( containerWidth ) {
	    return containerWidth / 3;
	  },
	  //isResizable:true,
	  //isFitWidth: true,
	  isAnimated: false
	});*/

	var container = $('#articles');

    container.imagesLoaded(function(){  
        container.masonry({
           itemSelector: '.item',
           columnWidth: function( containerWidth ) {
              return containerWidth /3; // depends how many boxes per row
            },
            isAnimated: true,
            animationOptions: {
				duration: 300,
				queue: false
			}
        });
    });

    



    $('.img-video-container').each(function(){
    	$(this).mouseenter(function(){
	    	$(this).find('.over-article').stop(true,true).fadeIn();
	    });
    });

    $('.img-video-container').each(function(){
    	$(this).mouseleave(function(){
	    	$(this).find('.over-article').stop(true,true).fadeOut();
	    });
    });

})(window);