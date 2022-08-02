import React from "react";

export default function DisplayTimer(props){
    
    return(
        <div id="time-left">
            {props.displayTimerValues}
        </div>
    )
}