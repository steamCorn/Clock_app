import React, { useState, useEffect, useCallback } from 'react';
import TimerControl from './TimerControl';
import DisplayTimer from './DisplayTimer';
import './timer-style.css';

import { FaPlay, FaPause } from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';

export default function Timer() {
    const [valueBreak, setValueBreak] = useState(5);
    const [minuts, setMinuts] = useState(25);
    const [seconds, setSeconds] = useState(59);
    const [playIsPressed, setPlayIsPressed] = useState(false);

    const resetTimer = () => {
        setValueBreak(5);
        setMinuts(25);
        setSeconds(59);
        setPlayIsPressed(false);
    }

    //    if you have dependencies in your function, 
    //    you will have to include them in the useCallback dependencies array 
    //    and this will trigger the useEffect again if the function's params change.
    //    https://stackoverflow.com/questions/55840294/how-to-fix-missing-dependency-warning-when-using-useeffect-react-hook

    const runCountdown = useCallback(() => {
        if(playIsPressed){
            setSeconds(seconds - 1);
        }
    }, [seconds, playIsPressed]);

    useEffect(() => {
        const timeInterval = setInterval( () => {
            console.log("useEffect run countdown if play is pressed");
            runCountdown();
        }, 1000);

        return ()=> {
            clearInterval(timeInterval)
        };

    }, [ runCountdown])




    const handlerPlayButtonClick = () => {
        setPlayIsPressed((currSing) => (!currSing ? true : false));
        console.log("playIsPressed   ",!playIsPressed);
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
                    <div id="timer-label"> Session </div>
                    <DisplayTimer displayTimerValues = {displayTimerValues()} />
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
                    <button id="reset" className="button-with-icon" onClick={resetTimer}>
                        <TbRefresh  id="reset-animation" className="icon-style" />
                    </button>
                </div>
            </div>
        </div>
    );
}