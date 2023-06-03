import { configureStore, ThunkAction, ThunkDispatch } from '@reduxjs/toolkit';
import { combineReducers } from 'redux';
import   userReducer  from './reducers/userSlice';
import { groupReducer } from './reducers/groupSlice';
import  messageReducer  from './reducers/messageSlice';
import recipientsReducer from "./reducers/recipientsSlice";
import { UserAction } from './actions/user';


const rootReducer = combineReducers({
  user: userReducer,
  group: groupReducer,
  messages: messageReducer,
  recipients: recipientsReducer,
});

// Create the store using configureStore and pass the rootReducer
const store = configureStore({
  reducer: rootReducer,
});

// Define the type for your store state and dispatch actions
export type AppState = ReturnType<typeof store.getState>;
export type thunkDispatch = ThunkDispatch<AppState, any, UserAction<any>>;

export { store };
