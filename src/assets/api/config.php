<?php
define('DB_NAME', 'ionic5_db');
define('DB_USER', 'root');
define('DEB_PASSWORD', '');
define('DB_HOST', 'localhost');

define('DB_NAME2', 'a116_001_002_2020');
define('DB_USER2', 'root');
define('DEB_PASSWORD2', '');
define('DB_HOST2', 'localhost');


$mysqli = new mysqli(DB_HOST, DB_USER, DEB_PASSWORD, DB_NAME);

$mysqli2 = new mysqli(DB_HOST2, DB_USER2, DEB_PASSWORD2, DB_NAME2);

date_default_timezone_set('America/Mexico_City');
?>