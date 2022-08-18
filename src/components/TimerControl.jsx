import React from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

export default function TimerControl(props) {
    return (
        <div className="control-bar">
            <div id={props.labelID}>{props.labelName}</div>
            <div className="grid-control-bar grid-control-bar-style">
                <button
                    className="button-with-icon"
                    id={props.decrementIdLabel}
                    onClick={props.decrementValue}
                >
                    <FaArrowDown className="timer-icon-style" />
                </button>

                <div id={props.labelIdLength}>{props.valueLength}</div>

                <button
                    className="button-with-icon"
                    id={props.incrementIdLabel}
                    onClick={props.incrementValue}
                >
                    <FaArrowUp className="timer-icon-style" />
                </button>
            </div>
        </div>
    );
}
