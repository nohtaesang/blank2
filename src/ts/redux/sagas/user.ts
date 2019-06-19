import { put, takeLatest } from 'redux-saga/effects';
import { userActionConst as uac, LoginType, loginSuccess, loginFail, logoutSuccess, LogoutType } from '../actions/user';

export function* watchLogin() {
	yield takeLatest(uac.LOGIN, login);
}

function* login(action: LoginType) {
	const { email, password } = action.payload;
	if (email !== '1' || password !== '1') {
		yield put(loginFail());
	} else {
		const res = {
			id: '1',
			email: 'nohtaesang@naver.com',
			password: '1234',
			subjectIdList: [ '0', '1' ]
		};
		yield put(loginSuccess(res));
	}
}

export function* watchLogout() {
	yield takeLatest(uac.LOGOUT, logout);
}

function* logout(action: LogoutType) {
	yield put(logoutSuccess());
}
