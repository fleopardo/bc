
	// Inicializa el carousel del submenu Sitios YPF
	$('.jcarousel-playlist').removeClass("mask").jcarousel({
		scroll: 1,
		start : 1
	});

	//Instancio el player y cargo el primer video de la playlist para reproducir.

	var videoInicialDescripcion = $(".jcarousel-playlist li a:first").attr("data-descripcion"),
		videoInicialPelicula = $(".jcarousel-playlist li a:first").attr("href"),
		videoInicialTitulo = $(".jcarousel-playlist li a:first").attr("data-titulo"),
		videoInicialPoster = $(".jcarousel-playlist li a:first img").attr("src");



	$(".videoDescripcion").html(videoInicialDescripcion);
	$(".container-videos .titulo").html(videoInicialTitulo);

	//agrego el video
	$(".container-videos iframe").attr("src",videoInicialPelicula);

	//On click del playlist actualizo la descripcion y reemplazo el video.
	$(".jcarousel-playlist li a").bind("click",function(event){

		event.preventDefault();
		event.stopPropagation();

		var descripcion = $(this).attr("data-descripcion"),
			video = $(this).attr("href"),
			portada = $(this).children('img').attr('src'),
			titulo = $(this).attr('data-titulo');

		$(".videoDescripcion").html(descripcion);
		$(".container-videos .titulo").html(titulo);

		// cambio el video
		$(".container-videos iframe").attr("src",video);

	});

