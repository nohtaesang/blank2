import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'ts/redux/reducers';
// actions
import { userActionConst } from 'ts/redux/actions/user';
import { subjectActionConstant } from 'ts/redux/actions/subject';
// models
import { SubjectType } from 'ts/redux/models/subject';
import { QuestionType } from 'ts/redux/models/question';
import { QuestionMap } from 'ts/redux/models/session';
// components

type OwnProps = {};

const Temp: FunctionComponent<OwnProps> = (props) => {
	// store
	const { userReducer, sessionReducer } = useSelector((state: State) => state);
	const { subjectList, allQuestionList, selSubjectId } = sessionReducer;
	// action
	const dispatch = useDispatch();
	// state
	const [ curSubject, setCurSubject ] = useState<SubjectType | null>(null);
	const [ curQuestionList, setCurQuestionList ] = useState<QuestionType[]>([]);
	useEffect(
		() => {
			if (!selSubjectId) return;
			setCurSubject(subjectList[selSubjectId]);

			let nextCurQuestionList = Object.values(allQuestionList)
				.filter((question) => question.subjectId === selSubjectId)
				.sort((a, b) => a.order - b.order);

			setCurQuestionList(nextCurQuestionList);
		},
		[ selSubjectId ]
	);

	return curSubject ? <div>hi</div> : null;
};

export default Temp;
