import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'ts/redux/reducers';
// actions
import { userActionConst } from 'ts/redux/actions/user';
import { subjectActionConstant } from 'ts/redux/actions/subject';
// models
import { SelIndexListType } from 'ts/redux/models/question';
// components

type OwnProps = {
	textArr: string[];
	selIndexList: object;
	setMode(mode: string): void;
	isEdit: boolean;
};

const Temp: FunctionComponent<OwnProps> = (props) => {
	// store
	const { userReducer, sessionReducer } = useSelector((state: State) => state);
	// action
	const dispatch = useDispatch();
	// props
	const { textArr, selIndexList, setMode, isEdit } = props;

	const onClickEditText = () => {
		setMode('input');
	};
	const onClickSelectKeyword = () => {
		setMode('select');
	};

	return (
		<div className="question-done">
			<div className="question-text-wrap">
				{textArr.map((word, i) => (
					<div key={i} className={`done-text`}>
						{word}
					</div>
				))}
			</div>
			{isEdit && (
				<div className="question-done-option-wrap">
					<button onClick={onClickEditText}>text 수정</button>
					<button onClick={onClickSelectKeyword}>blank 수정</button>
				</div>
			)}
		</div>
	);
};

export default Temp;
