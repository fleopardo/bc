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

		boxes_search.renderOptions(provincias,elementToAppend, "provincias");

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

			html += '<option value="'+	data[index] + '">'+	data[index].toLowerCase(); + '</option>';

		});

		elementToAppend.append(html);

		$("select").selectmenu("destroy").selectmenu({ style: "dropdown" });

	}



	// RENDER RESULTS

	boxes_search.renderResults = function(data, localidad_elegida, elementToAppend){

		var html = '';

		$.each(data, function( index, value ){


			if(data[index].LOCALIDAD == localidad_elegida){

				html += '<li>' + data[index].RAZON_SOCIAL + ' - ' + data[index].DIRECCION + '<br />' + data[index].PARTIDO + ' - ' + data[index].LOCALIDAD + '</li>';

			}

		});

		console.log(html);
		console.log($(elementToAppend));
		$(elementToAppend).append(html);

	}

	window.boxes_search = boxes_search;


}(this));



;(function(){

	var select_provincias = $("#provincia");

	var select_partidos = $("#partido");

	var select_localidades = $("#localidad");

	var submit = $("#buscarBoxes");

	var form_busqueda = $(".busqueda-boxes");

	var contenedor_resultados = $(".resultado-busqueda");



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

			submit.prop("disabled",true).removeClass("active");

		});


		// bindeo eventos a los partidos

		select_partidos.on("change", function(event){

			var value = $(this).find("option:selected").val();

			if (value == "default") {

				select_localidades.prop("disabled",true).empty();

				submit.prop("disabled",true).removeClass("active");

				return;

			}

			boxes_search.getLocalidades(data,value,select_localidades);

			select_localidades.prop("disabled",false);

			submit.prop("disabled",true).removeClass("active");

		});

		// bindeo eventos a las localidades

		select_localidades.on("change", function(event){

			var value = $(this).find("option:selected").val();

			if (value == "default") {

				submit.prop("disabled",true).removeClass("active");

				return;

			}

			submit.prop("disabled",false).addClass("active");

		});


		// Bindeo submit

		form_busqueda.on("submit", function(event){

			event.stopPropagation();

			event.preventDefault();

			var localidad_elegida = select_localidades.find("option:selected").val();

			// Imprimo los resultados
			boxes_search.renderResults(data, localidad_elegida, contenedor_resultados.find("ul"));

			// Muestro los resultados
			form_busqueda.fadeOut("fast", function(){

				contenedor_resultados.fadeIn();

			});

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
