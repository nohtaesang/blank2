import { userActionConst as uac, UserActionType, LoginSuccessType, SetUserType } from '../actions/user';
import { UserStateType } from '../models/user';

const initialState: UserStateType = {
	user: null,
	initUser: false
};

export default (state = initialState, action: UserActionType): UserStateType => {
	switch (action.type) {
		case uac.LOGIN:
			return state;
		case uac.LOGIN_SUCCESS:
			const nextUser = (action as LoginSuccessType).payload;
			localStorage.setItem('user', JSON.stringify(nextUser));
			return { ...state, user: nextUser };
		case uac.LOGIN_FAIL:
			return state;
		case uac.LOGOUT:
			return state;
		case uac.LOGOUT_SUCCESS:
			localStorage.setItem('user', '');
			return { ...state, user: null };
		case uac.SET_USER:
			return { ...state, user: (action as SetUserType).payload, initUser: true };

		default:
			return state;
	}
};
