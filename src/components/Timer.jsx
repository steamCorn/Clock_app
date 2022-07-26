import React, { useState } from 'react';
import TimerControl from './TimerControl';
import './timer-style.css';

import { FaPlay, FaPause } from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';

export default function Timer() {
    const [valueBreak, setValueBreak] = useState(5);
    const [valueSession, setValueSession] = useState(25);
    const [timerDisplayValue, setTimerDisplayValue] = useState(25);

    const [playIsPressed, setPlayIsPressed] = useState(false);

    const startTimerRun = () => {
        setPlayIsPressed((currSing) => (!currSing ? true : false));
    };

    // const incrementBreak = () => {
    //     console.log("INcrement Break" );
    //     setValueBreak(valueBreak+1)
    // }

    // const incrementValue = (setting) => {
    //     console.log("INcrement   " + setting);

    // }

    // const decrementValue = (setting) => {
    //     console.log("DEcrement  " + setting);

    // }

    const runCountdown = (playIsPressed) => {
        if(playIsPressed) {

        } else return
    }

    // https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/

    return (
        <div className="wrapper-timer wrapper-timer-style">
            <div className="timer-control-panel">
                <div className="control-panel">
                    <TimerControl
                        labelID={'break-label'}
                        labelName="Break Length"
                        decrementIdLabel="break-decrement"
                        incrementIdLabel="break-increment"
                        labelIdLength="break-length"
                        valueLength={valueBreak}
                        incrementValue={() => setValueBreak(valueBreak + 1)}
                        decrementValue={() => setValueBreak(valueBreak - 1)}
                    />
                    <TimerControl
                        labelID={'session-label'}
                        labelName="Session Length"
                        decrementIdLabel="session-decrement"
                        incrementIdLabel="session-increment"
                        labelIdLength="session-length"
                        valueLength={valueSession}
                        incrementValue={() => setValueSession(valueSession + 1)}
                        decrementValue={() => setValueSession(valueSession - 1)}
                    />
                </div>
                <div className="timer">
                    <div id="timer-label">
                        Session
                        {/* Countdown Timer */}
                    </div>
                    <div id="time-left">{timerDisplayValue}</div>
                </div>
                <div className="timer-control">
                    <button
                        id="start_stop"
                        className="button-with-icon"
                        onClick={startTimerRun}
                    >
                        {!playIsPressed ? (
                            <FaPlay className="icon-style" />
                        ) : (
                            <FaPause className="icon-style" />
                        )}
                    </button>
                    <button id="reset" className="button-with-icon">
                        <TbRefresh className="icon-style" />
                    </button>
                </div>
            </div>
        </div>
    );
}
