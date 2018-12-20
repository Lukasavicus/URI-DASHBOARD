<?php
	/*
		Created on Tue Dec  26 16:10:06 2017
		@author: lucas
	*/
define("ADDRESS_BASE", "https://www.urionlinejudge.com.br/judge/", true);
define("LANG", "pt", true);

define("PROBLEMS_MODULE", "/problems/all", true);
define("USERS_MODULE", "/rank", true);
define("USER_MODULE", "/profile/", true);

define("PROBLEMS_MODULE_ADDRESS", (ADDRESS_BASE . LANG . PROBLEMS_MODULE), true);
define("USERS_MODULE_ADDRESS", (ADDRESS_BASE . LANG . USERS_MODULE), true);
define("USER_MODULE_ADDRESS", (ADDRESS_BASE . LANG . USER_MODULE), true);

define("HOST", "localhost", true);
define("UNIX_SOCKET", "/var/run/mysqld/mysqld.sock", true);
define("DBUSER", "root", true);
define("DBPASSWRD", "s400", true);
define("DB", "URIOJ", true);

?>