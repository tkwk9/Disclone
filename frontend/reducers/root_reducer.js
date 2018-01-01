import { combineReducers } from 'redux';
import sessionReducer from './session_reducer';
import errorsReducer from './errors/errors_reducer';
import uiReducer from './ui_reducer';
import entitiesReducer from './entities/entities_reducer';

const rootReducer = combineReducers({
  session: sessionReducer,
  entities: entitiesReducer,
  ui: uiReducer,
  errors: errorsReducer
});

export default rootReducer;
