import React from 'react';
import { getMinutesFromSeconds } from '../utils/utilGetSeconds';

export default function DisplayTimer(props) {
    const seconds = props.seconds;

    const displayDigits = (digits) => {
        if (digits < 10) {
            return '0' + digits;
        } else return digits;
    };

    const setRedStyleForTimer = () => {
        const element = document.getElementById('time-left');
        if (element) {
            if (seconds < 60) {
                element.style.color = '#b10d0d';
                element.style.textShadow = '1px 1px 2px #210707';
            } else element.style.color = '#ffffff';
        }
    };

    const displayTimerValues = () => {
        const min = getMinutesFromSeconds(seconds).minutes;
        const sec = getMinutesFromSeconds(seconds).seconds;
        setRedStyleForTimer();
        return displayDigits(min) + ':' + displayDigits(sec);
    };

    return <div id="time-left">{displayTimerValues()}</div>;
}
