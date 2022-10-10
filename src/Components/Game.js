import './Game.css';
import { useState, useEffect } from 'react';
import Question from './Question';
import preloader from '../img/Spinner.svg'
import Modal from '../Modal/Modal';
import bestSVG from '../img/best.svg'
import trySVG from '../img/TryAgain.svg'
import Form from './Form';
import useLocalStorage from '../Hooks/UseLocalStorage';

function Game({bestResult, setBestResult}) {
  console.log("render APP");
  
  const [isLoading, setIsLoading] = useState(false);
  const [isStart, setIsStart] = useState(false);
  const [questions, setQuestions] = useState([]);
  const [toCheck, setToCheck] = useState(false);
  const [result, setResult] = useState(0);
  const [numberOfQuestions, setNumberOfQuestions] = useState(10);
  const [difficultyOfQuestions, setDifficultyOfQuestions] = useState("any");
  const [isSettingsChanged, setIsSettingsChanged] = useState(false)
  const [isRestart, setIsRestart] = useState(false)
  let [isModalActive, setIsModalActive] = useState(false)
  let [modalContent, setModalContent] = useState('') 
  const [prevBestResult, setPrevBestResult] = useLocalStorage('prevBestResult', 0)

  useEffect(() => {
    if(isStart){
      if(difficultyOfQuestions === "any"){
        var url = "https://opentdb.com/api.php?amount=" + numberOfQuestions
      } else {
        var url = "https://opentdb.com/api.php?amount=" + numberOfQuestions + "&difficulty=" + difficultyOfQuestions
      }
      setIsLoading(true);
      fetch(url)
        .then(res => res.json())
        .then(
          (result) => {
            setQuestions(result.results);
            console.log("data loaded");
          }
        )
        .then(()=>{
          if(isStart){
            setQuestions(prevState => JSON.parse(JSON.stringify(prevState)
                  .replaceAll("&#039;", "\'")
                  .replaceAll("&quot;", "\'")
                  // .replaceAll("&quot;", "\'")
                  .replaceAll("&amp;", "&")
                  .replaceAll("&rsquo;", "\'")))
                  // .replaceAll(/\&\.{2,7}\;/, "")))
            console.log("delUni");
          }
          setIsLoading(false);
    })
  }
  }, [isStart])

let questionArray = []
if (isStart) {
    questionArray = questions.map((question, index) => <Question key={index} question={question} toCheck={toCheck} 
                                                        setResult={setResult} />) 
}

useEffect(() => {
  setPrevBestResult(bestResult)
  if (result/questions.length*100 > bestResult) {
    setBestResult(result/questions.length*100) 
  } 
}, [result])

function handleChangeDifficulty(e) {
  setDifficultyOfQuestions(e.target.value)
  setIsSettingsChanged(true)
}

function handleChangeNumber (e) {
  setNumberOfQuestions(e.target.value)
  setIsSettingsChanged(true)
}

function handleClickCheck (){
  setToCheck(true)
  setIsRestart(true)
  window.scroll({
    top: 0,
    behavior: 'smooth'
  });
  setIsModalActive(true)
}

function handleClickStart(){
  if (isStart && isSettingsChanged) {
    setIsRestart(true) 
  }
  if (toCheck){
  }
  setIsStart(true)
  setIsSettingsChanged(false)
}

function handleClickRestart (){
  setIsStart(false)
  setToCheck(false)
  setIsSettingsChanged(false)
  setTimeout(() => {
    setIsStart(true)
  }, 0); 
  setIsRestart(false)
  setResult(0)
}

  return (
    <div className="App">
        <Form numberOfQuestions={numberOfQuestions} handleChangeNumber={handleChangeNumber}
                difficultyOfQuestions={difficultyOfQuestions} handleChangeDifficulty={handleChangeDifficulty}
                bestResult={bestResult} />
      {(isRestart || (isStart && isSettingsChanged)) ? <button className="button confirm" onClick={handleClickRestart}>RESTART</button> : '' }
      {(!isRestart && (!isSettingsChanged || !isStart) && !isLoading && !isStart) ? <button onClick={handleClickStart} className="button">START</button> : ""}
      <div>
          {(isStart && !toCheck && !isLoading) ? <button className="button" onClick={handleClickCheck}>Check answers</button>  : ""}
      </div>
      <Modal isModalActive={isModalActive} setIsModalActive={setIsModalActive} setModalContent={setModalContent}>
        <div>
            <div>
              Your result: {result} ({result/questions.length*100}%)
            </div>
            <div>
                {result/questions.length*100 > prevBestResult 
                  ? <img className='preloader' src={bestSVG} /> 
                  : <img className='preloader' src={trySVG}/> 
                }
            </div>
        </div>
      </Modal> 

      <div>
        {(isStart && !isLoading) ? questionArray : ""}
        {isLoading ? <img className='preloader' src={preloader} /> : ""}  
      </div>

      <div>
          {(isStart && !toCheck && !isLoading) ? <button className="button" onClick={handleClickCheck}>Check answers</button>  : ""}
      </div>
    </div>
  );
}

export default Game;
