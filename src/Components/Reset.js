import React from "react"

export default function Reset ({bestResult, setBestResult}){
return <div>
        {!bestResult ? "" 
            : <p className="rules"> Current best result is {bestResult}%.</p>}
        <p className="rules"> QuizApp stores the best result on this device even if the device is rebooted</p>
        <p className="rules"> But if you want to reset this result, just click on the button below</p>
        <button className="button" disabled={!bestResult} onClick={()=>setBestResult(0)}>Reset the best result</button>
        {bestResult ? "" 
            : <p className="reset"> The button is disabled, because your current best result is already {bestResult}%. </p>}
    </div>
}