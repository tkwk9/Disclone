import { createStore, applyMiddleware } from 'redux';
import logger from 'redux-logger';
import thunk from 'redux-thunk';
import rootReducer from '../reducers/root_reducer';

const defaultState = {

};

const configureStore = (preloadedState = defaultState) => {
  return createStore(
    rootReducer,
    preloadedState,
    applyMiddleware(thunk, logger)
    // applyMiddleware(thunk)
  );
};

export default configureStore;
