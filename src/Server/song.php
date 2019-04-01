<?php
header("Access-Control-Allow-Origin: *");
header("Content-Type: application/json; charset=UTF-8");
require_once ("database.php");

$conn = new mysqli($db_host, $db_user, $db_pass, $db_name);
mysqli_set_charset($conn, "utf8");

if ($conn->connect_error) {
    die("Database connection failed: " . $conn->connect_error);
}

$operation = isset($_GET['operation'])
    ? mysqli_real_escape_string($conn, $_GET['operation'])
    : "";

if(!$operation) {
    $conn->close();
    return;
}

switch($operation) {
    
    case "get":
        $outp = getSongs($conn, $_GET['name_like']);
        $conn->close();
        echo($outp);
        break;
    case "insert":
        echo("insert is not implemented");
        break;
    case "update":
        echo("update is not implemented");
        break;
    case "delete":
        echo("delete is not implemented");
        break;
    default:
        echo("$operation not implemented");
        break;
}

#-------------------------------------------------------------------------------
# Functions that house the queries:
#-------------------------------------------------------------------------------

function getSongs($connection, $name_like_param) {
    $name_like = isset($name_like_param) 
        ? mysqli_real_escape_string($connection, $name_like_param) 
        :  "";
            
    if($name_like) {
        $result = $connection->query("SELECT id, name, artist FROM song WHERE name LIKE  '%$name_like%'");
    }
    else {
        $result = $connection->query("SELECT id, name, artist FROM song");
    }
    
    $outp = "";
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
      if ($outp != "") {$outp .= ",";}
      $outp .= '{"ID":"'  . $rs["id"] . '",';
      $outp .= '"Name":"'  . $rs["name"] . '",';
      $outp .= '"Artist":"'. $rs["artist"]     . '"}';
    }
    $outp ='{"songs":['.$outp.']}';
    return $outp;
}

?>