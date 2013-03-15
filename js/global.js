

	$(".navegacion").live("click",function(event){

		event.preventDefault();

		shale.navegacion.init({
			trigger: $(this),
			speed: 800,
			easing: "easeOutExpo"
		});

	})