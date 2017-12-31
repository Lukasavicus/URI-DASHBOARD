<?php

    class EndPoint {
    
		private $URL_BASE;
		private $LANG;
		private $MODULE;
		private $SUBMODULE;
		private $PARAMS;
		private $VALUES;

		public function __construct(){
			$this->URL_BASE = "https://www.urionlinejudge.com.br/judge";
			$this->LANG = "en";
			$this->MODULE = "";
			$this->SUBMODULE = "";
			$this->PARAMS = [];
			$this->VALUES = [];
		}

		private function complete_query(){
			$query = "";
			$query_size = sizeof($this->PARAMS);
			for ($i = 0; $i < $query_size; $i++) {
				$query .= $this->PARAMS[$i] . "=" . $this->VALUES[$i];
				if($i < ($query_size - 1))
					$query .= "&";
			}
			return $query;
		}

		public function addQuery($param, $value){
			array_push($this->PARAMS, $param);
			array_push($this->VALUES, $value);
		}

		public function setQuery($param, $value){
			$this->PARAMS = [$param];
			$this->VALUES = [$value];
		}

		public function setModule($module){
			$this->MODULE = $module;
		}

		public function setSubmodule($submodule){
			$this->SUBMODULE = $submodule;
		}

		public function complete_url(){
			return $this->URL_BASE . "/" . $this->LANG . "/" . $this->MODULE . "/" . $this->SUBMODULE . "?" . $this->complete_query();
		}
		

	}
	
?>