import { SubjectType } from 'ts/redux/models/subject';

export const copySubjectList = (subjectList: SubjectType[]): SubjectType[] => {
	const nextSubjectList: SubjectType[] = [];
	subjectList.forEach((subject) => nextSubjectList.push(clone(subject)));
	return nextSubjectList;
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
