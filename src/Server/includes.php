<?php

function cleanInText($conn, $str) {
	// For cleaning incoming text
	return mysqli_real_escape_string($conn, $str);
}

function clean($conn, $str) {
	// For cleaning outgoing text
	return str_replace("\'", "'", mysqli_real_escape_string($conn, $str));
}

function mylog($message) {
	error_log("$message\n", 3, "C:\phplogs\php.log");
}

?>