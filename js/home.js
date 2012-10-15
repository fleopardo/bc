$(function(){

	$("#slider-principal").mCustomScrollbar({
		horizontalScroll: true,
		scrollButtons:{
			enable: true,
			scrollType: "pixels",
			scrollAmount: $("#container-principal").width()
		}
	});

})