import React, { useState } from 'react';
import TimerControl from './TimerControl';
import './timer-style.css';

import { FaPlay, FaPause } from 'react-icons/fa';
import { GrUpdate } from 'react-icons/gr';

export default function Timer() {
    const [valueBreak, setValueBreak] = useState(5);
    const [valueSession, setValueSession] = useState(25);

    return (
        <div className="wrapper-timer timer-style">
            <div className="timer-control-panel">
                <div className="control-panel">
                    <TimerControl
                        labelID={'break-label'}
                        labelName="Break Length"
                        decrementIdLabel="break-decrement"
                        incrementIdLabel="break-increment"
                        labelIdLength="break-length"
                        valueLength={valueBreak}
                    />
                    <TimerControl
                        labelID={'session-label'}
                        labelName="Session Length"
                        decrementIdLabel="session-decrement"
                        incrementIdLabel="session-increment"
                        labelIdLength="session-length"
                        valueLength={valueSession}
                    />
                </div>
                <div className="timer">
                    <div id="timer-label">
                        <p>Session</p>
                        <div id="time-left">25:00</div>
                    </div>
                </div>
                <div className="timer-control">
                    <button id="start_stop">
                        <FaPlay />
                        <FaPause />
                    </button>
                    <button id="reset">
                        <GrUpdate />
                    </button>
                </div>
            </div>
        </div>
    );
}
