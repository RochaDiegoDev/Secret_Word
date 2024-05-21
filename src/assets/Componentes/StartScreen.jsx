import "./StartScreen.css";
import PropTypes from 'prop-types';

export const StartScreen = ({ startGame }) => {
    return (
        <div className="start">
            <h1>Secret Word</h1>
            <p>Clique no Botao abaixo para começar o jogo</p>
            <button onClick={startGame}>Inicio do jogo</button>
        </div>
    )
}

StartScreen.propTypes = {
    startGame: PropTypes.func,
}