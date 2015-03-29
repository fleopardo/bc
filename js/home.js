;(function(){
	// JS para la sección

	/*INCIALIZACION DE PLUG IN SELECTMENU*/
	if($("select").length > 0){
		$("select").selectmenu({
			transferClasses:true
		});
	}

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

})();



