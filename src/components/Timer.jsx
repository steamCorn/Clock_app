import React, { useState, useEffect, useRef } from 'react';
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
        breakLength: 5,
        sessionLength: 25,
        playIsPressed: false,
        timerType: "session"
    };
    const [breakLength, setBreakLength] = useState(initialParameters.breakLength);
    const [sessionLength, setSessionLength] = useState(initialParameters.sessionLength);
    const [seconds, setSeconds] = useState(initialParameters.seconds);
    const [playIsPressed, setPlayIsPressed] = useState(
        initialParameters.playIsPressed,
    );
    const [timerType , setTimerType] = useState(initialParameters.timerType);

    const audioSound = useRef(null);

    useEffect(() => {
        if (playIsPressed) {
            const timeSession = setInterval(() => {
                setSeconds(seconds - 1);
            }, 1000);

            if(seconds == 0){
                playAudio();

                // console.log('Change type timer');

                setTimerType( timerType=="session" ? "break" : "session");

                if(timerType == "session"){
                    // it's a little confusing here
                    // console.log('Start new timer BREAK');
                    setSeconds(getSeconds(breakLength));
                }

                if(timerType == "break"){
                    // it's a little confusing here
                    // console.log('Start new timer SESSION');
                    setSeconds(getSeconds(sessionLength));
                }
            }
            return () => clearInterval(timeSession);
        } 
    }, [seconds, playIsPressed, timerType]);


    // console.log(timerType);

    const resetTimer = () => {
        setBreakLength(initialParameters.breakLength);
        setSessionLength(initialParameters.sessionLength);
        setSeconds(initialParameters.seconds);
        setPlayIsPressed(initialParameters.playIsPressed);
        stopAudioPlaying()
    };

    const playAudio = () => {
        audioSound.loop = true;
        audioSound.current.play();
        setTimeout(()=>stopAudioPlaying(), 3500);
    }

    const stopAudioPlaying = () => {
        audioSound.current.pause();
    }

    const handlerPlayButtonClick = () => {
        setPlayIsPressed((currSing) => (!currSing ? true : false));
    };

    const incrementBreak = () => {
        if(breakLength < 60){
            // console.log('incrementBreak   ');
            setBreakLength(breakLength + 1);
        } else {
            // console.log('incrementBreak   >= 60');
            return false
        };
    }

    const decrementBreak = () => {
        if(breakLength > 1 ){
            // console.log('decrementBreak   ');
            setBreakLength(breakLength - 1);
        } else {
            // console.log('decrementBreak ', breakLength);
            return false
        };   
    }

    const incrementSession = () => {
        if(sessionLength < 60 && seconds < 3600){
            setSessionLength(sessionLength + 1);
            // setSeconds(seconds + 60);
            setSeconds(getSeconds(sessionLength) + 60);
        } else {
            return false
        };
    }
    const decrementSession = () => {
        if(sessionLength > 1 && seconds > 119){
            setSessionLength(sessionLength - 1);
            // setSeconds(seconds - 60);
            setSeconds(getSeconds(sessionLength) - 60);
        } else if (sessionLength > 1 && seconds < 119){
            setSessionLength(sessionLength - 1);
        } else {
            return false
        };  
    }

 
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
                        valueLength={breakLength}
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

                    <audio id="beep" preload="auto" ref={audioSound}>
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
