(function(){

	var $trigger = $("[data-js='cargar-mas-comentarios']"),
		$container = $("[data-js='contenedor-comentarios']"),

		/* template simulado */
		__commentTemplate = '<div class="comment-item">' +
			'<div class="rating-stars cuatro"></div>' +
			'<p class="desc">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Fusce placerat scelerisque tortor, tempus quis sagittis et, tristique sed dui.</p>' +
			'<ul class="info">' +
				'<li class="like"><a href="#">47</a></li>' +
				'<li>Esteban Bouza</li>' +
				'<li>05.12.2013  |  Buenos Aires</li>' +
			'</ul>' +
		'</div>';


	if ($trigger.length > 0) {
		$trigger.on('click', function(event) {
			event.preventDefault();
			$container.append(__commentTemplate);
		});
	}

}());