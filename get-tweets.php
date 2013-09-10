<?php
	session_start();

	require_once("./twitteroauth.php"); //Path to twitteroauth library

	$twitteruser = "YPF_com_int";
	$notweets = 30;
	$consumerkey = "G2sG827EtKNUsjtSmDDkOQ";
	$consumersecret = "tzdUvNlw0v6RH6dZwOmDkUgbRHRAVPr7tnscfDP8j8Q";
	$accesstoken = "156704378-qEQLhPEHIUTgA5CRI46jIPowZJHDxee2AnJrf800";
	$accesstokensecret = "P1HH8IrdhuDxcCfJpC1sdKKQwUgeAT1AszJGD4IHLs";


	function getConnectionWithAccessToken($cons_key, $cons_secret, $oauth_token, $oauth_token_secret) {
	  $connection = new TwitterOAuth($cons_key, $cons_secret, $oauth_token, $oauth_token_secret);
	  return $connection;
	}

	$connection = getConnectionWithAccessToken($consumerkey, $consumersecret, $accesstoken, $accesstokensecret);

	$tweets = $connection->get("https://api.twitter.com/1.1/statuses/user_timeline.json?screen_name=".$twitteruser."&count=".$notweets);

	echo json_encode($tweets);

?>