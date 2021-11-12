import React from "react"
import { minutesToDuration } from "../utils/duration"
// import proptypes

function TimeSetters({ session, focusDuration, changeFocus, breakDuration, changeBreak, isTimerRunning }) {

    return (
        <div className="row">
            <div className="col">
                <div className="input-group input-group-lg mb-2">
                    <span className="input-group-text" data-testid="duration-focus">
                    {/* Update this text to display the current focus session duration */}
                    Focus Duration: {minutesToDuration(focusDuration)}
                    </span>       
                    <div className="input-group-append">
                    {/* Implement decreasing focus duration and disable during a focus or break session */}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-testid="decrease-focus"
                            disabled={session}
                            onClick={isTimerRunning ? null : () => changeFocus(false)}
                        >
                            <span className="oi oi-minus" />
                        </button>
                        {/* Implement increasing focus duration  and disable during a focus or break session */}
                        <button
                            type="button"
                            className="btn btn-secondary"
                            data-testid="increase-focus"
                            disabled={session}
                            onClick={isTimerRunning ? null : () => changeFocus(true)}
                        >
                            <span className="oi oi-plus" />
                        </button>
                    </div>
                </div>
            </div>       
            <div className="col">
                <div className="float-right">
                    <div className="input-group input-group-lg mb-2">  
                        <span className="input-group-text" data-testid="duration-break">
                            {/* Update this text to display the current break session duration */}
                            Break Duration: {minutesToDuration(breakDuration)}
                        </span>
                        <div className="input-group-append">
                            {/* TODO: Implement decreasing break duration and disable during a focus or break session*/}
                            <button
                            type="button"
                            className="btn btn-secondary"
                            data-testid="decrease-break"
                            disabled={session}
                            onClick={isTimerRunning ? null : () => changeBreak(false)}
                            >
                                <span 
                                    className="oi oi-minus"
                                />
                            </button>
                            {/* Implement increasing break duration and disable during a focus or break session*/}
                            <button
                            type="button"
                            className="btn btn-secondary"
                            data-testid="increase-break"
                            disabled={session}
                            onClick={isTimerRunning ? null : () => changeBreak(true)}
                            >
                                <span 
                                    className="oi oi-plus"
                                />
                            </button>
                        </div>
                    </div>
                </div>
            </div>      
        </div>
    )
}

// proptypes

export default TimeSetters