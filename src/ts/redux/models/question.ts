export type QuestionType = {
	id: string;
	userId: string;
	subjectId: string;
	order: number;
	mode: string;
	name: string;
	text: string;
	selectedIndexList: number[];
};

export type QuestionMap = {
	[id: string]: QuestionType;
};

export type QuestionListType = {};

export type QuestionStateType = {
	addedId: string;
};
