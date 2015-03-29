;(function(){
	if( $(".owl-carousel-detalle").length > 0 ){
		$('.owl-carousel-detalle').owlCarousel({
		    loop:false,
		    margin:0,
		    nav:true,
		    dots:false,
		    responsiveClass:true,
		    navText:['<img src="css/assets/owl-prev.png" alt="">','<img src="css/assets/owl-next.png" alt="">'],
		    responsive:{
		        0:{
		            items:1
		        },
		        768:{
		            items:1
		        },
		        1024:{
		            items:1
		        }
		    }
		});
	}
	$(".options-content.mob ul.det-options li.like a").click(function(e) {
  		e.preventDefault();
		//$(".navNuevo").toggleClass("open");
		$(this).addClass( "on" );
	});
	$(".options-content.mob ul.det-options li.share a").click(function(e) {
  		e.preventDefault();
		//$(".navNuevo").toggleClass("open");
		$(this).toggleClass( "on" );
	});


})();



