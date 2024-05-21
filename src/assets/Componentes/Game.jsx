import { useState, useRef } from 'react';
import './Game.css';
import PropTypes from 'prop-types';

export const Game = ({ verifyletter,
    pickedCategory,
    guessedLetters,
    letters,
    wrongLetters,
    guesses,
    score }) => {

    const [letter, setLetters] = useState("");
    const letterInputRef = useRef(null);

    const handleSubmit = (e) => {
        e.preventDefault();

        verifyletter(letter);
        setLetters(""); //apagar a letra depois de utilizada
        letterInputRef.current.focus(); // para eu continuar jogando sem precisar ficar clicando na caixa
    };

    return (
        <div className='game'>
            <p className='points'>
                <span>Pontuação: {score}</span>
            </p>
            <h1>Adivinha a palavra: </h1>
            <h3 className='tip'>Dica sobre a palavra :
                <span>{pickedCategory}</span></h3>
            <p>Voce ainda tem {guesses} tentativas </p>

            <div className='wordContainer'>
                {letters.map((letter, i) => (
                    guessedLetters.includes(letter) ? (
                        <span key={i} className='letter'>{letter} </span>
                    ) : (
                        <span key={i} className='blankSquare'> </span>
                    )
                ))}

            </div>

            <div className='letterContainer'>
                <p>Tente adivinha a letra da palavra:</p>
                <form onSubmit={handleSubmit}>
                    <input type="text"
                        name='letter'
                        maxLength='1'
                        required
                        onChange={(e) => setLetters(e.target.value)}
                        value={letter}
                        ref={letterInputRef}

                    />
                    <button>Jogar!</button>
                </form>
            </div>

            <div className='wrongLettersContainer'>
                <p>Letras ja utilizadas</p>
                {wrongLetters.map((letter, i) => (
                    <span key={i}>{letter}, </span>
                ))}

            </div>

        </div>
    )
}

Game.propTypes = {
    verifyletter: PropTypes.func,
    pickedWord: PropTypes.func,
    pickedCategory: PropTypes.func,
    guessedLetters: PropTypes.func,
    letters: PropTypes.func,
    wrongLetters: PropTypes.func,
    guesses: PropTypes.func,
    score: PropTypes.func,
}