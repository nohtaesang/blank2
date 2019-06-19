import { combineReducers } from 'redux';
import userReducer from './user';
import { UserStateType } from '../models/user';
import sessionReducer from './session';
import { SessionStateType } from '../models/session';
const rootReducer = combineReducers({ userReducer, sessionReducer });

export default rootReducer;

export type State = {
	userReducer: UserStateType;
	sessionReducer: SessionStateType;
};
