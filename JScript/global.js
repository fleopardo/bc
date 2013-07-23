/* Function para hacer los backgrounds fullscreen */
function FullScreenBackground(theItem){
	var winWidth=$(window).width();
	var winHeight=$(window).height();
	var imageWidth=$(theItem).width();
	var imageHeight=$(theItem).height();

	var picHeight = imageHeight / imageWidth;
	var picWidth = imageWidth / imageHeight;
	/**/
	if ((winHeight / winWidth) < picHeight){
		$(theItem).css("width",winWidth);
		$(theItem).css("height",picHeight*winWidth);
	}else{
		$(theItem).css("height",winHeight);
		$(theItem).css("width",picWidth*winHeight);
	}
	 //Funciones para alinear verticalmente
	if ( imageHeight < 449){
		$(theItem).css("height",450);
	}

	$(theItem).css("margin-left",winWidth / 2 - $(theItem).width() / 2);
	$(theItem).css("margin-top",winHeight / 2 - $(theItem).height() / 2);
};

function responsive(){
	var winHeight = $(window).height();

	if(winHeight >= 720){
			$("body").removeClass("min");
			$("body").removeClass("medium");
		}
		else if(winHeight < 720 && winHeight > 620){
			$("body").addClass("medium");
			$("body").removeClass("min");
		}else if(winHeight < 620){
			$("body").addClass("min");
			$("body").removeClass("medium");
		}
}


/*FUNCION TODAS LISTAS TENGAN MISMA ALTURA*/
function equalHeight(element){

	var height = 0;

	element.each(function(){

		if( $(this).height() > height ){

			height = $(this).height();

		}

	});

	return height;

}





$(document).ready(function(){




	//SCRIPT PARA DARLE ALTO A SECTION CONTENT Y NO ROMPA POR LA POSITION ABSOLUTE
	/*setTimeout(function(){
		var heightContent = $('section.content').height();
		var heightWindow = $(window).height();
		var positionTopContent = parseInt ( $('section.content').css('top').replace('px','') ) ;


		var altoHeader = ( $('header .header').height() ) + ( $('header .content-login-bread').height() );
		var minHeightContent = heightWindow - positionTopContent;

		console.log( minHeightContent );

		$('section.content').css('min-height',minHeightContent);

		if( heightContent <  (heightWindow - positionTopContent ) ){
			$('section.content').css('height',heightContent);
			$('section.content').css('position','fixed');
		}else{
			$('section.content').css('height',heightContent);
			//$('section.content').css('height',heightWindow - positionTopContent);
			$('section.content').css('position','absolute');
		}

	},300);
	*/


	//SCRIPT PARA DARLE ALTO A SECTION CONTENT Y NO ROMPA POR LA POSITION ABSOLUTE
	/*setTimeout(function(){
		var heightContent = $('section.content').height();
		var heightWindow = $(window).height();
		var positionTopContent = parseInt ( $('section.content').css('top').replace('px','') ) ;

		if( heightContent <  (heightWindow - positionTopContent) ){

			$('section.content').css('height',heightContent + 100);
			$('section.content').css('position','fixed');
		}else{
			//$('section.content').css('height',heightContent);
			$('section.content').css('height', heightContent + 100);
			$('section.content').css('position','absolute');
		}

	},500);*/
	//SCRIPT PARA DARLE ALTO A SECTION CONTENT Y NO ROMPA POR LA POSITION ABSOLUTE
	/*setTimeout(function(){
		var heightContent = $('section.content').height();
		var heightWindow = $(window).height();
		var positionTopContent = parseInt ( $('section.content').css('top').replace('px','') ) ;
			//$('section.content').css('height',heightContent);
			if( (heightWindow - positionTopContent) > heightContent){
				$('section.content').css('height', heightWindow - positionTopContent + 40);
			}else{
				$('section.content').css('height', heightContent + 40);
			}

			$('section.content').css('position','absolute');
	},500);
	*/

	//SCRIPT PARA DARLE ALTO A SECTION CONTENT Y NO ROMPA POR LA POSITION ABSOLUTE
	setTimeout(function(){
		var heightContent = $('section.content').height();
		var heightWindow = $(window).height();
		var positionTopContent = parseInt ( $('section.content').css('top').replace('px','') ) ;

		if( !$("body").hasClass("home") && !$("body").hasClass("no-result")){

			if( (heightWindow - positionTopContent - 55) > heightContent){
				$('section.content').css('height', heightWindow - positionTopContent + 55);
				$('section.content').css('position','fixed');
			}else{
				$('section.content').css('height', heightContent + 55);
				$('section.content').css('position','absolute');
			}
		}

	},500);


	//INICIALIZACION ESTILADO DE SELECTMENU
	$('select').selectmenu({
		transferClasses: true
	})

	//INICIALIZACION ESTILADO DE CHECKBOXES Y RADIOBUTTONS
	$('input[type="radio"],input[type="checkbox"]').ezMark();


	//CALCULAR ALTO DEL TOOLTIP DE AYUDA, POSICIONAMIENTO Y FUNCIONAMIENTO

	$('.mas-informacion').mouseenter(function(){

		$(this).find('.tooltip-info').stop(true,true).fadeIn();

		var heightTooltip = $(this).find('.tooltip-info').height();

		$(this).find('.tooltip-info').css({
			'height':heightTooltip,
			'top':-($(this).find('.tooltip-info').outerHeight() + 16)
		});
	});


	//Tooltips del sitio

	$('.tooltip-info').mouseenter(function(){
		$(this).addClass('open');
	});


	$('.mas-informacion').mouseleave(function(){

		setTimeout(function(){
			if( $('.tooltip-info').hasClass('open') ){
				return false;
			}

			$('.tooltip-info').stop(true,true).fadeOut();
		},100);


	});

	$('.tooltip-info').mouseleave(function(){
		$(this).removeClass('open');
		$(this).stop(true,true).fadeOut();
	});

	/*Fin tooltips*/




	/*RECONOCER PLACEHOLDER IE
	if(!$.support.placeholder) {
		var active = document.activeElement;
		$(':text').focus(function () {
			if ($(this).attr('placeholder') != '' && $(this).val() == $(this).attr('placeholder')) {
				$(this).val('').removeClass('hasPlaceholder');
			}
		}).blur(function () {
			if ($(this).attr('placeholder') != '' && ($(this).val() == '' || $(this).val() == $(this).attr('placeholder'))) {
				$(this).val($(this).attr('placeholder')).addClass('hasPlaceholder');
			}
		});
		$(':text').blur();
		$(active).focus();
		$('form').submit(function () {
			$(this).find('.hasPlaceholder').each(function() { $(this).val(''); });
		});
	}*/

	/*PLACEHOLDER CHROME*/
	$(function(){

	        $('input, textarea').on('focus',function(){
	            if ( $(this).attr('placeholder') ) {
	                $(this).data('placeholder', $(this).attr('placeholder'))
	                .removeAttr('placeholder');
	            }
	        }).on('blur', function(){
	            if ( $(this).data('placeholder') ) {
	                $(this).attr('placeholder', $(this).data('placeholder'))
	                .removeData('placeholder');
	            }
	        });

	});


	/*ACCORDION LEFT COL*/

	// Acordeon
	$(".acordeon h3").not(".link").bind("click",function(){

		if( $(this).hasClass("active") ){

			// Verificar si hay algun checkbox checkeado en el grupo
			var anyChecked;

			$(this).next().find(".ez-checkbox").each(function(){
				if( $(this).hasClass("ez-checked") ){
					 anyChecked = true;
				}
			});

			// Agregar clase si cierro y hay alguno chequeado
			if(anyChecked == true){
				$(this).addClass("anyChecked");
			}else{
				$(this).removeClass("anyChecked");
			}

			// remuevo class active al cerrarlo
			$(this).removeClass("active");

			// Cierro el acordeon
			$(this).next().slideUp();

		}else{
			//$(".acordeon h3").removeClass("active");
			$(this).addClass("active");

			//$(".acordeon h3").next().slideUp();
			$(this).next().slideDown();
		}
	});

	// Al contenedor del checkbox activo agregar clase para que se vea con fondo blanco
	$(".ez-checkbox").bind("click",function(){
		if( $(this).hasClass("ez-checked") ){
			$(this).parents('li').addClass('active');
		}else{
			$(this).parents('li').removeClass('active');
		}
	});


	/* FIN ACCORDION */

	//INICIAR BACKGROUND RESIZABLE

	$(window).resize(function() {
		if( $('.backgroundContent').length > 0 ){
			FullScreenBackground('.backgroundContent .slide');
		}
	});


	if( $('.backgroundContent').length > 0 ){
		setTimeout(function(){
			FullScreenBackground('.backgroundContent .slide');
		},200);

	}


})