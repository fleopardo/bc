(function(){

	var $trigger = $("[data-js='cargar-mas-resultados']"),
		$container = $("[data-js='resultados-listado']"),

		/* template simulado */
		__commentTemplate = '<article class="resultado-item">' +
			'<img src="images/resultados/resultado-mock.jpg">' +
			'<p class="result-type"><span class="icon panoramica"></span>panoramica</p>' +
			'<a href="#" class="result-view-map"><span class="icon"></span>Ver en el mapa</a>' +
			'<a href="#" class="likes">50</a>' +
			'<div class="text">' +
				'<h4><a href="#">Lorem ipsum dolor sit amet</a></h4>' +
				'<p>Consectetur adipiscing elit. Fusce sit amet ornare velit, vel dapibus felis. Mauris commodo tpat. Cras rutrum nunc ac velit elementum, nec mattis arcu posuere. Nulla facilisi.</p>' +
			'</div>' +
		'</article>';

	if ($trigger.length > 0) {
		$trigger.on('click', function(event) {
			event.preventDefault();
			$container.append(__commentTemplate);
		});
	}

}());