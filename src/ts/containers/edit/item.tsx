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
import Input from './input';
import Select from './select';
import Done from './done';

type OwnProps = {
	question: QuestionType;
	idx: number;
};

const Temp: FunctionComponent<OwnProps> = (props) => {
	// store
	const { userReducer, sessionReducer } = useSelector((state: State) => state);
	// action
	const dispatch = useDispatch();
	// props
	const { question, idx } = props;
	const { mode, selIndexList } = question;
	// state
	const [ textArr, setTextArr ] = useState<string[]>([]);

	useEffect(() => {
		const nextTextArr = question.text.split(' ');
		setTextArr(nextTextArr);
	}, []);

	return (
		<div className="question">
			<div>{question.name}</div>
			{/* <div>{question.text}</div> */}
			{mode === 'input' ? (
				<Input />
			) : mode === 'select' ? (
				<Select />
			) : (
				<Done textArr={textArr} selIndexList={selIndexList} />
			)}
		</div>
	);
};

export default Temp;
