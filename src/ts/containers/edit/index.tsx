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
import Item from './item';
// utils
import { copyQuestionList } from 'ts/utils/func';

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
	const [ backupQuestionList, setBackupQuestionList ] = useState<QuestionType[]>([]);

	// 1. selSubjectId가 설정되면,
	// curSubject를 설정한다. (여기서 subject는 수정되지 않으므로 backup은 필요없다.)
	// allQuestionList 에서 selSubject의 id와 일치하는 question을 가져온다.
	// curQuestionList와 backupQuestionList를 설정한다.
	useEffect(
		() => {
			if (!selSubjectId) return;
			setCurSubject(subjectList[selSubjectId]);

			let nextCurQuestionList = Object.values(allQuestionList)
				.filter((question) => question.subjectId === selSubjectId)
				.sort((a, b) => a.order - b.order);

			setCurQuestionList(nextCurQuestionList);
			setBackupQuestionList(copyQuestionList(nextCurQuestionList));
		},
		[ selSubjectId ]
	);

	return curQuestionList ? (
		<div className="edit-wrap">
			{curQuestionList.map((question, idx) => <Item key={question.id} question={question} idx={idx} />)}
		</div>
	) : null;
};

export default Temp;
