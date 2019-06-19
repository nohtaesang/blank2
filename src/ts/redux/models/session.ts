import { SubjectType } from '../models/subject';
import { QuestionType } from '../models/question';

// export type SessionType = {
// 	subjectList: SubjectType[];
// 	allQuestionList: QuestionType[];
// 	selSubject: SessionType | null;
// 	selQuestionList: QuestionType[];
// };

export type SubjectMap = {
	[id: string]: SubjectType;
};

export type QuestionMap = {
	[id: string]: QuestionType;
};

export type SessionStateType = {
	subjectList: SubjectMap;
	allQuestionList: QuestionMap;
	selSubject: SubjectType | null;
	selQuestionList: QuestionMap;
	selSubjectId: string | null;
};
