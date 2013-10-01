/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){


	$.backstretch("./css/assets/fd-home-futbol.jpg");


	if($("#sequence").length > 0){
		var options = {
			nextButton: true,
			prevButton: true,
			cycle: true,
			animateStartingFrameIn: true,
			transitionThreshold: 250,
			preloadTheseFrames: [1],
			fallback: {
	            theme: "fade",
	            speed: 500
        	}
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

		$(".sequence-next").on("click", function(){
			sequence.next();
		})

		$(".sequence-prev").on("click", function(){
			sequence.prev();
		})

	}

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
	             queue: false
	         }
	        });
	    }, 200);

		// filter items when filter link is clicked
		$('.filter-container .filters a').click(function(event){

			var that = $(this);
			var selector = that.data('filter');

			if( that.data("id") == "all"){

				$('.filter-container .filters li').addClass("active");

			}else{

				$('.filter-container .filters li').removeClass("active");
				that.parent().addClass("active");
			}

			$container.isotope({ filter: selector });
			return false;

		});



	}

}());
