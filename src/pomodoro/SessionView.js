import React from "react"
import { secondsToDuration, minutesToDuration } from "../utils/duration"

function SessionView({ session, focusDuration, breakDuration, isTimerRunning }) {

    
    if (session) {   
        // Calculate the percentage complete to render the progress bar
        let percent = 0
        if (session !== null) {
            session.label === "Focusing" 
                ? percent = (1 - (session.timeRemaining / (focusDuration * 60))) * 100
                : percent = (1 - (session.timeRemaining / (breakDuration * 60))) * 100
        }
        
        return (
            <div>     
                <div className="row mb-2">       
                    <div className="col">
                        {/* Update message below to include current session (Focusing or On Break) total duration */}
                        <h2 data-testid="session-title">
                            {session.label} for {session.label === "Focusing" ? minutesToDuration(focusDuration) : minutesToDuration(breakDuration)} minutes
                        </h2>
                        {/* Update message below correctly format the time remaining in the current session */}
                        <p className="lead" data-testid="session-sub-title">
                            {secondsToDuration(session.timeRemaining)} remaining
                        </p>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col">
                        <div className="progress" style={{ height: "20px" }}>
                            <div
                                className="progress-bar"
                                role="progressbar"
                                aria-valuemin="0"
                                aria-valuemax="100"
                                aria-valuenow={percent}
                                style={{ width: `${percent}%` }}
                            />
                        </div>
                    </div>
                </div>
                <div className="row mb-2">
                    <div className="col">
                        {isTimerRunning ? null : <h2>Paused</h2>}
                    </div>
                </div>
            </div>
        )   
    } else {
        return null
    }
  
}

export default SessionView