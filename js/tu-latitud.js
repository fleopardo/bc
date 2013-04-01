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
            isAnimated: true
        });
    });

})(window);