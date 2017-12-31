<?php
        
    include_once 'config.php';
    
    function get_num_pages_problems($problems_module_address=PROBLEMS_MODULE_ADDRESS){
    	$doc = new DomDocument;
    	$doc->validateOnParse = true;
    	$doc->loadHtml(file_get_contents($problems_module_address));

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

    function crawl_problems(){
		$PROBLEMS = array();
		//print_r("craw problems() <br>");
		$num_pages = get_num_pages_problems();
		for($i = 1; $i <= $num_pages; $i++){
			//print_r("Checking page: " . $i . ".. of " . $num_pages . "<br>");
			$page_idx_address = (PROBLEMS_MODULE_ADDRESS . "?page=" . $i);

			$doc = new DomDocument;
			$doc->validateOnParse = true;
			$doc->loadHtml(file_get_contents($page_idx_address));

			$table = $doc->getElementsByTagName('table')[0];

			$registers = $table->getElementsByTagName('tr');

			foreach ($registers as $reg) {
				$data = $reg->getElementsByTagName('td');

				$id = str_replace(' ', '', $data[0]->nodeValue); // problem_id
				$name = trim($data[2]->nodeValue); // problem_name
				$category_text = trim($data[3]->nodeValue); // problem_category
				$solved_by_x_users = str_replace(' ', '',$data[4]->nodeValue); // problem_solved_times
				$level = str_replace(' ', '',$data[5]->nodeValue); // problem_level

				//echo "->" . $category_text . "<-";

				$categories = ["Iniciante", "Ad-Hoc", "Strings", "Estruturas e Bibliotecas", "Matemática", "Paradigmas", "Grafos", "Geometria Computacional", "SQL"];

				//$category  = array_search($category_text, $categories) - 1;

				$PROB["id"] = $id;
				$PROB["name"] = $name;
				$PROB["category"] = $category_text;
				$PROB["solved"] = $solved_by_x_users;
				$PROB["level"] = $level;

				$PROBLEMS[$id] = $PROB;

				//array_push($PROBLEMS, $PROB);
			}
		}

		return $PROBLEMS;
    }
    
    set_time_limit(0);
    //var_dump(crawl_problems());

?>