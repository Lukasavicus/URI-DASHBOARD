<?php

	include_once './services/crawler_provider/ws_problems_data.php';
	include_once './services/crawler_provider/ws_user_data.php';

	header('Content-type: application/json');

	function print_problems_to_file($filename){
    	$DATA = crawl_problems();
    	$file = fopen($filename, "w") or die("Unable to open file!");
    	foreach($DATA as $d) {
    		fwrite($file, ($d["id"] . ";" . $d["name"] . ";" . $d["category"] . ";" . $d["solved"] . ";" . $d["level"] . "\n"));
    	}
    	fclose($myfile);
    }

	function transform_problems_data(){
		$DATA = crawl_problems();
		echo json_encode($DATA);
	}	

	transform_problems_data();

?>