<?php

    $address = "https://www.urionlinejudge.com.br/judge/en/categories";
	$result = array();

	$num_exercises = 0;

	$doc = new DomDocument;
	$doc->validateOnParse = true;
	$doc->loadHtml(file_get_contents($address));
	$problems_data_div = $doc->getElementById('category-list');

    $problems_data_div->getElementsByTagName('li');

    $li_content = $problems_data_div->childNodes[1]->childNodes[18];

	if($li_content != NULL){
		$matches = array();
		$num_exes_text = $li_content->nodeValue;
        //print_r($num_exes_text);
		preg_match('/[0-9]+/', $num_exes_text, $matches);
		$num_exercises = $matches[0];
	}
	else{
		$num_exercises = 1;
	}

	$result["num_exercises"] = $num_exercises;

    header('Content-Type: application/json');
	echo json_encode($result);
?>