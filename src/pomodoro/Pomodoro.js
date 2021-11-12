import React, { useState } from "react";
import classNames from "../utils/class-names";
import useInterval from "../utils/useInterval";
import SessionView from "./SessionView"
import TimeSetters from "./TimeSetters"

// These functions are defined outside of the component to insure they do not have access to state
// and are, therefore more likely to be pure.

/**
 * Update the session state with new state after each tick of the interval.
 * @param prevState
 *  the previous session state
 * @returns
 *  new session state with timing information updated.
 */
function nextTick(prevState) {
  const timeRemaining = Math.max(0, prevState.timeRemaining - 1);
  return {
    ...prevState,
    timeRemaining,
  };
}

/**
 * Higher order function that returns a function to update the session state with the next session type upon timeout.
 * @param focusDuration
 *    the current focus duration
 * @param breakDuration
 *    the current break duration
 * @returns
 *  function to update the session state.
 */
function nextSession(focusDuration, breakDuration) {
  /**
   * State function to transition the current session type to the next session. e.g. On Break -> Focusing or Focusing -> On Break
   */
  return (currentSession) => {
    if (currentSession.label === "Focusing") {
      return {
        label: "On Break",
        timeRemaining: breakDuration * 60,
      };
    }
    return {
      label: "Focusing",
      timeRemaining: focusDuration * 60,
    };
  };
}

function Pomodoro() {

  // Timer starts out paused
  const [isTimerRunning, setIsTimerRunning] = useState(false);
  // The current session - null where there is no session running
  const [session, setSession] = useState(null);

  // States for focus and break durations
  const [focusDuration, setFocusDuration] = useState(25)
  const [breakDuration, setBreakDuration] = useState(5)

  /**
   * Custom hook that invokes the callback function every second
   *
   * NOTE: You will not need to make changes to the callback function
   */
  useInterval(() => {
      if (session.timeRemaining === 0) {
        new Audio("https://bigsoundbank.com/UPLOAD/mp3/1482.mp3").play();
        return setSession(nextSession(focusDuration, breakDuration));
      }
      return setSession(nextTick);
    },
    isTimerRunning ? 1000 : null
  );

  // Handles change to focus time duration between 5 and 60
  function changeFocus(increase) {
    increase 
      ? setFocusDuration((current) => Math.min(current + 5, 60)) 
      : setFocusDuration((current) => Math.max(current - 5, 5))
  }

  // Handles changes to break time between 1 and 15
  function changeBreak(increase) {
    increase
      ? setBreakDuration((current) => Math.min(current + 1, 15))
      : setBreakDuration((current) => Math.max(current - 1, 1))
  }

  /**
   * Called whenever the play/pause button is clicked.
   */
  function playPause() {
    // When play/pause button is clicked, call setIsTimerRunning with a callback function
    setIsTimerRunning((prevState) => {
      // Switch the state back and forth between true/false, default is false
      const nextState = !prevState;      
      // If next state is true, start a focus session
      if (nextState) {
        setSession((prevStateSession) => {
          // If the timer is starting and the previous session is null,
          // start a focusing session.
          if (prevStateSession === null) {
            return {
              label: "Focusing",
              timeRemaining: focusDuration * 60,
            };
          }
          return prevStateSession;
        });
      }
      // If next state is false and the timer was running when clicked, return false
      return nextState;
    });
  }

  function handleStop() {
    setIsTimerRunning(() => false)
    setSession(() => null)
  }

  return (
    <div className="pomodoro">
      <TimeSetters 
        focusDuration={focusDuration} 
        changeFocus={changeFocus} 
        breakDuration={breakDuration} 
        changeBreak={changeBreak} 
        isTimerRunning={isTimerRunning} 
        session={session} 
      />
      <div className="row">
        <div className="col">
          <div
            className="btn-group btn-group-lg mb-2"
            role="group"
            aria-label="Timer controls"
          >
            <button
              type="button"
              className="btn btn-primary"
              data-testid="play-pause"
              title="Start or pause timer"
              onClick={playPause}
            >
              <span
                className={classNames({
                  oi: true,
                  "oi-media-play": !isTimerRunning,
                  "oi-media-pause": isTimerRunning,
                })}
              />
            </button>
            <button
              type="button"
              className="btn btn-secondary"
              data-testid="stop"
              title="Stop the session"
              onClick={handleStop}
              disabled={!session}
            >
              <span className="oi oi-media-stop" />
            </button>
          
          </div>
        </div>
      </div>
      <SessionView 
        session={session}  
        focusDuration={focusDuration} 
        breakDuration={breakDuration} 
        isTimerRunning={isTimerRunning} 
      />
    </div>
  ); // End Pomodoro function
}

export default Pomodoro;