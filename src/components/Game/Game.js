import React from 'react';
import PropTypes from 'prop-types';
import Row from 'components/Row';

const propTypes = {
  board: PropTypes.arrayOf(PropTypes.array).isRequired,
  score: PropTypes.number.isRequired,
  hasWon: PropTypes.bool.isRequired,
  isGameOver: PropTypes.bool.isRequired,
};

const Game = (props) =>{
  const { board, score, isGameOver, hasWon } = props;
  return (
    <div className="Game">
      <div className="InfoContainer">
        <div> Score : {score} </div>
        {isGameOver ? (<div> Game Over !! Please Start New Game </div>) : null}
        {hasWon ? <div> You have Won the Game !! </div>: null}
      </div>
      <div className="BoardContainer">
          {board.map((row, i) => (<Row key={`row_${i}`} row={row} />))}
      </div>
    </div>
  );
}

Game.propTypes = propTypes;
export default Game;
