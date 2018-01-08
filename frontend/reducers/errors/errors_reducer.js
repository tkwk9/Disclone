import { combineReducers } from 'redux';
import sessionErrorsReducer from './session_errors_reducer';
import miscErrorsReducer from './misc_errors_reducer';

const errorsReducer = combineReducers({
  session: sessionErrorsReducer,
  misc: miscErrorsReducer
});

export default errorsReducer;
