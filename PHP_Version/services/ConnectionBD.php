<?php

class ConnectionBD{
	private static $conn = null;

	public static function construct(){
		if(ConnectionBD::$conn == null){
			// Create connection host - user - password - DB
			//$conn = new mysqli("localhost", "root", "s400", "SF");
			$conn = new mysqli("fdb12.biz.nf", "2100436_devdb", "Devdb@1234", "2100436_devdb");
		}
		// Check connection
		if ($conn->connect_error){
		    die("Connection failed: " . $conn->connect_error);
		}
		//echo "SUCESS"; 
		return $conn;
	}

}
?>