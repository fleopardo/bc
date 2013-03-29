

	// Inicializa el carousel del submenu Sitios YPF
	$('.jcarousel-playlist').removeClass("mask").jcarousel({
		scroll: 1,
		start : 1
	});

	//Instancio el player y cargo el primer video de la playlist para reproducir.


	if(shale.videoID){

		var videoInicialDescripcion = $(".jcarousel-playlist li a#"+shale.videoID).attr("data-descripcion"),
			videoInicialPelicula = $(".jcarousel-playlist li a#"+shale.videoID).attr("href"),
			videoInicialTitulo = $(".jcarousel-playlist li a#"+shale.videoID).attr("data-titulo"),
			videoInicialPoster = $(".jcarousel-playlist li a#"+shale.videoID+" img").attr("src");

	}else{

		var videoInicialDescripcion = $(".jcarousel-playlist li a:first").attr("data-descripcion"),
			videoInicialPelicula = $(".jcarousel-playlist li a:first").attr("href"),
			videoInicialTitulo = $(".jcarousel-playlist li a:first").attr("data-titulo"),
			videoInicialPoster = $(".jcarousel-playlist li a:first img").attr("src");
	}




	$(".videoDescripcion").html(videoInicialDescripcion);
	$(".container-videos .titulo").html(videoInicialTitulo);

	jwplayer("mediaplayer").setup({
			flashplayer: "./videoplayer/player.swf",
			file: videoInicialPelicula,
			image: videoInicialPoster,
			skin: './videoplayer/glow.zip'
		});


	//On click del playlist actualizo la descripcion y reemplazo el video.
	$(".jcarousel-playlist li a").bind(shale.event.TAP,function(event){

		event.preventDefault();
		event.stopPropagation();

		var descripcion = $(this).attr("data-descripcion"),
			video = $(this).attr("href"),
			portada = $(this).children('img').attr('src'),
			titulo = $(this).attr('data-titulo');

		$(".videoDescripcion").html(descripcion);
		$(".container-videos .titulo").html(titulo);

		jwplayer("mediaplayer").setup({
			flashplayer: "./videoplayer/player.swf",
			file: video,
			image: portada,
			skin: './videoplayer/glow.zip'
		});

	});

