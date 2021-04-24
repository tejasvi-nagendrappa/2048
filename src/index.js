import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux'
import configureStore from './store';
import registerServiceWorker from './registerServiceWorker';
import GameContainer from 'containers/GameContainer';
import 'containers/GameContainer/Game.css';

ReactDOM.render(
  <Provider store={configureStore()}>
      <GameContainer />
  </Provider>,
  document.getElementById('root')
);
registerServiceWorker();
