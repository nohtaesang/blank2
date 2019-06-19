import { SubjectType } from '../models/subject';

export const subjectActionConstant = {
	GET_SUBJECT_LIST: 'GET_SUBJECT_LIST',
	GET_SUBJECT_LIST_SUCCESS: 'GET_SUBJECT_LIST_SUCCESS',
	SET_SUBJECT_LIST: 'SET_SUBJECT_LIST',
	GET_SUBJECT: 'GET_SUBJECT',
	GET_SUBJECT_SUCCESS: 'GET_SUBJECT_SUCCESS',
	POST_SUBJECT: 'POST_SUBJECT',
	POST_SUBJECT_SUCCESS: 'POST_SUBJECT_SUCCESS',
	PUT_SUBJECT: 'PUT_SUBJECT',
	PUT_SUBJECT_SUCCESS: 'PUT_SUBJECT_SUCCESS',
	DELETE_SUBJECT: 'DELETE_SUBJECT',
	DELETE_SUBJECT_SUCCESS: 'DELETE_SUBJECT_SUCCESS',
	SET_SELECTED_SUBJECT: 'SET_SELECTED_SUBJECT',
	POST_OPTION: 'POST_OPTION',
	POST_OPTION_SUCCESS: 'POST_OPTION_SUCCESS'
};

export const getSubjectList = (subjectIdList: number[]) => ({
	type: subjectActionConstant.GET_SUBJECT_LIST,
	payload: subjectIdList
});

export const getSubjectListSuccess = (subjectList: SubjectType[]) => ({
	type: subjectActionConstant.GET_SUBJECT_LIST_SUCCESS,
	payload: subjectList
});

export const setSubjectList = (subjectList: SubjectType[]) => ({
	type: subjectActionConstant.SET_SUBJECT_LIST,
	payload: subjectList
});

export const getSubject = (id: number) => ({
	type: subjectActionConstant.GET_SUBJECT,
	payload: id
});

export const getSubjectSuccess = (subject: SubjectType) => ({
	type: subjectActionConstant.GET_SUBJECT_SUCCESS,
	payload: subject
});

export const postSubject = () => ({
	type: subjectActionConstant.POST_SUBJECT
});

export const postSubjectSuccess = (id: number) => ({
	type: subjectActionConstant.POST_SUBJECT_SUCCESS,
	payload: id
});

export const putSubject = (
	id: number,
	name: string,
	isWhole: boolean,
	isShuffle: boolean,
	blankRatio: number,
	questionIdList: number[]
) => ({
	type: subjectActionConstant.PUT_SUBJECT,
	payload: { id, name, questionIdList, isWhole, isShuffle, blankRatio }
});

export const putSubjectSuccess = (id: string) => ({
	type: subjectActionConstant.PUT_SUBJECT_SUCCESS,
	payload: id
});

export const deleteSubject = (id: string) => ({
	type: subjectActionConstant.DELETE_SUBJECT,
	payload: id
});

export const deleteSubjectSuccess = (id: string) => ({
	type: subjectActionConstant.DELETE_SUBJECT_SUCCESS,
	payload: id
});

export const setSelectedSubject = (subject: SubjectType) => ({
	type: subjectActionConstant.SET_SELECTED_SUBJECT,
	payload: subject
});

export const postOption = (isWhole: boolean, isShuffle: boolean, blankRatio: number) => ({
	type: subjectActionConstant.POST_OPTION,
	payload: { isWhole, isShuffle, blankRatio }
});
export const postOptionSuccess = () => ({
	type: subjectActionConstant.POST_OPTION_SUCCESS
});

export type GetSubjectListType = ReturnType<typeof getSubjectList>;
export type GetSubjectListSuccessType = ReturnType<typeof getSubjectListSuccess>;
export type SetSubjectListType = ReturnType<typeof setSubjectList>;
export type GetSubjectType = ReturnType<typeof getSubject>;
export type GetSubjectSuccessType = ReturnType<typeof getSubjectSuccess>;
export type PostSubjectType = ReturnType<typeof postSubject>;
export type PostSubjectSuccessType = ReturnType<typeof postSubjectSuccess>;
export type PutSubjectType = ReturnType<typeof putSubject>;
export type PutSubjectSuccessType = ReturnType<typeof putSubjectSuccess>;
export type DeleteSubjectType = ReturnType<typeof deleteSubject>;
export type DeleteSubjectSuccessType = ReturnType<typeof deleteSubjectSuccess>;
export type SetSelectedSubjectType = ReturnType<typeof setSelectedSubject>;
export type PostOptionType = ReturnType<typeof postOption>;
export type PostOptionSuccess = ReturnType<typeof postOptionSuccess>;

export type SubjectActionType =
	| GetSubjectListType
	| GetSubjectListSuccessType
	| SetSubjectListType
	| GetSubjectType
	| GetSubjectSuccessType
	| PostSubjectType
	| PostSubjectSuccessType
	| PutSubjectType
	| PutSubjectSuccessType
	| DeleteSubjectType
	| DeleteSubjectSuccessType
	| SetSelectedSubjectType
	| PostOptionType
	| PostOptionSuccess;
