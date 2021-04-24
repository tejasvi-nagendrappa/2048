import { combineReducers } from 'redux';
import { reducer as gameReducer } from 'containers/GameContainer/GameAction';

export default combineReducers({
  game: gameReducer,
});
