import React from "react"
import "./Answer.css"

export default function Answer (props){
    let classProperties = 'answer';
    
    if (props.isClicked[props.id]) {
        classProperties += " clicked"
    }
    
    if (props.isCorrect && props.toCheck){
        classProperties += " correct"
    }

    return      <button id={props.id} className={classProperties} onClick={(e)=>props.handleClick(e)}>
                        {props.text}
                </button>
}