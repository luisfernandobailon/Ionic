<?php
define('DB_NAME', 'ionic5_db');
define('DB_USER', 'coram');
define('DEB_PASSWORD', 'coramadministrador2008');
define('DB_HOST', 'localhost');

$mysqli = new mysqli(DB_HOST, DB_USER, DEB_PASSWORD, DB_NAME);

date_default_timezone_set('America/Mexico_City');
?>