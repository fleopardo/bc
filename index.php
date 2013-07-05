<?php
	error_reporting(0);

	$date = date("d-m-Y", strtotime("-18 year"));

	$dia = substr($date, 0, 2);
	$mes   = substr($date, 3, 2);

	if ($mes == 1) {
	$mes = "Enero";
	}
	if ($mes == 2) {
	$mes = "Febrero";
	}
	if ($mes == 3) {
	$mes = "Marzo";
	}
	if ($mes == 4) {
	$mes = "Abril";
	}
	if ($mes == 5) {
	$mes = "Mayo";
	}
	if ($mes == 6) {
	$mes = "Junio";
	}
	if ($mes == 7) {
	$mes = "Julio";
	}
	if ($mes == 8) {
	$mes = "Agosto";
	}
	if ($mes == 9) {
	$mes = "Septiembre";
	}
	if ($mes == 10) {
	$mes = "Octubre";
	}
	if ($mes == 11) {
	$mes = "Noviembre";
	}
	if ($mes == 12) {
	$mes = "Diciembre";
	}

	$ano = substr($date, -4);

	$dateFormated = $dia ." de ".$mes ." de ". $ano;

	if($_COOKIE['lat33remember']){
		header('Location: home.html');
	}
?>

<!doctype html>
<!--[if lt IE 7]> <html class="no-js lt-ie10 lt-ie9 lt-ie8 lt-ie7 ie6" lang="es"> <![endif]-->
<!--[if IE 7]>    <html class="no-js lt-ie10 lt-ie9 lt-ie8 ie7" lang="es"> <![endif]-->
<!--[if IE 8]>    <html class="no-js lt-ie10 lt-ie9 ie8" lang="es"> <![endif]-->
<!--[if IE 9]>    <html class="no-js lt-ie10 ie9" lang="es"> <![endif]-->
<!--[if gt IE 9]><!--> <html class="no-js" lang="es"> <!--<![endif]-->
<head>
	<title>Latitud 33</title>
	<meta name="description" content="">
	<meta name="keywords" content="">
	<meta charset="utf-8" />
	<meta name="HandheldFriendly" content="True">
	<meta http-equiv="cleartype" content="on">
	<meta content="width=device-width" />
	<link rel="shortcut icon" href="favicon.ico" type="image/x-icon" />

	<!--[if lt IE 9]>
		<script src="js/libs/html5.js"></script>
		<script src="js/respond.min.js"></script>
	<![endif]-->

	<link rel="stylesheet" type="text/css" href="css/global.css" />
	<link rel="stylesheet" type="text/css" href="css/prehome.css" />

</head>
<body>

	<div class="prehome contenedor clearfix">

		<img src="./img/teaser/botella2.png" width="255" height="1046" class="botella">
		<div class="columnaDerecha">
			<!--  Header
			<header>
				<h1>
					<a href="./index.html"><span class="hide">Latitud 33</span></a>
				</h1>
			</header>
			<End Header -->




			<section class="contentPage principal">

				<h2>¿Naciste<br /> antes de esta <br /><span>fecha?</span></h2>
				<p class="fecha"><?=$dateFormated;?></p>

				<ul class="acciones">
					<li><a href="./home.html" class="primary">Si</a></li>
					<li><a href="#">No</a></li>
				</ul>

				<label for="recordarme">Recordarme</label>
				<input type="checkbox" id="recordarme" />
				<p class="no-permitido">Para tener acceso a este sitio tienes que ser mayor a 18 años</p>
				<hr />

				<div class="copy">
					<p>El Abuso del alcohol es perjudicial para su salud. Latitud 33º apoya el consumo responsable de sus vinos a través de Moët Hennessy, miembro del European Forum Responsible Drinking (www.efrd.org), DISCUS (www.discus.org), CEEV (www.wineinmoderation.eu) y Enterprise &amp; Prévention (www.preventionalcool.com).</p>
					<p>Beber con moderación. Prohibida su venta a menores de 18 años.</p>
				</div>
			</section>
		</div>


	</div>

	<!--script src="js/libs/jquery.min.js"></script>
	<script src="js/libs/jquery.cycle.all.min.js"></script>
	<script src="js/libs/jquery.maximage.min.js"></script>
	<script src="js/libs/jquery.touchwipe.min.js"></script>

	<script src="js/latitud.js"></script>
	<script src="js/global.js"></script>
	<script src="js/prehome.js"></script-->


	<script>
		/* scr.js 0B 0.1.4 - 14/10/2011 - Little tiny loader for javascript sources. */
		(function(a){window.scr={js:function(o,h){if(typeof o==="string"){o=[o]}var j,k,m,l,f,g,d;j=a.getElementsByTagName("script")[0];k={t:o.length,i:0};k.r=function(){return k.t===k.i};m=function(){k.i+=1;if(h&&k.r()){h()}};l=(function(){if(j.readyState){return function(b){b.onreadystatechange=function(){if(b.readyState==="loaded"||b.readyState==="complete"){b.onreadystatechange=null;m()}}}}else{return function(b){b.onload=function(){m()}}}}());f=0;g=a.createElement("script");for(f;f<k.t;f+=1){d=g.cloneNode(true);l(d);d.src=o[f];j.parentNode.insertBefore(d,j)}}}}(document));

		scr.js("js/libs/jquery.min.js", function(){

	    	scr.js(["js/latitud.js",
	    			"js/libs/jquery.cookie.js"],function(){

		    	scr.js(["js/global.js","js/prehome.js"]);

			});

		});
	</script>

</body>
</html>