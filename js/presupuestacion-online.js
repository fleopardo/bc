/* Metodos para mostrar resultados */

;(function(window, undefined){

	var presupuesto = {};

	// GET CSV

	presupuesto.getSCV = function(file){

		$.ajax(file, {

		    success: function(data) {

				var result = $.csv.toObjects(data);

				presupuesto.data = result;

				$(window).trigger("scvLoad");

		    },

		    error: function() {

		        alert("error al cargar el scv");

		    }

		});

	}


	/* Traer marcas del documento */

	presupuesto.getMarca = function(data, elementToAppend){

		/* array de marcas detectadas */

		var marca = [];

		/* Flag para saber si esta repetida y no agregarla */

		var exist = false;


		elementToAppend.empty();

		/* Recorro todos los rows del excel */

		$.each(data, function( index, value ){

			var row = data[index].MARCA;

			/* Por cada row me fijo si existe en el array de marcas */

			$.each(marca, function( i, e ){

				if (marca[i] == row ) {

					exist = true;

					return;

				}

			});

			/* Si no existe lo guardo */

			if( exist == false ) marca.push(data[index].MARCA);

			/* Reseteo la variable */

			exist = false;

		});

		marca.sort();

		presupuesto.renderOptions(marca,elementToAppend, "marca");

	}




	/* Traer modelos del documento segun la marca elegida */

	presupuesto.getModelo = function(data, marcaSelected, elementToAppend){

		/* array de modelo detectadas */

		var modelos = [];

		/* Flag para saber si esta repetida y no agregarla */

		var exist = false;

		/* Variable para almacenar el modelo que esta iterando */

		var row;


		elementToAppend.empty();

		/* Recorro todos los rows del excel */

		$.each(data, function( index, value ){

			/* Si la marca de este row es igual a la elegida por el user */

			if (data[index].MARCA == marcaSelected){

				row = data[index].MODELO;

				/* Por cada row me fijo si existe en el array de modelos */

				$.each(modelos, function( i, e ){

					if (modelos[i] == row ) {

						exist = true;

						return;

					}

				});

				/* Si no existe lo guardo */

				if( exist == false ) modelos.push(data[index].MODELO);

				/* Reseteo la variable */

				exist = false;

			}

		});

		modelos.sort();

		presupuesto.renderOptions(modelos,elementToAppend, "modelos");

	}




	/* Traer tipo de motores del documento segun el modelo elegido */

	presupuesto.getMotor = function(data, modeloSelected, elementToAppend){

		/* array de motores detectadas */

		var motores = [];

		/* Flag para saber si esta repetida y no agregarla */

		var exist = false;

		/* Variable para almacenar los motores que esta iterando */

		var row;


		elementToAppend.empty();

		/* Recorro todos los rows del excel */

		$.each(data, function( index, value ){

			/* Si el modelo de este row es igual a la elegida por el user */

			if (data[index].MODELO == modeloSelected){

				row = data[index].MOTOR;

				/* Por cada row me fijo si existe en el array de motores */

				$.each(motores, function( i, e ){

					if (motores[i] == row ) {

						exist = true;

						return;

					}

				});

				/* Si no existe lo guardo */

				if( exist == false ) motores.push(data[index].MOTOR);

				/* Reseteo la variable */

				exist = false;

			}

		});

		motores.sort();

		presupuesto.renderOptions(motores, elementToAppend, "motores");

	}




	// RENDER OPTIONS IN SELECTS

	presupuesto.renderOptions = function(data, elementToAppend, label){

		console.log(data)
		var html;

		if(label) html += '<option value="default">'+label+'</option>';

		$.each(data, function( index, value ){

			html += '<option value="'+	data[index] + '">'+	data[index].toLowerCase(); + '</option>';

		});

		elementToAppend.append(html);

		$("select").selectmenu("destroy").selectmenu({ style: "dropdown" });

	}



	// RENDER RESULTS

	presupuesto.renderResults = function(data, motor_elegida, elementToAppend){

		// var html = '';

		// $.each(data, function( index, value ){


		// 	if(data[index].LOCALIDAD == localidad_elegida){

		// 		html += '<li>' + data[index].RAZON_SOCIAL + ' - ' + data[index].DIRECCION + '<br />' + data[index].PARTIDO + ' - ' + data[index].LOCALIDAD + '</li>';

		// 	}

		// });

		// $(elementToAppend).append(html);

	}

	window.presupuesto = presupuesto;

}(this));



;(function(){

	var select_marcas = $("#marca");

	var select_modelos = $("#modelo");

	var select_motores = $("#motor");

	var form_busqueda = $(".form-presupuestacion-online");

	var contenedor_resultados = $(".resultado-busqueda");

	// pido el csv y me lo guarda en una variable interna "presupuesto.data"

	presupuesto.getSCV("lista-vehiculos.csv");

	$(window).on("scvLoad", function(){

		console.log(presupuesto.data);

		var data = presupuesto.data;

		// pido las provincias

		presupuesto.getMarca(data, select_marcas);

		// bindeo eventos a las marcas

		select_marcas.on("change", function(event){

			var value = $(this).find("option:selected").val();

			if (value == "default") {

				select_modelos.prop("disabled",true).empty();

				select_motores.prop("disabled",true).empty();

				$("select").selectmenu("destroy").selectmenu({ style: "dropdown" });

				return;

			}

			presupuesto.getModelo(data,value,select_modelos);

			select_modelos.prop("disabled",false);

			select_motores.prop("disabled",true).empty();

			$("select").selectmenu("destroy").selectmenu({ style: "dropdown" });

		});


		// bindeo eventos a los modelos

		select_modelos.on("change", function(event){

			var value = $(this).find("option:selected").val();

			if (value == "default") {

				select_motores.prop("disabled",true).empty();

				$("select").selectmenu("destroy").selectmenu({ style: "dropdown" });

				return;

			}

			presupuesto.getMotores(data,value,select_motores);

			select_motores.prop("disabled",false);

		});

		// bindeo eventos a las motores

		select_motores.on("change", function(event){

			var value = $(this).find("option:selected").val();

			if (value == "default") {

				return;

			}

			alert('se eligio todo');

		});

		// Bindeo realizar otra busqueda

		contenedor_resultados.find("a").on("click", function(event){

			event.stopPropagation();

			event.preventDefault();

			// vacio los resultados anteriores
			contenedor_resultados.find("ul").empty();

			// Muestro el form
			contenedor_resultados.hide()

			form_busqueda.show();


		});

	});


}());
