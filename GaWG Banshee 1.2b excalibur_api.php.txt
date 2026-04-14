<?php
header("Content-Type: application/json");
header("Access-Control-Allow-Origin: *");
header("Cache-Control: no-cache, must-revalidate");
header("Expires: Sat, 26 Jul 1997 05:00:00 GMT"); // Forces fresh data every pulse

$file = 'manifest.json';

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $newData = file_get_contents('php://input');
    if (!empty($newData)) {
        // Saves updates from the Admin Desk to the Manifest
        file_put_contents($file, $newData);
        echo json_encode(["status" => "SUCCESS"]);
    }
} else {
    if (file_exists($file)) {
        // Serves the current state to the HUD
        echo file_get_contents($file);
    } else {
        // Fallback if the file is missing
        $default = [
            "current_live_round" => 1, 
            "system_status" => "INITIALIZING",
            "assignments" => ["01" => ["NODE_MARSHALL"]], 
            "library" => ["NODE_MARSHALL" => ["bio" => "Character Bio"]], 
            "round_schedule" => ["1" => ["NODE_MARSHALL" => ["motives" => ["Test system"]]]]
        ];
        echo json_encode($default);
    }
}
?>
