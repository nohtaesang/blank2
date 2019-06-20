import {
	sessionActionConst,
	SessionActionType,
	GetUserDataSuccessType,
	SetSelSubjectType,
	SetSelQuestionListType,
	SetSelSubjectIdType,
	SaveSubjectListType,
	SaveQuestionListType
} from '../actions/session';

import { SessionStateType } from '../models/session';

const initialState: SessionStateType = {
	subjectList: {},
	allQuestionList: {},
	selSubject: null,
	selQuestionList: {},
	selSubjectId: null
};

export default (state = initialState, action: SessionActionType): SessionStateType => {
	switch (action.type) {
		case sessionActionConst.GET_USER_DATA:
			return state;
		case sessionActionConst.GET_USER_DATA_SUCCESS:
			const { subjectList, allQuestionList } = (action as GetUserDataSuccessType).payload;
			return { ...state, subjectList, allQuestionList };
		case sessionActionConst.SET_SEL_SUBJECT:
			return { ...state, selSubject: (action as SetSelSubjectType).payload };
		case sessionActionConst.SET_SEL_QUESTION_LIST:
			return { ...state, selQuestionList: (action as SetSelQuestionListType).payload };
		case sessionActionConst.SET_SEL_SUBECT_ID:
			return { ...state, selSubjectId: (action as SetSelSubjectIdType).payload };
		case sessionActionConst.SAVE_SUBJECT_LIST:
			console.log(action);
			return { ...state, subjectList: (action as SaveSubjectListType).payload.subjectList };
		case sessionActionConst.SAVE_SUBJECT_LIST_SUCCESS:
			return { ...state };
		case sessionActionConst.SAVE_QUESTION_LIST:
			return {
				...state,
				allQuestionList: (action as SaveQuestionListType).payload.allQuestionList
			};
		case sessionActionConst.SAVE_QUESTION_LIST_SUCCESS:
			return { ...state };
		default:
			return state;
	}
};
