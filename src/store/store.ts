import { ThunkDispatch } from 'redux-thunk';
import { UserAction } from './actions/user';
import { MessageActionTypes } from './actions/message';
import configureStore from './configureStore';

const store = configureStore();

export type AppState = ReturnType<typeof store.getState>;
export type thunkDispatch = ThunkDispatch<AppState, any, UserAction<any> | MessageActionTypes>;

export { store };
