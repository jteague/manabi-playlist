<?php
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: Content-Type");
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
    #$conn->close();
    #return;
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
		$getJson = json_decode($_POST['songNote']);
		updateSongNote($conn, $getJson);
        break;
    case "delete":
        echo("delete is not implemented");
        break;
    default:
		mylog("songNotes.php::operation = '$operation'");
		$putdata = file_get_contents('php://input');
        if(isset($putdata)) {
			mylog("putdata: $putdata");
			$getJson = json_decode($putdata, false);
			updateSongNote($conn, $getJson);
		} else {
			mylog("no putdata");
		}
		
        break;
}

#-------------------------------------------------------------------------------
# Functions that house the queries:
#-------------------------------------------------------------------------------

function updateSongNote($connection, $songNote) {
	
	// some error checking
	if(!$songNote) {
		mylog("updateSongNote::Empty songNote object");
		return;
	}
	
	if(!property_exists($songNote, "id")) {
		mylog("updateSongNote::Empty songNote ID");
		return;
	}
	
	$id = $songNote->id;
	if(!$id) {
		mylog("updateSongNote::Unable to get songNote ID");
		return;
	}
	
	// create the update query
	$query = "UPDATE song_note SET ";
	
	if(property_exists($songNote, "notes")) {
		$notes = cleanInText($connection, $songNote->notes);
		$query .= " notes = '$notes', ";
	}
	if(property_exists($songNote, "badHorns")) {
		$badHorns = $songNote->badHorns == 1 ? 1 : 0;
		$query .= " bad_horns = '$badHorns', ";
	}
	if(property_exists($songNote, "badRhythm")) {
		$badRhythm = $songNote->badRhythm == 1 ? 1 : 0;
		$query .= " bad_rhythm = '$badRhythm', ";
	}
	if(property_exists($songNote, "badStart")) {
		$badStart = $songNote->badStart == 1 ? 1 : 0;
		$query .= " bad_start = '$badStart', ";
	}
	if(property_exists($songNote, "badEnd")) {
		$badEnd = $songNote->badEnd == 1 ? 1 : 0;
		$query .= " bad_end = '$badEnd', ";
	}
	
	$query = rtrim($query, ",");
	$query = rtrim($query, ", ");
	$query .= " WHERE id = $id ";
	
	mylog("updateSongNote::UPDATE query: '$query'");
	
	// update the DB
	$result = $connection->query($query);
	mylog("updateSongNote::UPDATE result: '$result'");
	
	// close DB connection
	$connection->close();
}

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
    
	$outp ='['.$outp.']';
    return $outp;
}

function getSongNote($conn, $id, $user_uid) {
    
    
	$query = "SELECT song_note.id as id, 
        song_note.user_uid as user_uid, 
        song_note.notes as notes, 
        song_note.bad_horns as bad_horns, 
        song_note.bad_rhythm as bad_rhythm, 
        song_note.bad_start as bad_start, 
        song_note.bad_end as bad_end, 
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
        AND song_note.user_uid = $user_uid";
	
	$result = $conn->query($query);
    
	$outp = "";
    while($rs = $result->fetch_array(MYSQLI_ASSOC)) {
      if ($outp != "") {$outp .= ",";}
	  
      $outp .= '{"id":"'  . $rs["id"] . '",';
	  $outp .= '"user":"'  . $rs["user_uid"] . '",';
	  $outp .= '"notes":"'  . clean($conn, $rs["notes"]) . '",';
	  
	  $outp .= '"badHorns":'  . ($rs["bad_horns"] == 1 ? "true" : "false") . ',';
	  $outp .= '"badRhythm":'  . ($rs["bad_rhythm"] == 1 ? "true" : "false") . ',';
	  $outp .= '"badStart":'  . ($rs["bad_start"] == 1 ? "true" : "false") . ',';
	  $outp .= '"badEnd":'  . ($rs["bad_end"] == 1 ? "true" : "false") . ',';
	  
	  $outp .= '"gig":{"id": "'.$rs["gig_id"].'", "date": "'.$rs["gig_date"].'", "venue": "'.clean($conn, $rs["gig_venue"]).'"},';
	  $outp .= '"song":{"id": "'.$rs["song_id"].'", "name": "'.clean($conn, $rs["song_name"]).'", "artist": "'.clean($conn, $rs["song_artist"]).'"}}';
    }
	
	return $outp;
}

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