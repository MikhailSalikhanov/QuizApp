import React from "react"        

export default function Form ({numberOfQuestions, 
                                handleChangeNumber, 
                                difficultyOfQuestions, 
                                handleChangeDifficulty, 
                                bestResult}){
    return <form className='form'>
                <label className='form-item'>
                    Select number of questions:
                    <select value={numberOfQuestions} onChange={handleChangeNumber} className="select-css">
                    <option value="5">5</option>
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="25">25</option>
                    </select>
                </label>
                <label className='form-item'>
                    Select Difficulty:
                    <select value={difficultyOfQuestions} onChange={handleChangeDifficulty} className="select-css">
                    <option value="hard">hard</option>
                    <option value="medium">medium</option>
                    <option value="easy">easy</option>
                    <option value="any">any</option>
                    </select>
                </label>
                <div>Your best result is: {bestResult}%</div>
            </form>
    }