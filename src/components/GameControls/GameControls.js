import React from 'react';
import PropTypes from 'prop-types';
import { DIRECTION } from 'utils/Constants';

const propTypes = {
  onMoveCells: PropTypes.func.isRequired,
  onStartClick: PropTypes.func.isRequired,
  showControls: PropTypes.bool.isRequired,
  isGameStarted: PropTypes.bool.isRequired,
}

const { RIGHT, LEFT, UP, DOWN } = DIRECTION;

const GameControls = (props) => {
  const { onMoveCells, onStartClick, showControls, isGameStarted } = props;
  const startBtnText = isGameStarted ? 'Restart Game' : 'Start game';
  const buttonClassName = 'Button';

  return (
    <div className="GameControls">
      <div>
          <div className={buttonClassName} onClick={onStartClick}>{startBtnText}</div>
      </div>
      {showControls ?
        (<div className="ButtonGroup" >
          <div className={buttonClassName} onClick={() => { onMoveCells(UP) }}>Move Up</div>
          <div className={buttonClassName} onClick={() => { onMoveCells(RIGHT) }}>Move Right</div>
          <div className={buttonClassName} onClick={() => { onMoveCells(DOWN) }}>Move Down</div>
          <div className={buttonClassName} onClick={() => { onMoveCells(LEFT) }}>Move Left</div>
        </div>): null
      }
    </div>
  );
}

GameControls.propTypes = propTypes;
export default GameControls;
