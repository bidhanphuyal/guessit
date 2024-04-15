import nations from './nations';
import 'flag-icon-css/css/flag-icons.css';
import './App.css';
import { useEffect, useState } from 'react';

function App() {
  
  const [country, setCountry] = useState([]);
  const [flagCountry, setFlagCountry] = useState({});
  const [score, setScore] = useState({ total: 0, correct: 0, incorrect: 0 });
  const [showAnswer, setShowAnswer] = useState(false);
  const [selected, setSelected] = useState({});
  const [iterationCount, setIterationCount] = useState(0); // State variable to track the iteration count

  const generateRandomNations = () => {
    let ct = [];

    for (let i = 0; i < 4; i++) {
      const r = Math.floor(Math.random() * nations.length);
      ct.push(nations[r]);
    }
    setCountry(ct);
    const index = Math.floor(Math.random() * 4);
    setFlagCountry(ct[index]);
  };

  const checkAnswer = (country) => {
    setSelected(country);

    if (country.name === flagCountry.name) {
      setScore({ ...score, correct: score.correct + 1, total: score.total + 1 });
    } else {
      setScore({ ...score, incorrect: score.incorrect + 1, total: score.total + 1 });
    }
    setShowAnswer(true);
    setTimeout(() => {
      setShowAnswer(false);
      nextQuestions();
    }, 1000);
  };

  const nextQuestions = () => {
    setIterationCount(iterationCount + 1); // Increment iteration count
    if (iterationCount >= 9) {
      // If 10 iterations completed, stop the game
      setShowAnswer(false);
      setCountry([]);
      setFlagCountry({});
      setSelected({});
      setScore({ total: 0, correct: 0, incorrect: 0 });
      setIterationCount(0); // Reset iteration count
      alert("Game Over"); // Display "Game Over" message
    } else {
      generateRandomNations();
    }
  };

  useEffect(() => {
    generateRandomNations();
  }, []);

  return (
    <>
      <h1>Guess The Flag</h1>
      <h2>Total:{score.total} / Correct:{score.correct} / Incorrect:{score.incorrect}</h2>

      {flagCountry.name ? (<span className={`flag-icon flag-icon-${flagCountry['alpha-2'].toLowerCase()}`}></span>) : null}

      <div className='but'>
        {country.map((c) => <button onClick={(e) => checkAnswer(c)}>{c.name}</button>)}
      </div>

      <div>
        {showAnswer ? <h2 className={flagCountry.name === selected.name ? 'correct' : 'incorrect'}>Correct :{flagCountry.name}</h2> : null}
      </div>
    </>
  );
}

export default App;
