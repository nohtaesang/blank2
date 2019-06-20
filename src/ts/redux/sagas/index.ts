import { all } from 'redux-saga/effects';
import { watchLogin, watchLogout } from './user';
import { watchGetUserData, watchSaveSubjectList } from './session';
export default function* rootSaga() {
	yield all([
		// user
		watchLogin(),
		watchLogout(),
		// sessiong
		watchGetUserData(),
		watchSaveSubjectList()
	]);
}
