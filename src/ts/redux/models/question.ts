export type QuestionType = {
	id: string;
	userId: string;
	subjectId: string;
	order: number;
	name: string;
	text: string;
	selIndexList: SelIndexListType;
};

export type SelIndexListType = {
	[key: number]: boolean | undefined; // TODO: 왜 undefined를 해야하는가...
};

export type QuestionMap = {
	[id: string]: QuestionType;
};

export type QuestionListType = {};

export type QuestionStateType = {
	addedId: string;
};
