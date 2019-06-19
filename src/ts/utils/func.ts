import { SubjectType } from 'ts/redux/models/subject';
import { QuestionType } from 'ts/redux/models/question';

export const copySubjectList = (subjectList: SubjectType[]): SubjectType[] => {
	const nextSubjectList: SubjectType[] = [];
	subjectList.forEach((subject) => nextSubjectList.push(clone(subject)));
	return nextSubjectList;
};

export const copyQuestionList = (questionList: QuestionType[]): QuestionType[] => {
	const nextQuestionList: QuestionType[] = [];
	questionList.forEach((question) => nextQuestionList.push(clone(question)));
	return nextQuestionList;
};

export const clone = <T extends {}>(obj: T) => {
	const cloneObj: any = {};
	for (let attr in obj) {
		if (typeof attr === 'object') {
			cloneObj[attr] = clone(attr);
		} else {
			cloneObj[attr] = obj[attr];
		}
	}
	return cloneObj;
};
