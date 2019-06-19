import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'ts/redux/reducers';
// actions
import { userActionConst } from 'ts/redux/actions/user';
import { subjectActionConstant } from 'ts/redux/actions/subject';
// models
import { SelIndexList } from 'ts/redux/models/question';
// components

type OwnProps = {
	textArr: string[];
	selIndexList: object;
};

const Temp: FunctionComponent<OwnProps> = (props) => {
	// store
	const { userReducer, sessionReducer } = useSelector((state: State) => state);
	// action
	const dispatch = useDispatch();
	// props
	const { textArr, selIndexList } = props;
	console.log(textArr, selIndexList);

	return (
		<div className="question-text">
			{textArr.map((word, i) => (
				<div key={i} className={`done-text`}>
					{word}
				</div>
			))}
		</div>
	);
};

export default Temp;
