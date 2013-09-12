/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
 *
*/



;(function(){


	$.backstretch("./css/assets/fd-calendario.jpg");


	/* ISOTOPE */

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





	$('a.prev').click(function(){

		var mesActive = $('.animated.active'),
			mesPrev = $('.animated.active').prev("section");

			//cambio valor de mes y año
		$('.meses-container p').html(mesPrev.data('mes')+'<span> | '+mesPrev.data('ano')+'</span>');
		
		if(mesPrev.length > 0) {

			mesActive.removeClass('fadeIn active').css('display','none');
			mesPrev.addClass('fadeIn active').css('display','block');
			//alert('exist');

			//Reacomodo items del isotope
			
	        $container.isotope({
	          filter: '*',
	          resizeble: true,
	          animationOptions: {
	             duration: 750,
	             easing: 'linear',
	             queue: false,
	         }
	        });
		    

		}else{

			alert("B====D");

		}

	});


	$('a.next').click(function(){

		var mesActive = $('.animated.active'),
			mesNext = $('.animated.active').next("section");
		
		//cambio valor de mes y año
		$('.meses-container p').html(mesNext.data('mes')+'<span> | '+mesNext.data('ano')+'</span>');

		if(mesNext.length > 0) {

			mesActive.removeClass('fadeIn active').css('display','none');
			mesNext.addClass('fadeIn active').css('display','block');

			//Reacomodo items del isotope
			
	        $container.isotope({
	          filter: '*',
	          resizeble: true,
	          animationOptions: {
	             duration: 750,
	             easing: 'linear',
	             queue: false,
	         }
	        });
		    

		}else{

			alert("B====D");

		}

	});




}());
