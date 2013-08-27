/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){

	$.backstretch("./css/assets/fd-home-futbol.jpg");

	var options = {
		nextButton: true,
		prevButton: true,
		animateStartingFrameIn: true,
		transitionThreshold: 250,
		preloadTheseFrames: [1]/*,
		preloadTheseImages: [
			"img/tn-model1.png",
			"img/tn-model2.png",
			"img/tn-model3.png"
		]*/
	};

	var sequence = $("#sequence").sequence(options).data("sequence");

	sequence.afterLoaded = function(){
		$("#nav").fadeIn(100);
		$("#nav li:nth-child("+(sequence.settings.startingFrameID)+") a").addClass("active");
	}

	sequence.beforeNextFrameAnimatesIn = function(){
		$("#nav li:not(:nth-child("+(sequence.nextFrameID)+")) a").removeClass("active");
		$("#nav li:nth-child("+(sequence.nextFrameID)+") a").addClass("active");
	}

	$("#nav li").click(function(){
		if(!sequence.active){
			$(this).children("a").removeClass("active").children("a").addClass("active");
			sequence.nextFrameID = $(this).index()+1;
			sequence.goTo(sequence.nextFrameID);
		}
	});

}());

/* ISOTOPE */
;(function(){

// cache container
$container = $('.item-container');

	if($container.length > 0){

		$container.isotope({
		  // options
		  itemSelector : '.item',
		  //layoutMode : 'fitRows'
		  layoutMode : 'masonry',
		  masonry : {
	          columnWidth : 264
	        }
		});

		setTimeout(function(){
	        $container.isotope({
	          filter: '*',
	          resizeble: true,
	          animationOptions: {
	             duration: 750,
	             easing: 'linear',
	             queue: false,
	         }
	        });
	    }, 200);

		// filter items when filter link is clicked
		$('.filter-container .filters a').click(function(event){

			var that = $(this);
			var selector = that.data('filter');

			$('.filter-container .filters a').removeClass("active");
			that.parent().addClass("active");

			$container.isotope({ filter: selector });
			return false;

		});



	}

}());


