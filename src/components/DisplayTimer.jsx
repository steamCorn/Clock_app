import React from "react";

export default function DisplayTimer(props){
    const seconds = props.seconds;
    return(
        <div id="time-left">
            {props.displayTimerValues}
        </div>
    )
}