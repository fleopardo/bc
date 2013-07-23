// Google API Map -----------------

var allCoordinateInfo = new Array();

function imgsGalInfo() {
	var totImgsGallery = $(".galInfo").children().size();
//	alert("totImgsGallery: " + totImgsGallery);
	for (i = 0; i < totImgsGallery; i++) {
		allCoordinateInfo[i] = $(".galInfo").children().eq(i).attr('title').split("_");
/*		alert("Lat: " + allCoordinateInfo[i][0]);
		alert("Long: " + allCoordinateInfo[i][1]);
		alert("Site: " + allCoordinateInfo[i][2]);
		alert("SiteDesc: " + allCoordinateInfo[i][3]);*/
	}
}
// Mouse move Detect ----------------

var mouseX = 0;
var mouseY = 0;

$(document).mousemove( function(e) {
    mouseX = e.pageX;
    mouseY = e.pageY;
});

// Menu Regiones ----------------

var inMenu = false;
var inMenu2 = false;

function inMenuFalse() { inMenu = false; }

function inMenuTrue() { inMenu = true; }

function startCheck() { setTimeout("chekOut()",500); }

function chekOut() {
    var widthMain = $('.main-main').width();
    var deltaViewport = ( $(window).width() - widthMain ) / 2;
    var posmX = mouseX-deltaViewport;
    var posmY = mouseY;
    var limitUpY = parseInt($('.main-main').css("padding-top").replace("px", "")) + parseInt($('.main-main').css("margin-top").replace("px", "")) + parseInt($('.nav').css("margin-top").replace("px", ""));
    var limitLeftX = widthMain - parseInt($('.nav').css("margin-right").replace("px", "")) - $('ul#listregions').width();
//    $('.breadcrumb').html("X: " + posmX + "   Y: " + posmY + "   limitUpY: " + limitUpY + "   limitLeftX: " + limitLeftX);
//    $('.breadcrumb').css('color', '#000000')
    
    if (inMenu == false && ($.browser.msie || $.browser.webkit)) {
        if (( posmX < limitLeftX || posmX > limitLeftX + $('ul#listregions').width()) || (posmY<limitUpY || posmY > limitUpY + $('ul#listregions').height())) {
            $('ul#listregions').hide('fast');
            setTimeout("inTitle()",200);
        }
    }
    
    if (inMenu == false && $.browser.mozilla) {
        $('ul#listregions').hide('fast');
        setTimeout("inTitle()",200);
    }
}

function inTitle(){ $('a#button').show('fast'); }

function inMenuFalse2() { inMenu2 = false; }

function inMenuTrue2() { inMenu2 = true; }

function startCheck2() { setTimeout("chekOut2()",500); }

function chekOut2() {
    var widthMain = $('.main-main').width();
    var deltaViewport = ( $(window).width() - widthMain ) / 2;
    var posmX = mouseX-deltaViewport;
    var posmY = mouseY;
    var limitUpY = parseInt($('.bottom').css("top").replace("px", "")) + parseInt($('.bottom_header').css("margin-top").replace("px", "")) + parseInt($('.nav').css("margin-top").replace("px", ""));
    var limitLeftX = widthMain - parseInt($('.nav').css("margin-right").replace("px", "")) - $('ul#listregions2').width();
//    $('.breadcrumb').html("X: " + posmX + "   Y: " + posmY + "   limitUpY: " + limitUpY + "   limitLeftX: " + limitLeftX);
//    $('.breadcrumb').css('color', '#000000')
    
    if (inMenu2 == false && ($.browser.msie || $.browser.webkit)) {
        if (( posmX < limitLeftX || posmX > limitLeftX + $('ul#listregions2').width()) || (posmY<limitUpY || posmY > limitUpY + $('ul#listregions2').height())) {
            $('ul#listregions2').hide('fast');
            setTimeout("inTitle2()",200);
        }
    }
    
    if (inMenu2 == false && $.browser.mozilla) {
        $('ul#listregions2').hide('fast');
        setTimeout("inTitle2()",200);
    }
}

function inTitle2(){ $('a#button2').show('fast'); }

// Parallax Rewrite ----------------

function changeBG() {
    $('.pxs_bg1').html($('.pxs_bg1').html()+'<img class="slide" src="' + $('.pxs_bg1 img:first').attr('src') + '" />');
    $('.pxs_slider#labels').html($('.pxs_slider#labels').html()+'<li>' + $('.pxs_slider#labels li:first').html() + '</li>');
}

// Parallax Not Rewind ----------------
  var parallaxMoving = false;
  var parallaxFreez;

function endParallaxMove() {
    clearInterval(parallaxFreez);
    parallaxMoving = false;
//    $('.breadcrumb').html("-----");
//    $('.breadcrumb').css('color', '#000000')    
}

/*
timeCounter = 0;
tCounter = setInterval("updateCounter()", 1000);

function updateCounter() {
	$('.rutas h3').html(timeCounter);
	timeCounter ++ ;
}*/

// Supersize ----------------

var supSizedStarted = false;

function startSupSLized() {
  $('.pxs_loading').css("display","block");
//alert("Start");
  var totImgs = $(".supsizedContent").children().size();
  var allSupImgs = new Array();
  for (i = 0; i < totImgs; i++) {
      var srcCont = $(".supsizedContent").children().eq(i).attr('title');
      var tempTitle = "Slide" + i;
      allSupImgs[i] = {image : srcCont, title : tempTitle, thumb : srcCont, url : ''};
  }
				$.supersized({
				
					// Functionality
					slideshow               :   1,			// Slideshow on/off
					autoplay				:	1,			// Slideshow starts playing automatically
					start_slide             :   temp,			// Start slide (0 is random)
					stop_loop				:	0,			// Pauses slideshow on last slide
					slide_interval          :   5000,		// Length between transitions
					transition              :   6, 			// 0-None, 1-Fade, 2-Slide Top, 3-Slide Right, 4-Slide Bottom, 5-Slide Left, 6-Carousel Right, 7-Carousel Left
					transition_speed		:	1000,		// Speed of transition
					new_window				:	1,			// Image links open in new window/tab
					pause_hover             :   0,			// Pause slideshow on hover
					keyboard_nav            :   1,			// Keyboard navigation on/off
					performance				:	1,			// 0-Normal, 1-Hybrid speed/quality, 2-Optimizes image quality, 3-Optimizes transition speed // (Only works for Firefox/IE, not Webkit)
					image_protect			:	1,			// Disables image dragging and right click with Javascript
															   
					// Size & Position						   
					min_width		        :   0,			// Min width allowed (in pixels)
					min_height		        :   0,			// Min height allowed (in pixels)
					vertical_center         :   1,			// Vertically center background
					horizontal_center       :   1,			// Horizontally center background
					fit_always				:	0,			// Image will never exceed browser width or height (Ignores min. dimensions)
					fit_portrait         	:   1,			// Portrait images will not exceed browser height
					fit_landscape			:   0,			// Landscape images will not exceed browser width
															   
					// Components							
					slide_links				:	'blank',	// Individual links for each slide (Options: false, 'number', 'name', 'blank')
					thumb_links				:	1,			// Individual thumb links for each slide
					thumbnail_navigation    :   0,			// Thumbnail navigation
/*					slides 					: [			// Slideshow Images
														{image : 'images/regiones/patagonia/pics_slider_full/slide1.jpg', title : 'Slide1', thumb : 'images/regiones/patagonia/pics_slider_full/slide1.jpg', url : ''},
														{image : 'images/regiones/patagonia/pics_slider_full/slide2.jpg', title : 'Slide2', thumb : 'images/regiones/patagonia/pics_slider_full/slide2.jpg', url : ''},
														{image : 'images/regiones/patagonia/pics_slider_full/slide3.jpg', title : 'Slide3', thumb : 'images/regiones/patagonia/pics_slider_full/slide3.jpg', url : ''},
														{image : 'images/regiones/patagonia/pics_slider_full/slide4.jpg', title : 'Slide4', thumb : 'images/regiones/patagonia/pics_slider_full/slide4.jpg', url : ''},
														{image : 'images/regiones/patagonia/pics_slider_full/slide5.jpg', title : 'Slide5', thumb : 'images/regiones/patagonia/pics_slider_full/slide5.jpg', url : ''},
														{image : 'images/regiones/patagonia/pics_slider_full/slide6.jpg', title : 'Slide6', thumb : 'images/regiones/patagonia/pics_slider_full/slide6.jpg', url : ''}
												],*/
					slides :  allSupImgs,
												
					// Theme Options			   
					progress_bar			:	1,			// Timer for each slide							
					mouse_scrub				:	0
					
				});
				
}

