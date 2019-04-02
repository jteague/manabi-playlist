<?php
#$putdata = fopen("php://input", "r");
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
		#$getJson = json_decode(file_get_contents("php://input"), false);
		#$getJson = json_decode($_GET['songNote'], false);
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
			//mylog("getJson: $getJson");
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
	
	if(!$songNote) {
		mylog("empty songNote");
		return;
	}
	
	$id = $songNote->songNote->id;
	if(!$id) {
		mylog("empty songNote ID");
		return;
	}
	
	$query = "UPDATE song_note SET ";
	if($songNote->songNote->notes) {
		$notes = $songNote->songNote->notes;
		$query .= " notes = '$notes', ";
	}
	if($songNote->songNote->badHorns) {
		$badHorns = $songNote->songNote->badHorns;
		$query .= " badHorns = '$badHorns', ";
	}
	if($songNote->songNote->badRhythm) {
		$badRhythm = $songNote->songNote->badRhythm;
		$query .= " badRhythm = '$badRhythm', ";
	}
	if($songNote->songNote->badStart) {
		$badStart = $songNote->songNote->badStart;
		$query .= " badStart = '$badStart', ";
	}
	if($songNote->songNote->badEnd) {
		$badEnd = $songNote->songNote->badEnd;
		$query .= " badEnd = '$badEnd', ";
	}
	$query = rtrim($query, ",");
	$query = rtrim($query, ", ");
	$query .= " WHERE id = $id ";
	
	mylog("query: $query");
	
	$result = $connection->query($query);
	mylog("update query result: $result");
	
	#$outp = $result->fetch_all(MYSQLI_ASSOC);
	#mylog("update query result as outp: $outp");
	#mylog("update query result as json: " .  json_encode($outp));
	
	$connection->close();
	#echo json_encode($outp);
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
    
	return $outp;
}

function mylog($message) {
	error_log("$message\n", 3, "C:\phplogs\php.log");
}

?>