//CSS
import './App.css'

//REACT
import { useEffect, useState, useCallback } from 'react';

//Data
import { wordsList } from './assets/data/words';

//Componentes
import { StartScreen } from './assets/Componentes/StartScreen';
import { Game } from './assets/Componentes/Game';
import { GameOver } from './assets/Componentes/GameOver';

const stages = [
  { id: 1, name: "start" },
  { id: 2, name: "game" },
  { id: 3, name: "end" },
];

const guessesQty = 3
const startScore = 0

function App() {
  const [gameStage, setGameStage] = useState(stages[0].name);
  const [words] = useState(wordsList);

  const [pickedWord, setPickedWord] = useState("");
  const [pickedCategory, setPickedCategory] = useState("");
  const [letters, setLetters] = useState([]);

  const [guessedLetters, setGuessedLetters] = useState([])
  const [wrongLetters, setWrongLetters] = useState([])
  const [guesses, setGuesses] = useState(guessesQty)
  const [score, setScore] = useState(startScore)


  const pickedWordAndCategory = useCallback(() => {
    //pick a random categoty
    const categories = Object.keys(words)
    const category = categories[Math.floor(Math.random()
      * Object.keys(categories).length)]

    //Pick a random word
    const word = words[category][Math.floor(Math.random()
      * words[category].length)];

    return { category, word };
  }, [words]);

  // starts the secret word game (Função de Inicio do Jogo)
  const startGame = useCallback(() => {
    //clear all letters
    clearLetterStates();

    //picked word and pick category
    const { word, category } = pickedWordAndCategory();

    //create an array of letters
    let wordLetters = word.split("");
    //Colocando a letras em Maiusculo 
    wordLetters = wordLetters.map((l) => l.toLowerCase());


    //Fill States
    setPickedWord(word);
    setPickedCategory(category);
    setLetters(wordLetters);


    // picked word and pick category
    pickedWordAndCategory() //VERIFICAR AQUI 
    setGameStage(stages[1].name);
  }, [pickedWordAndCategory]);

  //process the letter input
  const verifyletter = (letter) => {

    const normalizedLetter = letter.toLowerCase();

    // check if letter has already been utilized
    if (guessedLetters.includes(normalizedLetter) ||
      wrongLetters.includes(normalizedLetter)
    ) {
      return;
    }

    //push guessed letter or remove a guess
    if (letters.includes(normalizedLetter)) {
      setGuessedLetters((actualGuessedLetters) =>
        [...actualGuessedLetters, letter,]);
    } else {
      setWrongLetters((actualWrongLetters) => [
        ...actualWrongLetters, normalizedLetter,
      ]);

      setGuesses((actualGuesses) => actualGuesses - 1);
    }
  };


  const retry = () => {
    setScore(0)
    setGuesses(guessesQty)
    setGameStage(stages[0].name)
  };

  //// clear letters state
  const clearLetterStates = () => {
    setGuessedLetters([]);
    setWrongLetters([]);
  };

  //check if guesses ended
  useEffect(() => {
    if (guesses <= 0) {
      clearLetterStates();
      setGameStage(stages[2].name);
    }
  }, [guesses]);

  // check wind condition
  useEffect(() => {
    const uniqueLetters = [...new Set(letters)];

    //win condition
    if (guessedLetters.length === uniqueLetters.length) {
      //add score
      setScore((actualScore) => actualScore += 100)

      //restarts de Game whith new word
      startGame();
    }
  }, [guessedLetters, letters, startGame]);



  return (
    <div className='App'>
      {gameStage === 'start' && <StartScreen startGame={startGame} />}
      {gameStage === 'game' &&
        <Game
          verifyletter={verifyletter}
          pickedCategory={pickedCategory}
          pickedWord={pickedWord}
          letters={letters}
          guessedLetters={guessedLetters}
          wrongLetters={wrongLetters}
          guesses={guesses}
          score={score}
        />}
      {gameStage === 'end' && <GameOver retry={retry} score={score} />}
    </div>
  )
}

export default App
