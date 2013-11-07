/* Metodos para mostrar resultados */

;(function(window, undefined){

	var boxes_search = {};




	// GET CSV

	boxes_search.getSCV = function(file){

		$.ajax(file, {

		    success: function(data) {

				var result = $.csv.toObjects(data);

				boxes_search.data = result;

				$(window).trigger("scvLoad");

		    },

		    error: function() {

		        alert("error");

		    }

		});

	}


	/* Traer provincias del documento */

	boxes_search.getProvincias = function(data, elementToAppend){


		/* array de provincias detectadas */

		var provincias = [];

		/* Flag para saber si esta repetida y no agregarla */

		var exist = false;


		elementToAppend.empty();

		/* Recorro todos los rows del excel */

		$.each(data, function( index, value ){

			var row = data[index].PROVINCIA;

			/* Por cada row me fijo si existe en el array de provincias */

			$.each(provincias, function( i, e ){

				if (provincias[i] == row ) {

					exist = true;

					return;

				}

			});

			/* Si no existe lo guardo */

			if( exist == false ) provincias.push(data[index].PROVINCIA);

			/* Reseteo la variable */

			exist = false;

		});

		provincias.sort();

		boxes_search.renderOptions(provincias,elementToAppend);

	}




	/* Traer barrios del documento segun la localidad elegida */

	boxes_search.getPartidos = function(data, provinciaSelected, elementToAppend){

		/* array de provincias detectadas */

		var partidos = [];

		/* Flag para saber si esta repetida y no agregarla */

		var exist = false;

		/* Variable para almacenar la localidad que esta iterando */

		var row;


		elementToAppend.empty();

		/* Recorro todos los rows del excel */

		$.each(data, function( index, value ){

			/* Si la provincia de este row es igual a la elegida por el user */

			if (data[index].PROVINCIA == provinciaSelected){

				row = data[index].PARTIDO;

				/* Por cada row me fijo si existe en el array de localidades */

				$.each(partidos, function( i, e ){

					if (partidos[i] == row ) {

						exist = true;

						return;

					}

				});

				/* Si no existe lo guardo */

				if( exist == false ) partidos.push(data[index].PARTIDO);

				/* Reseteo la variable */

				exist = false;

			}

		});

		partidos.sort();

		boxes_search.renderOptions(partidos,elementToAppend, "partidos");

	}




	/* Traer localidades del documento segun el partido elegida*/

	boxes_search.getLocalidades = function(data, partidoSelected, elementToAppend){

		/* array de provincias detectadas */

		var localidades = [];

		/* Flag para saber si esta repetida y no agregarla */

		var exist = false;

		/* Variable para almacenar la localidad que esta iterando */

		var row;


		elementToAppend.empty();

		/* Recorro todos los rows del excel */

		$.each(data, function( index, value ){

			/* Si la provincia de este row es igual a la elegida por el user */

			if (data[index].PARTIDO == partidoSelected){

				row = data[index].LOCALIDAD;

				/* Por cada row me fijo si existe en el array de localidades */

				$.each(localidades, function( i, e ){

					if (localidades[i] == row ) {

						exist = true;

						return;

					}

				});

				/* Si no existe lo guardo */

				if( exist == false ) localidades.push(data[index].LOCALIDAD);

				/* Reseteo la variable */

				exist = false;

			}

		});

		localidades.sort();

		boxes_search.renderOptions(localidades,elementToAppend, "localidades");

	}




	// RENDER OPTIONS IN SELECTS

	boxes_search.renderOptions = function(data, elementToAppend, label){

		var html;

		if(label) html += '<option value="default">'+label+'</option>';

		$.each(data, function( index, value ){

			html += '<option value="'+	data[index] + '">'+	data[index] + '</option>';

		});

		elementToAppend.append(html);

	}



	// RENDER RESULTS

	boxes_search.renderResults = function(data, barrio_elegido, elementToAppend){

		var html = '';

		$.each(data, function( index, value ){

			if(data[index].PARTIDO == barrio_elegido){

				html += '<ul>'+
							'<li>APIES: '+ data[index].APIES + '</li>'+
							'<li>CODIGO_POSTAL: '+ data[index].CODIGO_POSTAL + '</li>'+
							'<li>DIRECCION: '+ data[index].DIRECCION + '</li>'+
							'<li>LOCALIDAD: '+ data[index].LOCALIDAD + '</li>'+
							'<li>PARTIDO: '+ data[index].PARTIDO + '</li>'+
							'<li>PROVINCIA: '+ data[index].PROVINCIA + '</li>'+
							'<li>RAZON_SOCIAL: '+ data[index].RAZON_SOCIAL + '</li>'+
							'<li>REGISTRO_AUTOMOTOR: '+ data[index].REGISTRO_AUTOMOTOR + '</li>'+
						'</ul>';

			}

		});



		elementToAppend.append(html);

	}

	window.boxes_search = boxes_search;


}(this));



;(function(){

	var select_provincias = $("#provincia");

	var select_partidos = $("#partido");

	var select_localidades = $("#localidad");

	var submit = $("#buscar");



	// pido el csv y me lo guarda en una variable interna "boxes_search.data"

	boxes_search.getSCV("boxes.csv");

	$(window).on("scvLoad", function(){

		var data = boxes_search.data;

		// pido las provincias

		boxes_search.getProvincias(data, select_provincias);


		// bindeo eventos a las provincias

		select_provincias.on("change", function(event){

			var value = $(this).find("option:selected").val();

			if (value == "default") return;

			boxes_search.getPartidos(data,value,select_partidos);

			select_partidos.prop("disabled",false);

			select_localidades.prop("disabled",true).empty();

			submit.prop("disabled",true);

		});


		// bindeo eventos a las localidades

		select_partidos.on("change", function(event){

			var value = $(this).find("option:selected").val();

			if (value == "default") return;

			boxes_search.getLocalidades(data,value,select_localidades);

			select_localidades.prop("disabled",false);

			submit.prop("disabled",false);

		});


		// Bindeo submit

		$("form").on("submit", function(event){

			event.stopPropagation();

			event.preventDefault();


			var barrio_elegido = select_barrios.find("option:selected").val();

			boxes_search.renderResults(data, barrio_elegido, $("body"));

		})

	});


}());
