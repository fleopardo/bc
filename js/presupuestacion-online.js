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

		$.each(data, function(index, value){

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

		// marca.sort();

		presupuesto.renderOptions(marca, elementToAppend, "Marca");

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

		presupuesto.renderOptions(modelos,elementToAppend, "Modelo");

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

		presupuesto.renderOptions(motores, elementToAppend, "Motor");

	}




	// RENDER OPTIONS IN SELECTS

	presupuesto.renderOptions = function(data, elementToAppend, label){

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

	var select_marcas = $("#marca"),
		select_modelos = $("#modelo"),
		select_motores = $("#motor"),
		steps = $('.steps'),
		form_busqueda = $(".form-presupuestacion-online");

	function showStep2(data) {

		var step2 = $('.step2'),
			marcaSelected = select_marcas.find('option:selected').val(),
			modeloSelected = select_modelos.find('option:selected').val(),
			motorSelected = select_motores.find('option:selected').val(),
			rowSelected;

		// actualizo los datos del step 2
		$.each(data, function( index, value ){

		    if (data[index].MARCA == marcaSelected && data[index].MODELO == modeloSelected && data[index].MOTOR == motorSelected){
		        step2.find('.lubricante').html(data[index].PRODUCTO);
				step2.find('.litros').html(data[index].LITROS_A_USAR);
				rowSelected = data[index];
		    }

		});


		// muestro el step2
		steps.hide();
		step2.show();

		step2.find('input[type="button"]').one('click', function (event) {
			showStep3(rowSelected);
		});
	}

	function showStep3(rowSelected) {
		var step3 = $('.step3');

		step3.find('.lubricante').html(rowSelected.PRODUCTO);
		step3.find('.litros').html(rowSelected.LITROS_A_USAR);
		step3.find('.precio-total').html(rowSelected.PRECIO_TOTAL);
		step3.find('.litros-remanentes').html(rowSelected.LITROS_REMANENTES);

		steps.hide();
		step3.show();

		step3.find('.nuevo-ppto').one('click', function (event) {
			event.preventDefault();

			select_marcas.find('option:first').trigger('click')

			steps.hide();
			$('.step1').show();
		});
	}

	// pido el csv y me lo guarda en una variable interna "presupuesto.data"

	presupuesto.getSCV("vehiculos.csv");

	$(window).on("scvLoad", function(){

		var data = presupuesto.data;

		// pido las provincias

		presupuesto.getMarca(data,select_marcas);

		// bindeo eventos a las marcas

		select_marcas.on("change", function(event){

			var value = $(this).find("option:selected").val();

			if (value == "default") {

				select_modelos.prop("disabled",true).empty();
				select_motores.prop("disabled",true).empty();

				presupuesto.renderOptions([],select_modelos,'Modelo');
				presupuesto.renderOptions([],select_motores,'Motor');

				$("select").selectmenu("destroy").selectmenu({ style: "dropdown" });

				return;

			}

			presupuesto.getModelo(data,value,select_modelos);

			select_modelos.prop("disabled",false);

			select_motores.prop("disabled",true).empty();
			presupuesto.renderOptions([],select_motores,'Motor');

			$("select").selectmenu("destroy").selectmenu({ style: "dropdown" });

		});


		// bindeo eventos a los modelos

		select_modelos.on("change", function(event){

			var value = $(this).find("option:selected").val();

			if (value == "default") {

				select_motores.prop("disabled",true).empty();
				presupuesto.renderOptions([],select_motores,'Motor');

				$("select").selectmenu("destroy").selectmenu({ style: "dropdown" });
				return;

			}

			presupuesto.getMotor(data,value,select_motores);
			select_motores.prop("disabled",false);

		});

		// bindeo eventos a las motores

		select_motores.on("change", function(event){

			var value = $(this).find("option:selected").val();

			if (value == "default") {
				return;
			}

			showStep2(data);

		});

	});

}());
