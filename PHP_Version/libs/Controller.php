<?php

class Controller {

	protected $view;

	function __construct() {
	}
	
	public function model($model) {
		$path = 'models/' . ucfirst($model). '.php';
		if (file_exists($path)) {
			require_once ($path);
			return new $model();
		}	
	}

	public function view($view, $data = []){
		require_once('views/commom/header.php');
		require_once('views/' . $view . '.php');
		require_once('views/commom/footer.php');	
	}

}