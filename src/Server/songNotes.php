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
        if(isset($_GET['gig_id'])) {
            $outp = getSongNotes($conn, $_GET['gig_id']);
            $conn->close();
            echo($outp);    
        } else if(isset($_GET['id']) && isset($_GET['user_uid'])) {
            $outp = getSongNote($conn, $_GET['id'], $_GET['user_uid']);
            $conn->close();
            echo($outp);    
        }
        
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

function getSongNotes($connection, $gig_id) {
    
    $result = $connection->query(
        "SELECT song_note.id as id, 
        user_uid as user_uid, 
        gig.id as gig_id, 
        gig.venue as gig_venue,
        gig.date as gig_date,
        song.id as song_id, 
        song.name as song_name, 
        song.artist as song_artist 
        FROM song_note 
        JOIN song ON song_note.song_id = song.id 
        JOIN gig ON song_note.gig_id = gig.id 
        WHERE gig.id = $gig_id");
    
    $outp = "";
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
      if ($outp != "") {$outp .= ",";}
      $outp .= '{"id":"'  . $rs["id"] . '",';
	  $outp .= '"user":"'  . $rs["user_uid"] . '",';
	  $outp .= '"gig":{"id": "'.$rs["gig_id"].'", "date": "'.$rs["gig_date"].'", "venue": "'.$rs["gig_venue"].'"},';
	  $outp .= '"song":{"id": "'.$rs["song_id"].'", "name": "'.$rs["song_name"].'", "artist": "'.$rs["song_artist"].'"}}';
    }
    #$outp ='{"songs":['.$outp.']}';
    $outp ='['.$outp.']';
    return $outp;
}

function getSongNote($connection, $id, $user_uid) {
    
    $result = $connection->query(
        "SELECT song_note.id as id, 
        song_note.user_uid as user_uid, 
        gig.id as gig_id, 
        gig.venue as gig_venue,
        gig.date as gig_date,
        song.id as song_id, 
        song.name as song_name, 
        song.artist as song_artist 
        FROM song_note 
        JOIN song ON song_note.song_id = song.id 
        JOIN gig ON song_note.gig_id = gig.id
        WHERE song_note.id = $id
        AND song_note.user_uid = $user_uid");
    
    $outp = "";
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
      if ($outp != "") {$outp .= ",";}
      $outp .= '{"id":"'  . $rs["id"] . '",';
	  $outp .= '"user":"'  . $rs["user_uid"] . '",';
	  $outp .= '"gig":{"id": "'.$rs["gig_id"].'", "date": "'.$rs["gig_date"].'", "venue": "'.$rs["gig_venue"].'"},';
	  $outp .= '"song":{"id": "'.$rs["song_id"].'", "name": "'.$rs["song_name"].'", "artist": "'.$rs["song_artist"].'"}}';
    }
    #$outp ='{"songs":['.$outp.']}';
    #$outp ='['.$outp.']';
    return $outp;
}

?>