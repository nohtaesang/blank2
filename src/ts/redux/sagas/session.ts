import { put, takeLatest } from 'redux-saga/effects';
import { sessionActionConst, GetUserDataType, getUserDataSuccess } from '../actions/session';
import { SubjectMap, QuestionMap } from '../models/session';

import subjectTable from 'static/js/subject';
import questionTable from 'static/js/question';

export function* watchGetUserData() {
	yield takeLatest(sessionActionConst.GET_USER_DATA, getUserData);
}
function* getUserData(action: GetUserDataType) {
	const subjectList: SubjectMap = {};
	const allQuestionList: QuestionMap = {};

	subjectTable.forEach((subject) => {
		if (subject.userId === action.payload) {
			subjectList[subject.id] = subject;
		}
	});
	questionTable.forEach((question) => {
		if (question.userId === action.payload) {
			allQuestionList[question.id] = question;
		}
	});

	yield put(getUserDataSuccess(subjectList, allQuestionList));
}
