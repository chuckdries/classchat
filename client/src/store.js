import { createStore, combineReducers } from 'redux';
import UsersReducer from './Domain/Users/UsersReducer';
import MessagesReducer from './Domain/Messages/MessagesReducer';

export const store = createStore(
  combineReducers({
    user: UsersReducer,
    message: MessagesReducer
  })
);