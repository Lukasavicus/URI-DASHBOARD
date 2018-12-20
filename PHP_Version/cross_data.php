<?php

	include_once './services/crawler_provider/ws_problems_data.php';
	include_once './services/crawler_provider/ws_user_data.php';

	function join_data($user_id){
		
		$PROBLEMS = crawl_problems();
		$SUBMISSION_DATA = crawl_user($user_id);
		
		foreach ($SUBMISSION_DATA as $SD) {
			$idx = $SD["id"];
			$SUBMISSION_DATA[$idx]["problem_data"] = $PROBLEMS[$idx];

			//var_dump($SUBMISSION_DATA[$idx]);	echo "<br><br><br>";
			//print_r($SUBMISSION_DATA[$idx]["id"]); echo "<br>";

		}

		return $SUBMISSION_DATA;
	}

?>