<?php
        
    include_once 'config.php';
    
    function get_num_pages_user($user_id, $user_module_address=USER_MODULE_ADDRESS){
    	$user_module_address .= $user_id;

    	$doc = new DomDocument;
    	$doc->validateOnParse = true;
    	$doc->loadHtml(file_get_contents($user_module_address));

    	$num_pages_elem = $doc->getElementById('table-info');
    	if($num_pages_elem != NULL){
    		$matches = array();
    		$num_pages_document = $num_pages_elem->nodeValue;
    		preg_match('/[0-9]+$/', $num_pages_document, $matches);
    		$num_pages = $matches[0];
    	}
    	else
    		$num_pages = 1;

    	return $num_pages;
    }

    function crawl_user($user_id){
		$PROBLEMS_SOLVED_BY_USER = array();
		//print_r("craw user( $user_id ) <br>");
		$num_pages = get_num_pages_user($user_id);
		for($i = 1; $i <= $num_pages; $i++){
			//print_r("Checking page: " . $i . ".. of " . $num_pages . "<br>");
			//print_r(USER_MODULE_ADDRESS . "$user_id?page=" . $i);
			$page_idx_address = (USER_MODULE_ADDRESS . "$user_id?page=" . $i);

			$doc = new DomDocument;
			$doc->validateOnParse = true;
			$doc->loadHtml(file_get_contents($page_idx_address));

			$table = $doc->getElementsByTagName('table')[0];

			//var_dump($table);
			
			$registers = $table->getElementsByTagName('tr');

			foreach ($registers as $reg) {
				$data = $reg->getElementsByTagName('td');
				
				$prob_id = str_replace(' ', '', $data[0]->nodeValue);
				$submission_position = str_replace(' ', '', $data[2]->nodeValue);
				$submission_prog_lang = $data[4]->nodeValue;
				$submission_time = str_replace(' ', '', $data[5]->nodeValue);
				$submission_date = $data[6]->nodeValue;

				$SUBS["id"] = $prob_id;
				$SUBS["pos"] = $submission_position;
				$SUBS["prog_lang"] = $submission_prog_lang;
				$SUBS["time"] = $submission_time;
				$SUBS["date"] = $submission_date;

				$PROBLEMS_SOLVED_BY_USER[$prob_id] = $SUBS;
				//print_r($SUBS);

				//array_push($PROBLEMS_SOLVED_BY_USER, $SUBS);
			}
		}
		return $PROBLEMS_SOLVED_BY_USER;
    }
    
    set_time_limit(0);
    //var_dump(crawl_user(10));

?>