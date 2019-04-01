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
        $outp = getGigs($conn);
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

function getGigs($connection) {
    
    $result = $connection->query("SELECT id, date, venue FROM gig");
    
    $outp = "";
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
      if ($outp != "") {$outp .= ",";}
      $outp .= '{"id":"'  . $rs["id"] . '",';
      $outp .= '"date":"'  . $rs["date"] . '",';
      $outp .= '"venue":"'. $rs["venue"]     . '"}';
    }
    #$outp ='{"gigs":['.$outp.']}';
    $outp ='['.$outp.']';
    return $outp;
}

?>