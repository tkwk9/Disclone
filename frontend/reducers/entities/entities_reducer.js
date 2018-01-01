import { combineReducers } from 'redux';
import directMessagesReducer from './direct_messages_reducer';
import messagesReducer from './messages_reducer';

const entitiesReducer = combineReducers({
  directMessages: directMessagesReducer,
  messages: messagesReducer
});


export default entitiesReducer;
