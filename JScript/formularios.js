$(function(){


	//Mensajes de Exito

	var tituloMensajeExito = '', parrafoMensajeExito="";


	$("section.content form:not('.default')").submit(function(event){

		event.stopPropagation();
		event.preventDefault();

		$(this).append("<div class='mascaraFormularioEnviado'></div>");

		$(".mascaraFormularioEnviado").fadeIn();

		if( $("section.content").hasClass('registro-adhesion') ){

			tituloMensajeExito = 'Gracias por completar el formulario de adhesión al programa YPF SERVICLUB.'
			tituloMensajeExito = 'En 20 días recibirás tu tarjeta para comenzar a sumar puntos y disfrutar de todos los beneficios de nuestro programa.'

			//$(".header-detalle").find("h1").html(tituloMensajeExito);
			//$(".header-detalle").find("p").html(parrafoMensajeExito);

			$(".mascaraFormularioEnviado").append("<h1>"+tituloMensajeExito+"</h1>");
			$(".mascaraFormularioEnviado").append("<p>"+parrafoMensajeExito+"</p>");

		}else if( $("section.content").hasClass('perfilMisDatos') ){

			tituloMensajeExito = 'Tus datos se guardaron correctamente.';

			//$(".header-detalle").find("h1").html(tituloMensajeExito);

			$(".mascaraFormularioEnviado").append("<h1>"+tituloMensajeExito+"</h1>");
			$(".mascaraFormularioEnviado").append("<p>"+parrafoMensajeExito+"</p>");

		}else if( $("section.content").hasClass('pedirTarjeta') ){

			tituloMensajeExito = 'Reemplazar mi Tarjeta';
			parrafoMensajeExito = 'Tu nuevo número de tarjeta es: xxxx xxxx xxxx xxxx y te estará llegando a tu domicilio en 20 días. Anotá tu nuevo número de tarjeta YPF SERVICLUB para solicitar en la estación comprobantes de asignación de puntos manuales para seguir acumulando puntos.';

			//$(".header-detalle").find("h1").html(tituloMensajeExito);
			//$(".header-detalle").find("p").html(parrafoMensajeExito);

			$(".mascaraFormularioEnviado").append("<h1>"+tituloMensajeExito+"</h1>");
			$(".mascaraFormularioEnviado").append("<p>"+parrafoMensajeExito+"</p>");

		}else if( $("section.content").hasClass('restablecerContrasena') ){

			tituloMensajeExito = 'Su contraseña ha sido restablecida exitosamente';
			parrafoMensajeExito = '';

			//$(".header-detalle").find("h1").html(tituloMensajeExito);
			//$(".header-detalle").find("p").html(parrafoMensajeExito);

			$(".mascaraFormularioEnviado").append("<h1>"+tituloMensajeExito+"</h1>");
			//$(".mascaraFormularioEnviado").append("<p>"+parrafoMensajeExito+"</p>");

		}


		$(window).scrollTop(0);
	})

})