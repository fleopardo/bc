
	// Inicializa el carousel del submenu Sitios YPF
	$('.jcarousel-playlist').removeClass("mask").jcarousel({
		scroll: 1,
		start : 1
	});

	//Instancio el player y cargo el primer video de la playlist para reproducir.

	var videoInicialDescripcion = $(".jcarousel-playlist li a:first").attr("data-descripcion"),
		videoInicialPelicula = $(".jcarousel-playlist li a:first").attr("href");

	//$(".videoDescripcion").html(videoInicialDescripcion);

	jwplayer("mediaplayer").setup({
			flashplayer: "./videoplayer/player.swf",
			file: videoInicialPelicula,
			image: "./images/poster_video_home2.jpg",
			skin: './videoplayer/glow.zip'
		});


	//On click del playlist actualizo la descripcion y reemplazo el video.
	$(".jcarousel-playlist li a").bind("click",function(event){

		event.preventDefault();
		event.stopPropagation();

		var descripcion = $(this).attr("data-descripcion"),
			video = $(this).attr("href");

		var videoPortada = $(this).children('img').attr('src');

		$(".videoDescripcion").html(descripcion);

		jwplayer("mediaplayer").setup({
			flashplayer: "./videoplayer/player.swf",
			file: video,
			image: videoPortada,
			skin: './videoplayer/glow.zip'
		});

	});