/*
 * jqueryZoomGallery.js
*/

(function(a){var b={init:function(){return this.each(function(){var b=a(this);if(!b.data("d")){var c=b.find("img").first().css("z-index",2),d=c.width(),e=c.height(),f=c.next().css("position","absolute").css("z-index",1),g=f.width(),h=f.height();b.css("width",d).css("height",e).data("d",{imgz:f,img:c,miw:d,mih:e,maw:g,mah:h}).bind("mousemove.jqueryZoomGallery",a.proxy(function(a){var b=this.data("d"),c=10,d=Math.max(0,Math.min(1,(a.pageX-this.offset().left-c)/(b.miw-2*c))),e=Math.max(0,Math.min(1,(a.pageY-this.offset().top-c)/(b.mih-2*c)));b.imgz.css("left",(b.miw-b.maw)*d).css("top",(b.mih-b.mah)*e)},b)).bind("mouseenter.jqueryZoomGallery",a.proxy(function(a){this.data("d").img.stop().fadeTo("fast",0)},b)).bind("mouseleave.jqueryZoomGallery",a.proxy(function(){this.data("d").img.stop().fadeTo("fast",1)},b))}})}};a.fn.jqueryZoomGallery=function(a,c){if(typeof c=="undefined")return typeof a=="undefined"?b.init.call(this):b[a]?b[a].call(this):b.init.call(this,a);if(b[a])return c?b[a].call(this,c):b[a].call(this);return this}})(jQuery)

/*
 * Viewer para galeria
*/

var galeriaProducto = (function(window){

	var

	/* Lista de imagenes usadas en el carousel */

	thumbnails = $("#carousel li img"),

	/* Contenedor donde se pondra el viewer */

	contentViewer = $("#carouselViewer"),

	/* Devuelve cada posicion del viewer. Con la imagen chica y grande para luego hacer zoom */

	createTemplate = function(img,imgGrande,position){

		if( position == 0){
			position = 'class="first"';
		}else{
			position = '';
		}

		var tpl = '<li ' + position + '>'+

					'<span class="jqueryZoomGallery">'+

						'<img src="' + img + '">'+

						'<img src="' + imgGrande + '">'+

					'</span>'+

				'</li>';

		return tpl;

	},

	/* Crea el html completo para el viewer */

	createViewer = function(){

		var viewer = '';

		viewer += '<ul>';

		thumbnails.each(function(i,e){

			var img = $(this).attr("src"), imgGrande = $(this).parent().attr("href");

			viewer += createTemplate(img,imgGrande,i);

		});

		viewer += '</ul>';

		return viewer;

	},

	/* Funcion que appendea el viewer al documento e inicializa el plugin de Zoom */

	showViewer = function(){

		var html = createViewer();

		contentViewer.append(html);

	};

	return {

		init: showViewer

	}

})(window);