import React from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import { startGame, moveCells } from './GameAction';
import Game from 'components/Game';
import GameControls from 'components/GameControls';
import { KEY_CODES, DIRECTION} from 'utils/Constants';

const propTypes = {
  actions: PropTypes.shape({
    startGame: PropTypes.func,
    moveCells: PropTypes.func,
  }),
  isGameStarted: PropTypes.bool.isRequired,
  isGameOver: PropTypes.bool.isRequired,
  board: PropTypes.arrayOf(PropTypes.array).isRequired,
  score: PropTypes.number.isRequired,
  hasWon: PropTypes.bool.isRequired,
};

class GameContainer extends React.PureComponent {

  componentWillMount() {
    window.addEventListener('keydown', this.handleKeyPress);
  }

  componentWillUnmount() {
    window.removeEventListener('keydown', this.handleKeyPress);
  }

  startGame = () => {
    const { actions } = this.props;
    actions.startGame();
  };

  moveCells = (direction) => {
    const { actions, hasWon, isGameOver } = this.props;
    if (hasWon || isGameOver) {
      return;
    } else {
      actions.moveCells(direction);
    }
  };

  handleKeyPress = (e) => {
    e.preventDefault();
    e.stopPropagation();

    const { hasWon, isGameOver } = this.props;
    if(hasWon || isGameOver ) {
      return;
    } else {
      const { keyCode } = e;
      const {
        UP_KEY, DOWN_KEY, RIGHT_KEY, LEFT_KEY, ONE_KEY, TWO_KEY, THREE_KEY, FOUR_KEY, N_KEY,
      } = KEY_CODES;

      const { UP, DOWN, RIGHT, LEFT } = DIRECTION;

      let direction = '';
      if (keyCode === UP_KEY || keyCode === THREE_KEY ) {
        direction = UP;
      } else if (keyCode === RIGHT_KEY || keyCode === TWO_KEY) {
        direction = RIGHT;
      } else if (keyCode === DOWN_KEY || keyCode === FOUR_KEY) {
        direction = DOWN
      } else if (keyCode === LEFT_KEY || keyCode === ONE_KEY) {
        direction = LEFT
      } else if (e.keyCode === N_KEY) {
        this.startGame();
        return;
      }
      this.moveCells(direction);
    }
  };

  render() {
    const { isGameStarted, isGameOver, board, score, hasWon } = this.props;
    return (
      <div className="GameContainer">
        <GameControls
          onMoveCells={this.moveCells}
          onStartClick={this.startGame}
          showControls={isGameStarted && !(isGameOver) && !(hasWon)}
          isGameStarted={isGameStarted}
        />
        {isGameStarted ?
        (
          <Game
            board={board}
            score={score}
            isGameOver={isGameOver}
            hasWon={hasWon}
          />
        ) : null}
      </div>
    );
  }
}

const mapStateToProps = state => ({ ...state.game });

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators({
    moveCells,
    startGame,
  }, dispatch),
});

GameContainer.propTypes = propTypes;
export default connect(mapStateToProps, mapDispatchToProps)(GameContainer);
