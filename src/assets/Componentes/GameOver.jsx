import './GameOver.css';
import PropTypes from 'prop-types';

export const GameOver = ({ retry, score }) => {
    return (
        <div>
            <h1>FIM DE JOGO</h1>
            <h2>A sua pontuação foi: <span>{score}</span></h2>
            <button onClick={retry}>Resetar o Jogo</button>
        </div>
    )
}

GameOver.propTypes = {
    retry: PropTypes.func,
    score: PropTypes.func,
}

