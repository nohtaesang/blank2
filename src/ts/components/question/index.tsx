import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'ts/redux/reducers';
// actions
import { userActionConst } from 'ts/redux/actions/user';
import { subjectActionConstant } from 'ts/redux/actions/subject';
// models
import { QuestionType } from 'ts/redux/models/question';
// components

type OwnProps = {
	question: QuestionType;
	idx: number;
	mode: string;
};

const Temp: FunctionComponent<OwnProps> = (props) => {
	// store
	const { userReducer, sessionReducer } = useSelector((state: State) => state);
	// action
	const dispatch = useDispatch();
	// props
	const { question, idx } = props;
	return (
		<div className="question">
			<div>{question.name}</div>
			<div>{question.text}</div>
		</div>
	);
};

export default Temp;
