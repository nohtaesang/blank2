import { SubjectType } from '../models/subject';
import { QuestionType } from '../models/question';
import { SubjectMap, QuestionMap } from '../models/session';
export const sessionActionConst = {
	// async
	GET_USER_DATA: 'GET_USER_DATA',
	GET_USER_DATA_SUCCESS: 'GET_USER_DATA_SUCCESS',
	// sync
	SET_SEL_SUBJECT: 'SET_SEL_SUBJECT', // 삭제 예정?
	SET_SEL_QUESTION_LIST: 'SET_SEL_QUESTION_LIST', // 삭제 예정?
	SET_SEL_SUBECT_ID: 'SET_SEL_SUBJECT_ID'
};

export const getUserData = (userId: string) => ({
	type: sessionActionConst.GET_USER_DATA,
	payload: userId
});

export const getUserDataSuccess = (subjectList: SubjectMap, allQuestionList: QuestionMap) => ({
	type: sessionActionConst.GET_USER_DATA_SUCCESS,
	payload: { subjectList, allQuestionList }
});

export const setSelSubject = (subject: SubjectType) => ({
	type: sessionActionConst.SET_SEL_SUBJECT,
	payload: subject
});

export const setSelQuestionList = (questionList: QuestionMap) => ({
	type: sessionActionConst.SET_SEL_QUESTION_LIST,
	payload: questionList
});

export const setSelSubjectId = (subjectId: string) => ({
	type: sessionActionConst.SET_SEL_SUBECT_ID,
	payload: subjectId
});

export type GetUserDataType = ReturnType<typeof getUserData>;
export type GetUserDataSuccessType = ReturnType<typeof getUserDataSuccess>;
export type SetSelSubjectType = ReturnType<typeof setSelSubject>;
export type SetSelQuestionListType = ReturnType<typeof setSelQuestionList>;
export type SetSelSubjectIdType = ReturnType<typeof setSelSubjectId>;

export type SessionActionType =
	| GetUserDataType
	| GetUserDataSuccessType
	| SetSelSubjectType
	| SetSelQuestionListType
	| SetSelSubjectIdType;
