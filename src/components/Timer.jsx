import React, { useState, useEffect, useRef } from 'react';
import TimerControl from './TimerControl';
import DisplayTimer from './DisplayTimer';
import './timer-style.css';

import { FaPlay, FaPause } from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';

export default function Timer() {
    const [valueBreak, setValueBreak] = useState(5);
    const [minuts, setMinuts] = useState(25);
    const [seconds, setSeconds] = useState(60);
    const [playIsPressed, setPlayIsPressed] = useState(false);

    const resetTimer = () => {
        setValueBreak(5);
        setMinuts(25);
        setSeconds(60);
        setPlayIsPressed(false);
    }

    const runCountdown = () => {
        setIcon();
        setTimeout(() => {
            console.log("run Countdown");
            setSeconds(seconds - 1);
        }, 1000)
    };

    // const handlerPlayIsPressed = () => {
    //     const timeout = setTimeout(() => {
    //         setSeconds(seconds - 1);
    //     }, 1000);
    //     return () => clearTimeout(timeout);
    // }

    useEffect(() => {
        if(playIsPressed){
            const timeout = setTimeout(() => {
                setSeconds(seconds - 1);
            }, 1000);
            return () => clearTimeout(timeout);
        }
        
    }, [seconds])


    const setIcon = () => {
        setPlayIsPressed((currSing) => (!currSing ? true : false));
    }

    const displayTimerValues = () => {
        return minuts + " : " + seconds;
    }

    // https://www.sitepoint.com/build-javascript-countdown-timer-no-dependencies/
    // https://dev.to/zhiyueyi/how-to-create-a-simple-react-countdown-timer-4mc3

    return (
        <div className="wrapper-timer wrapper-timer-style">
            <div className="timer-control-panel">
                <h2>25+5 Clok</h2>
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
                        valueLength={minuts}
                        incrementValue={() => setMinuts(minuts + 1)}
                        decrementValue={() => setMinuts(minuts - 1)}
                    />
                </div>
                <div className="timer">
                    <div id="timer-label">
                        Session
                        {/* Countdown Timer */}
                    </div>
                    {/* <div id="time-left">{displayTimerValues()}</div> */}
                    <DisplayTimer 
                        displayTimerValues = {displayTimerValues()}
                    />
                </div>
                <div className="timer-control">
                    <button
                        id="start_stop"
                        className="button-with-icon"
                        onClick={runCountdown}
                    >
                        {!playIsPressed ? (
                            <FaPlay className="icon-style" />
                        ) : (
                            <FaPause className="icon-style" />
                        )}
                    </button>
                    <button id="reset" className="button-with-icon" onClick={resetTimer}>
                        <TbRefresh  id="reset-animation" className="icon-style" />
                    </button>
                </div>
            </div>
        </div>
    );
}