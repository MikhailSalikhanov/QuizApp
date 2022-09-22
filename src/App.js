import logo from './logo.svg';
import './App.css';
// import data from './data';
import { useState, useEffect } from 'react';

function App() {
  const [isLoaded, setIsLoaded] = useState(false);
  const [questions, setQuestions] = useState({});

  useEffect(() => {
    fetch("https://opentdb.com/api.php?amount=10")
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setQuestions(result);
        },
      )
  }, [isLoaded])

  function handleClick (){
    setIsLoaded(false);
  }

  return (
    <div className="App">
      <h1>Quiz App</h1>
      <h2>Description will be here</h2>
      <button onClick={handleClick} className="button">Start quiz</button>
      {isLoaded ? <div className='data'>{questions.results[0]["category"]}</div> : "Ждем"}
    </div>
  );
}

export default App;
