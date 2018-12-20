<?php


    function crawl_userdata($user_id){
    	$url = "https://www.urionlinejudge.com.br/judge/en/profile/" . $user_id;
		
		$rank_pos = 0;
		$solved = 0;
		$img_link = "";
		$username = "";

		$doc = new DomDocument;
		$doc->validateOnParse = true;
		$doc->loadHtml(file_get_contents($url));
		$profile_info_div = $doc->getElementById('profile-bar');
		$list = $profile_info_div->getElementsByTagName('li');


		$content_divs = $profile_info_div->getElementsByTagName('div');

		$img_link = $content_divs[1]->getElementsByTagName('img')[0]->getAttribute('src');

		$username = $content_divs[2]->nodeValue;
		$username = preg_replace('/[ \t]+/', ' ', preg_replace('/[\r\n]+/', "\n", $username));

		var_dump($username);

		if($list != NULL){
    		$matches = array();
    		$element = $list[0]->nodeValue;
    		preg_match('/[0-9]+/', $element, $matches);
    		$rank_pos = $matches[0];

    		$matches = array();
    		$element = $list[4]->nodeValue;
    		preg_match('/[0-9]+/', $element, $matches);
    		$solved = $matches[0];
    	}

    	$result["userid"] = $user_id;
    	$result["username"] = $username;
    	$result["name"] = $username;
    	$result["rank"] = $rank_pos;
    	$result["ac"] = $solved;
    	$result["photo_address"] = $img_link;

    	return json_encode($result);
    }

    $user_id = $_GET["userid"];

    header('Content-Type: application/json');
    echo crawl_userdata($user_id);
?>