import React, { useState, useEffect } from 'react';
import TimerControl from './TimerControl';
import DisplayTimer from './DisplayTimer';
import './timer-style.css';

import { FaPlay, FaPause } from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';

import { getMinutes, getMinutesFromSeconds } from '../utils/utilGetSecunds';

export default function Timer() {
    const initialParameters = {
        seconds: 1500,
        valueBreak: 300,
        // sessionLength: 1500,
        playIsPressed: false,
    };
    const [valueBreak, setValueBreak] = useState(initialParameters.valueBreak);
    // const [sessionLength, setSessionLength] = useState(initialParameters.sessionLength);
    const [seconds, setSeconds] = useState(initialParameters.seconds);
    const [playIsPressed, setPlayIsPressed] = useState(
        initialParameters.playIsPressed,
    );

    const resetTimer = () => {
        setValueBreak(initialParameters.valueBreak);
        // setSessionLength(initialParameters.sessionLength);
        setSeconds(initialParameters.seconds);
        setPlayIsPressed(initialParameters.playIsPressed);
    };

    useEffect(() => {
        if (playIsPressed) {
            const timeInterval = setInterval(() => {
                setSeconds(seconds - 1);
            }, 1000);

            return () => {
                clearInterval(timeInterval);
            };
        }
    }, [seconds, playIsPressed]);

    const handlerPlayButtonClick = () => {
        setPlayIsPressed((currSing) => (!currSing ? true : false));
    };

    const displayTimerValues = () => {
        const min = getMinutesFromSeconds(seconds).minutes;
        const sec = getMinutesFromSeconds(seconds).seconds;
        return min + '  :  ' + sec;
    };

    const incrementValue = (setValue, value) => {
        console.log('incrementValue   ', value);
        setValue(value + 60);
    };
    const decrementValue = (setValue, value) => {
        console.log('decrementValue   ', value);
        setValue(value - 60);
    };

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
                        valueLength={getMinutes(valueBreak)}
                        incrementValue={() =>
                            incrementValue(setValueBreak, valueBreak)
                        }
                        decrementValue={() =>
                            decrementValue(setValueBreak, valueBreak)
                        }
                    />
                    <TimerControl
                        labelID={'session-label'}
                        labelName="Session Length"
                        decrementIdLabel="session-decrement"
                        incrementIdLabel="session-increment"
                        labelIdLength="session-length"
                        valueLength={getMinutes(seconds)}
                        incrementValue={() =>
                            incrementValue(setSeconds, seconds)
                        }
                        decrementValue={() =>
                            decrementValue(setSeconds, seconds)
                        }
                    />
                </div>
                <div className="timer">
                    <div id="timer-label"> Session </div>
                    <DisplayTimer
                        seconds={seconds}
                        displayTimerValues={displayTimerValues()}
                    />
                </div>
                <div className="timer-control">
                    <button
                        id="start_stop"
                        className="button-with-icon"
                        onClick={handlerPlayButtonClick}
                    >
                        {!playIsPressed ? (
                            <FaPlay className="icon-style" />
                        ) : (
                            <FaPause className="icon-style" />
                        )}
                    </button>
                    <button
                        id="reset"
                        className="button-with-icon"
                        onClick={resetTimer}
                    >
                        <TbRefresh
                            id="reset-animation"
                            className="icon-style"
                        />
                    </button>
                </div>
            </div>
        </div>
    );
}
