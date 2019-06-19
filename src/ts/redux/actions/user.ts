import { UserType } from '../models/user';
export const userActionConst = {
	LOGIN: 'LOGIN',
	LOGIN_SUCCESS: 'LOGIN_SUCCESS',
	LOGIN_FAIL: 'LOGIN_FAIL',
	LOGOUT: 'LOGOUT',
	LOGOUT_SUCCESS: 'LOGOUT_SUCCESS',
	SET_USER: 'SET_USER'
};

export const login = (email: string, password: string) => ({
	type: userActionConst.LOGIN,
	payload: { email, password }
});

export const loginSuccess = (user: UserType) => ({
	type: userActionConst.LOGIN_SUCCESS,
	payload: user
});
export const loginFail = () => ({
	type: userActionConst.LOGIN_FAIL
});

export const logout = () => ({
	type: userActionConst.LOGOUT
});

export const logoutSuccess = () => ({
	type: userActionConst.LOGOUT_SUCCESS
});

export const setUser = (user: UserType) => ({ type: userActionConst.SET_USER, payload: user });

export type LoginType = ReturnType<typeof login>;
export type LoginSuccessType = ReturnType<typeof loginSuccess>;
export type LoginFailType = ReturnType<typeof loginFail>;
export type LogoutType = ReturnType<typeof logout>;
export type LogoutSuccessType = ReturnType<typeof logoutSuccess>;
export type SetUserType = ReturnType<typeof setUser>;

export type UserActionType =
	| LoginType
	| LoginSuccessType
	| LoginFailType
	| LogoutType
	| LogoutSuccessType
	| SetUserType;
