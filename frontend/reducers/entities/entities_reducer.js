import { combineReducers } from 'redux';
import directMessagesReducer from './direct_messages_reducer';
import messagesReducer from './messages_reducer';
import usersReducer from './users_reducer';

const entitiesReducer = combineReducers({
  directMessages: directMessagesReducer,
  messages: messagesReducer,
  users: usersReducer
});


export default entitiesReducer;
