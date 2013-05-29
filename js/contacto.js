/*
 * autors:
 * Santiago Leopardo @sleopardo
 * Fernando Leopardo @fer_leopardo
*/

;(function(window){

	$(window).load(function() {

		/*
		 * Necesita estar en visibility hidden desde el CSS para que el plugin de menu encuentre los campos.
		 * En el JS, le pongo display none, le quito el hidden y hago un fadeIn. (FadeIn no funciona con visibiliity hidden)
		*/
		$(".formulario").hide().css("visibility","visible").fadeIn();

	});




	var nombre = $('#contactForm #nombre');
	var apellido = $('#contactForm #apellido');
	var email = $('#contactForm #email');
	var ciudad = $('#contactForm #ciudad');
	var asunto = $('#contactForm #asunto');
	var mensaje = $('#contactForm #mensaje');

	var mensajeErrorNombre = $('#contactForm #nombre').parent();
	var mensajeErrorApellido = $('#contactForm #apellido').parent();
	var mensajeErrorEmail = $('#contactForm #email').parent();
	var mensajeErrorCiudad = $('#contactForm #ciudad').parent();
	var mensajeErrorAsunto = $('#contactForm #asunto').parent();
	var mensajeErrorMensaje = $('#contactForm #mensaje').parent();

	var contentError = $("#contentError");
		
	var error = false;
	var errorNombre = false;
	var errorApellido = false;
	var errorEmail = false;
	var errorCiudad = false;
	var errorAsunto = false;
	var errorConsulta = false;
	var errorMensaje = false;
	
	//Si ya hay mensajes los oculto
	contentError.html('').hide();


	$('#contactForm').bind('submit',function(event){
		event.preventDefault();
		$('p.mensajeError').remove();

		//valido nombre
		if(!(isNaN(nombre.val())) || nombre.val() == null || nombre.val().length == 0 || /^\s+$/.test(nombre.val()) || nombre.val() == nombre.attr("placeholder")) {
			error = true;
			errorNombre = true;
			nombre.addClass("error");
			mensajeErrorNombre.append('<p class="mensajeError">*Complete el campo correctamente</p>');
		}else{
			nombre.removeClass('error');
			mensajeErrorNombre.find('p').remove();
		}

		//valido apellido
		if(!(isNaN(apellido.val())) || apellido.val() == null || apellido.val().length == 0 || /^\s+$/.test(apellido.val()) || apellido.val() == apellido.attr("placeholder")) {
			error = true;
			errorNombre = true;
			apellido.addClass("error");
			mensajeErrorApellido.append('<p class="mensajeError">*Complete el campo correctamente</p>');
		}else{
			apellido.removeClass('error');
			mensajeErrorNombre.find('p').remove();
		}

		//valido email
		if (!(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email.val())) || email.val() == email.attr("placeholder")) {
			error = true;
			errorEmail = true;
			email.addClass("error");
			mensajeErrorEmail.append('<p class="mensajeError">*Complete el campo correctamente</p>');
		}else{
			email.removeClass('error');
			mensajeErrorNombre.find('p').remove();
		}

		//valido ciudad
		if(ciudad.val() == $("#ciudad option")[0].text){
			error = true
			errorCiudad = true;
			$(".ui-selectmenu").addClass('error');
			mensajeErrorCiudad.append('<p class="mensajeError">*Complete el campo correctamente</p>');
		}else{
			$(".ui-selectmenu").removeClass('error');
			mensajeErrorNombre.find('p').remove();	
		}

		//valido asunto
		if(asunto.val() == $("#asunto option")[0].text){
			error = true
			errorAsunto = true;
			$(".ui-selectmenu").addClass('error');
			mensajeErrorAsunto.append('<p class="mensajeError">*Complete el campo correctamente</p>');
		}else{
			$(".ui-selectmenu").removeClass('error');
			mensajeErrorNombre.find('p').remove();	
		}

		//valido mensaje
		if(mensaje.val().length <= 10) {
			error = true;
			errorMensaje = true;
			mensaje.addClass("error");
			mensajeErrorMensaje.append('<p class="mensajeError">*Complete el campo correctamente</p>');
		}else{
			mensaje.removeClass('error');
			mensajeErrorNombre.find('p').remove();
		}

	})

})(window);