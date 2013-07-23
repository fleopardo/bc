/*
 * Header
*/

//Funcion par animar los menu del header
function rolloverHeader(element) {
	element.mouseover(function() {

		$('.header .content-login-bread').css("z-index", "998");
		$('.header .content-login-bread').css("position", "relative");

		$(this).parent().parent().find('.subnav li a').stop(true, true).show();
		$(this).parent().parent().find('.subnav').stop(true, true).slideDown();

		$(this).parent().parent().parent().addClass('select');
	});
};

$(document).ready(function(){


	/* Inicializacion de los tooltips */
	$('.tooltip').tipTip();

	/* Funcion de rollover links header */
	rolloverHeader($('.menu.lvlone li a'));

	/* Expansion caja de busqueda */
	$('#slick-toggle').click(function(event) {
		event.stopPropagation();
		event.preventDefault();

		$('#box-search').fadeToggle(500, "linear");
		$('#box-search-station').hide();
		$('#box-info').hide();
	});

	/* Focus en la barra de busqueda */
	$('#box-search input:text').addClass("idleField");

	$('#box-search input:text').focusin(function() {
	    $(this).removeClass("idleField").addClass("focusField");
		$('.go.header').css({'display':'block'})
		$('.lupa.header').css({'display':'none'})
	    if (this.value == this.defaultValue){
	        this.value = '';
	    }
	    if(this.value != this.defaultValue){
	        this.select();
	    }
	});

	/* Blur en la barra de busqueda */
	$('#box-search input:text').blur(function() {
		if ($(this).val() == '') {
			$('.lupa.header').css('display','block');
			$('.go.header').css('display','none');
			$(this).removeClass("focusField").addClass("idleField");
			if ($.trim(this.value) == '') {
				this.value = (this.defaultValue ? this.defaultValue	: '');
			}
		}
	});

	/* Funcion para cambiar al header de YPF */
	$('.tab a').click(function(){
	    $('.box-information').css("z-index", "1000");
	    $('.box-information').css("position", "relative");

	    if ( $(this).parent().hasClass('tab2') ){
	        $('.subnav').slideUp();
	        $('.run').animate({"marginLeft": "0px"}, 'slow');
	        $('.tab').removeClass('tab2');
	        $('.menu.lvltwo li a').unbind('mouseover');
	        rolloverHeader($('.menu.lvlone > li > a'));
	    }else{
	        $('.run').animate({"marginLeft": "-806px"},'500',function(){
	            $('.content-secondary').css('zIndex', '80');
	            $('.menu.lvlone li a').unbind('mouseover');
	            rolloverHeader($('.menu.lvltwo > li > a'));
	        });
	        $('.tab').addClass('tab2');
	    }

	    $('.menu').removeClass('select');
	});

	/* Animacion de submenu en header */
	$('.content-ul').mouseleave(function(){
		$('.subnav li a').stop(true, true).hide();
		$('.subnav').stop(true, true).slideUp();
		$(this).removeClass('select');
		$(this).find("li").removeClass('select');
		$('.header .content-login-bread').css("zIndex","1000");
		$('.header .content-login-bread').css("position", "relative");
	});

	$('.overflownav, ul.menu').bind({
		'mouseover': function() {
			$('.overflownav').css('height', '245px');
		},

		'mouseleave': function() {
			$('.overflownav').css('height', '114px');
		}
	});

	/* POPUS */

	//Cierro popups cuando clickeo en el document
	$(".dimmer-popups").live("click",function(event){

		$(".cart a, .login a").removeClass("active");
		$(".popup-header").fadeOut();
		$(this).remove();

	});

	var openPopup = function(trigger,popup) {

		trigger.bind("click",function(event){

				if( $(".dimmer-popups").length <= 0){
					$("body").append('<div class="dimmer-popups"></div>')
				}

				$(".cart a, .login a").removeClass("active");

				//Si clickee sobre el que esta abierto cierro todos.
				if( $(popup).is(":visible") ){
					$(".popup-header").fadeOut();
					$(".dimmer-popups").remove();
					return false;
				}else{
					//oculto todos las ventanas menos la clickeada
					$(".popup-header").fadeOut();
					trigger.addClass("active");
					$(popup).fadeIn();

					//$(this).toggleClass("active");
				}

				event.stopPropagation();
				event.preventDefault();
			});

		},
		$linkLogin = $(".box-information .login > a"),
		$linkCarrito = $(".box-information .cart > a");

	/* Abrir y cerrar popups */
	openPopup($linkLogin,"#loginModal");

	/* logearse */
	$("#loginModal .submit").bind("click",function(event){

		$linkLogin.removeClass("active");
		$linkLogin.addClass("loggedIn");

		$("#loginModal").fadeOut(function(){
			$linkLogin.removeClass("tooltip");
			$linkLogin.html("Hola, " + $("#username").val());
			$(this).remove();
			$linkLogin.unbind("click",function(){
				event.stopPropagation();
				event.preventDefault();
			});
		});

		$(".box-information .login, .box-information .login > a, .ver-puntos, .ver-puntos > a").bind({

			"mouseenter": function(){
				$('div.ver-puntos').stop(true,true).fadeIn();
			},

			"mouseout": function(){
				$('div.ver-puntos').stop(true,true).fadeOut();
			}

		});

		event.stopPropagation();
		event.preventDefault();
	});


	/* Abrir y cerrar popup carrito */
	openPopup($linkCarrito,"#cartModal");

});