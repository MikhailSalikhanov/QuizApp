import {Routes, Route, Link } from "react-router-dom"
import Rules from './Components/Rules';
import Game from './Components/Game';
import Reset from "./Components/Reset";
import useLocalStorage from './Hooks/UseLocalStorage';

function App() {
  const [bestResult, setBestResult] = useLocalStorage('bestResult', 0)

  return (
    <div className="App">
          <nav className='nav' >
            <div className="link"><Link to="/">Main</Link></div>
            <div className="link"><Link to="/rules">Rules</Link></div>
            <div className="link"><Link to="/reset">Reset the best result</Link></div>
        </nav>
      <div>Quiz App</div>
      <Routes>
          <Route path='/rules' element={<Rules />} />
          <Route path='/' element={<Game bestResult={bestResult} setBestResult={setBestResult} />} />
          <Route path='/reset' element={<Reset bestResult={bestResult} setBestResult={setBestResult}/>} />
      </Routes> 
      <footer> <a href="https://github.com/MikhailSalikhanov" target={"blank"}>(c) Mykhailo Salikhanov</a></footer>
    </div>
  );
}

export default App;
