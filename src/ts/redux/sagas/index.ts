import { all } from 'redux-saga/effects';
import { watchLogin, watchLogout } from './user';
import { watchGetUserData } from './session';
export default function* rootSaga() {
	yield all([
		// user
		watchLogin(),
		watchLogout(),
		// sessiong
		watchGetUserData()
	]);
}
