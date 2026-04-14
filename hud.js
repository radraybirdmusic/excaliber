async function updateHUD() {
    try {
        // --- HARD-WIRE OVERRIDE START ---
        // We are bypassing the fetch to see if the screen works
        const data = {
            "current_live_round": 1,
            "system_status": "HARD-WIRED // TEST_MODE",
            "ledger_visibility": "HIDDEN",
            "assignments": { "01": ["NODE_MARSHALL"] },
            "library": { 
                "NODE_MARSHALL": { "bio": "THE OVERRIDE IS WORKING. IF YOU SEE THIS, THE PROBLEM IS THE FILE PATH." } 
            },
            "round_schedule": {
                "1": {
                    "NODE_MARSHALL": {
                        "motives": ["The Hardware is active.", "The Ghost is in the Pathing."],
                        "suspicions": ["The manifest.json is not being reached."],
                        "clues": ["Digital Skeleton Key"]
                    }
                }
            }
        };
        // --- HARD-WIRE OVERRIDE END ---

        /* // TEMPORARILY DISABLED FETCH
        const response = await fetch('./manifest.json');
        const data = await response.json();
        */
        
        const currentRound = data.current_live_round;
        const nodeName = data.assignments["01"][0]; // Forcing Node 01
        const nodeBase = data.library[nodeName];
        const schedule = data.round_schedule[currentRound][nodeName];

        document.getElementById('player-role').innerText = nodeName.replace('NODE_', '');
        document.getElementById('player-bio').innerText = nodeBase.bio;

        let motiveHTML = "";
        schedule.motives.forEach(m => { motiveHTML += `<li>${m}</li>`; });
        document.getElementById('motive-list').innerHTML = motiveHTML;
        document.getElementById('system-status').innerText = data.system_status;

    } catch (e) {
        console.error("OVERRIDE ERROR", e);
        document.getElementById('system-status').innerText = "OVERRIDE FAILED.";
    }
}

// Initial Pulse
updateHUD();
setInterval(updateHUD, 10000);

