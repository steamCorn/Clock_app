import React, { useState, useEffect } from 'react';
import TimerControl from './TimerControl';
import DisplayTimer from './DisplayTimer';
import './timer-style.css';

import { FaPlay, FaPause } from 'react-icons/fa';
import { TbRefresh } from 'react-icons/tb';
import beep from '../files/beep.wav';

import { getSeconds } from '../utils/utilGetSeconds';

export default function Timer() {
    const initialParameters = {
        seconds: 1500,
        valueBreak: 5,
        sessionLength: 25,
        playIsPressed: false,
        timerForBreak: false
    };
    const [valueBreak, setValueBreak] = useState(initialParameters.valueBreak);
    const [sessionLength, setSessionLength] = useState(initialParameters.sessionLength);
    const [seconds, setSeconds] = useState(initialParameters.seconds);
    const [playIsPressed, setPlayIsPressed] = useState(
        initialParameters.playIsPressed,
    );
    const [timerForBreak , setTimerForBreak] = useState(initialParameters.timerForBreak);

    const audioSound = document.getElementById('beep');

    useEffect(() => {
        if (playIsPressed) {
            const timeSession = setInterval(() => {
                setSeconds(seconds - 1);
            }, 100);

            if(seconds == 0){
                setTimerForBreak((currTimer)=> (!currTimer ? true : false));

                console.log('stop Session timer');
                playAudio();
                clearInterval(timeSession);
            }
            if(timerForBreak){
                setSeconds(getSeconds(valueBreak));
                console.log('Start new timer BREAK');
            }

            return () => clearInterval(timeSession);
        } 
    }, [seconds, playIsPressed, timerForBreak]);

    console.log(timerForBreak);

    const resetTimer = () => {
        setValueBreak(initialParameters.valueBreak);
        setSessionLength(initialParameters.sessionLength);
        setSeconds(initialParameters.seconds);
        setPlayIsPressed(initialParameters.playIsPressed);
        stopAudioPlaying()
    };

    const playAudio = () => {
        audioSound.loop = true;
        audioSound.play();
        setTimeout(()=>stopAudioPlaying(), 3500);
    }

    const stopAudioPlaying = () => {
        audioSound.pause();
    }

    const handlerPlayButtonClick = () => {
        setPlayIsPressed((currSing) => (!currSing ? true : false));
    };

    const incrementBreak = () => {
        if(valueBreak < 60){
            console.log('incrementBreak   ');
            setValueBreak(valueBreak + 1);
        } else {
            console.log('incrementBreak   >= 60');
            return false
        };
    }

    const decrementBreak = () => {
        if(valueBreak > 1 ){
            console.log('decrementBreak   ');
            setValueBreak(valueBreak - 1);
        } else {
            console.log('decrementBreak ', valueBreak);
            return false
        };   
    }

    const incrementSession = () => {
        if(sessionLength < 60 && seconds < 3600){
            setSessionLength(sessionLength + 1);
            setSeconds(seconds + 60);
        } else {
            return false
        };
    }
    const decrementSession = () => {
        if(sessionLength > 1 && seconds > 119){
            setSessionLength(sessionLength - 1);
            setSeconds(seconds - 60);
        } else if (sessionLength > 1 && seconds < 119){
            setSessionLength(sessionLength - 1);
        } else {
            return false
        };  
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
                    <DisplayTimer seconds={seconds} />

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
