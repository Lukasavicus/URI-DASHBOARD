<?php

class View {

	function __construct($name, $noInclude = false) {
		if ($noInclude == true) {
			require 'views/' . $name . '.php';	
		}
		else {
			require 'views/commom/header.php';
			require 'views/' . $name . '.php';
			require 'views/commom/footer.php';	
		}
	}

	public function view($name, $noInclude = false){
		if ($noInclude == true) {
			require 'views/' . $name . '.php';	
		}
		else {
			require 'views/commom/header.php';
			require 'views/' . $name . '.php';
			require 'views/commom/footer.php';	
		}
	}
}