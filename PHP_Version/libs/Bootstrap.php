<?php

class Bootstrap {

	protected $controller;
	protected $method;
	protected $params;

	function __construct() {
		$this->method = 'index';
		$this->redirect();
	}

	public function parseUrl(){
		
		return isset($_GET['url']) ? explode('/',filter_var(rtrim($_GET['url'], '/'), FILTER_SANITIZE_URL)) : null;
	}

	function redirect(){

		$url = $this->parseUrl();
		
		if(empty($url[0])){
			$controller_name = 'Index';
		}
		else{
			$controller_name = ucfirst($url[0]);
		}

		$filename_controller = 'controllers/' . $controller_name . '.php';

		if (file_exists($filename_controller)) {
			require_once($filename_controller);
			// Do this to use the rest of array to select method, and than parameters
			unset($url[0]);
		}
		else{
			$this->error("Controller $controller_name not founded");
		}

		$this->controller = new $controller_name;

		if(isset($url[1])){
			if (method_exists($this->controller, $url[1])) {
				$this->method = $url[1];
				// Do this to use the rest of array to select parameters
				unset($url[1]);
			}
			else{
				$this->error("The controller $controller_name doesn't have any public method called $url[1]");
			}
		}
	
		//This 'array_values($url)' command is possible because we have unseted the first and second position of this aray before
		$this->params = $url ? array_values($url) : [];

		//(new $url[0])->{$url[1]}($url[2]);
		call_user_func_array([$this->controller, $this->method], $this->params);
	}
	
	function error($msg="") {
		echo "error invoked: <br /> $msg <br />";
		require_once('controllers/Error.php');
		$controller = new ErrorController();
		$controller->index();
		return false;
	}

}