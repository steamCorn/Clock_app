import React, { useState, useEffect } from 'react';
import TimerControl from './TimerControl';
import DisplayTimer from './DisplayTimer';
import './timer-style.css';

import { FaPlay, FaPause } from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';

import {getRemainingTimeInSeconds} from '../utils/utilGetSecunds';

export default function Timer() {
    const initialParameters = { 
        "seconds": 59,
        // "minutes": 25, 
        "valueBreak": 5,
        "playIsPressed": false 
    }
    const [valueBreak, setValueBreak] = useState(initialParameters.valueBreak);
    // const [minutes, setMinutes] = useState(initialParameters.minutes);
    const [seconds, setSeconds] = useState(initialParameters.seconds);
    const [playIsPressed, setPlayIsPressed] = useState(initialParameters.playIsPressed);

    const resetTimer = () => {
        setValueBreak(initialParameters.valueBreak);
        // setMinutes(initialParameters.minutes);
        setSeconds(initialParameters.seconds);
        setPlayIsPressed(initialParameters.playIsPressed);
    }

    useEffect(() => {
        if(playIsPressed){
            const timeInterval = setInterval( () => {
                console.log("useEffect run countdown if play is pressed");
                setSeconds(seconds - 1);
            }, 1000);

            // https://devtrium.com/posts/set-interval-react
            // it has answer why return is needed

            return ()=> {
                clearInterval(timeInterval)
            };
            
        }
    }, [seconds, playIsPressed])

    const handlerPlayButtonClick = () => {
        setPlayIsPressed((currSing) => (!currSing ? true : false));
        console.log("playIsPressed   ",!playIsPressed);
    }

    const displayTimerValues = () => {
        // return minutes + " : " + seconds;
        return seconds;
    }

    const incrementValue = (setValue, value) => {
        console.log("incrementValue   ", value);
        setValue(value + 1)
    }
    const decrementValue = (setValue, value) => {
        console.log("decrementValue   ", value);
        setValue(value - 1)
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
                        incrementValue={() => incrementValue(setValueBreak, valueBreak)}
                        decrementValue={() => decrementValue(setValueBreak, valueBreak)}
                    />
                    <TimerControl
                        labelID={'session-label'}
                        labelName="Session Length"
                        decrementIdLabel="session-decrement"
                        incrementIdLabel="session-increment"
                        labelIdLength="session-length"
                        // valueLength={minutes}
                        valueLength={seconds}
                        // incrementValue={() => incrementValue(setMinutes, minutes)}
                        // decrementValue={() => decrementValue(setMinutes, minutes)}
                        incrementValue={() => incrementValue(setSeconds, seconds)}
                        decrementValue={() => decrementValue(setSeconds, seconds)}
                    />
                </div>
                <div className="timer">
                    <div id="timer-label"> Session </div>
                    <DisplayTimer 
                        seconds = {seconds}
                        displayTimerValues = {displayTimerValues()} 
                    />
                </div>
                {/* <div>
                    <h4>Total secunds</h4>
                    {getRemainingTimeInSeconds(minutes)}
                </div> */}
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
                    <button id="reset" className="button-with-icon" onClick={resetTimer}>
                        <TbRefresh  id="reset-animation" className="icon-style" />
                    </button>
                </div>
            </div>
        </div>
    );
}