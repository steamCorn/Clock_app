import React from 'react';
import { FaArrowDown, FaArrowUp } from 'react-icons/fa';

export default function TimerControl(props) {
    return (
        <div className="control-bar">
            <div id={props.labelID}>{props.labelName}</div>
            <div className="grid-control-bar">
                <FaArrowDown id={props.decrementIdLabel} />
                <div id={props.labelIdLength}>{props.valueLength}</div>
                <FaArrowUp id={props.incrementIdLabel} />
            </div>
        </div>
    );
}
