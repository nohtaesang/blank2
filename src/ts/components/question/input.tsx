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
	curText: string;
	setCurText(text: string): void;
	setMode(mode: string): void;
	onClickCancel(): void;
};

const Temp: FunctionComponent<OwnProps> = (props) => {
	// store
	const { userReducer, sessionReducer } = useSelector((state: State) => state);
	// action
	const dispatch = useDispatch();
	// props
	const { curText, setCurText, setMode, onClickCancel } = props;
	// states

	const onChangeText = (e: any) => {
		setCurText(e.target.value);
	};

	const onClickSelect = () => {
		setMode('select');
	};

	return (
		<div>
			<textarea value={curText} onChange={onChangeText} />
			<button onClick={onClickSelect}>select으로</button>
			<button onClick={onClickCancel}>수정 취소</button>
		</div>
	);
};

export default Temp;
