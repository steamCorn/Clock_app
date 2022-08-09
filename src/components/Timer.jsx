import React, { useState, useEffect } from 'react';
import TimerControl from './TimerControl';
import DisplayTimer from './DisplayTimer';
import './timer-style.css';

import { FaPlay, FaPause } from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';
import beep from '../files/beep.wav';

// import { getMinutes, getMinutesFromSeconds } from '../utils/utilGetSeconds';

export default function Timer() {
    const initialParameters = {
        seconds: 1500,
        valueBreak: 5,
        sessionLength: 25,
        playIsPressed: false,
        audioPlaying: false
    };
    const [valueBreak, setValueBreak] = useState(initialParameters.valueBreak);
    const [sessionLength, setSessionLength] = useState(initialParameters.sessionLength);
    const [seconds, setSeconds] = useState(initialParameters.seconds);
    const [playIsPressed, setPlayIsPressed] = useState(
        initialParameters.playIsPressed,
    );

    const audioSound = document.getElementById('beep');
    

    const resetTimer = () => {
        setValueBreak(initialParameters.valueBreak);
        setSessionLength(initialParameters.sessionLength);
        setSeconds(initialParameters.seconds);
        setPlayIsPressed(initialParameters.playIsPressed);
        stopAudioPlaying()
    };


    const toggleAudioPlaying = () => {
        startAudioPlaying();

        setTimeout(()=>stopAudioPlaying(), 3500);
    }
    const startAudioPlaying = () => {
        console.log("start sound")
        audioSound.loop = true;
        audioSound.play();
    }
    const stopAudioPlaying = () => {
        console.log("stop sound")
        audioSound.pause();
    }

    useEffect(() => {
        if (playIsPressed) {
            const timeSession = setInterval(() => {
                setSeconds(seconds - 1);
            }, 1000);
            console.log('seconds   ', seconds);
            if(seconds === 0){
                console.log('stop timer');
                clearInterval(timeSession);
            }

            return () => {
                clearInterval(timeSession);
            };

            // runCountdownSession();
        } 
        
    }, [seconds, playIsPressed]);


    const runCountdownSession = () => {
        // const timeSession = setInterval(() => {
        //     setSeconds(seconds - 1);
        // }, 1000);
        // console.log('seconds   ', seconds);
        // if(seconds === 0){
        //     console.log('stop timer');
        //     clearInterval(timeSession);
        // }

        // return () => {
        //     clearInterval(timeSession);
        // };
    }

    const handlerPlayButtonClick = () => {
        setPlayIsPressed((currSing) => (!currSing ? true : false));
    };


    const incrementBreak = () => {
        if(valueBreak < 60  || seconds < 3600){
            console.log('incrementBreak   ');
            setValueBreak(valueBreak + 1);
        } else {
            console.log('incrementBreak   >= 60');
            return false
        };
    }

    const decrementBreak = () => {
        if(valueBreak > 1  || seconds > 60){
            console.log('decrementBreak   ');
            setValueBreak(valueBreak - 1);
        } else {
            console.log('decrementBreak ',"  = 1");
            return false
        };   
    }

    const incrementSession = () => {
        if(sessionLength < 59 || seconds < 3600){
            console.log('incrementSession   ');
            setSessionLength(sessionLength + 1);
            setSeconds(seconds + 60);
        } else {
            console.log('incrementSession ', "  >= 60");
            return false
        };
        
    }
    const decrementSession = () => {
        if(sessionLength > 1 || seconds > 60){
            console.log('decrementSession   ');
            setSessionLength(sessionLength - 1);
            setSeconds(seconds - 60);
        } else {
            console.log('decrementSession '," sessionLength < 1");
            return false
        };
        
    }

    // console.log('seconds   ', seconds);

    // const incrementValue = (setValue, value) => {
    //     if(value < 60){
    //         console.log('incrementValue   ', value);
    //         setValue(value + 1);
    //         setSeconds(seconds + 60);
    //     } else {
    //         console.log('incrementValue ', value, "  > 60");
    //         return false
    //     };
        
    // }
    // const decrementValue = (setValue, value) => {
    //     if(value > 0){
    //         console.log('decrementValue   ', value);
    //         setValue(value - 1);
    //         setSeconds(seconds - 60);
    //     } else {
    //         console.log('decrementValue ', value, "  < 0");
    //         return false
    //     }    
    // }



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
                        incrementValue={() => incrementBreak()}
                        decrementValue={() => decrementBreak()}
                    />
                    <TimerControl
                        labelID={'session-label'}
                        labelName="Session Length"
                        decrementIdLabel="session-decrement"
                        incrementIdLabel="session-increment"
                        labelIdLength="session-length"
                        valueLength={sessionLength}
                        incrementValue={() => incrementSession()}
                        decrementValue={() => decrementSession()}
                    />
                </div>
                <div className="timer">
                    <div id="timer-label"> Session </div>
                    <DisplayTimer
                        seconds={seconds}
                    />

                    <audio id="beep" preload="auto">
                        <source src={beep} type="audio/wav"/>
                    </audio>

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

                    <button onClick={toggleAudioPlaying}>{"Play"}</button>

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
