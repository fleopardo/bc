/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/


;(function(){



	if($("#sequence").length > 0){
		var options = {
			nextButton: true,
			prevButton: true,
			cycle: true,
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

		$(".sequence-next").on("click", function(){
			sequence.next();
		})

		$(".sequence-prev").on("click", function(){
			sequence.prev();
		})

	}

}());
