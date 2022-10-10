import React from "react"
import { useState, useEffect } from "react"
import Answer from "./Answer"

export default function Question (props){
    let initailState = {
        0: false,
        1: false,
        2: false,
        3: false
    }
    let [isClicked, setIsClicked] = useState(initailState)
    let [alreadyChecked, setAlreadyChecked] = useState(false)

    function handleClick(e){
        setIsClicked(prevState => ({
            ...initailState,
            [e.target.id]: !prevState[e.target.id]
        }))
    }

    let answerArray = [];
    for (let i=0; i<=props.question.incorrect_answers.length; i++){
        i===props.question.incorrect_answers.length
            ? answerArray.push(<Answer text={props.question.correct_answer} 
                                        id={i} handleClick={handleClick} toCheck={props.toCheck}
                                        isClicked={isClicked} isCorrect={true}/>) 
            : answerArray.push(<Answer text={props.question.incorrect_answers[i]} 
                                        id={i} handleClick={handleClick} toCheck={props.toCheck}
                                        isClicked={isClicked} isCorrect={false}/>)
    }
    let answerArrayClone = answerArray.slice() 

    function sortByAnswers (a,b){
        if (a.props.text > b.props.text) return 1;
        if (a.props.text == b.props.text) return 0;
        if (a.props.text < b.props.text) return -1;
    }


    useEffect(() => {
    if (props.toCheck && !alreadyChecked){
        for (let key in isClicked){
            if (isClicked[key] && answerArray[key].props.text === props.question.correct_answer){
                props.setResult(prevResult => prevResult+1)
                console.log(props.question.correct_answer);
                setAlreadyChecked(true)
            }
        }
    }
}, [props.toCheck])

    return(
        <div className="questionWrapper">
            <div className="category">
                Category: {props.question.category}, difficulty: {props.question.difficulty}
            </div>
            <div className="question">
                {props.question.question}
            </div>
            <div className="answersButtons">
                 {answerArrayClone.sort(sortByAnswers)}
            </div>
            <hr />
        </div>
    )
}