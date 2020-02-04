import { combineReducers, createStore, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import { save, load } from 'redux-localstorage-simple';

import { ticketReducer as tickets } from './tickets';
import { timeReducer as time } from './time';

const LS_CONFIG = {
  states: ['tickets'],
  namespace: 'tICkets_data'
};

const reducer = combineReducers({
  tickets,
  time
});

export default createStore(
  reducer,
  load(LS_CONFIG),
  composeWithDevTools(applyMiddleware(save(LS_CONFIG)))
);
