import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'ts/redux/reducers/index';
// actions
import { userActionConst } from 'ts/redux/actions/user';
// import { subjectActionConstant } from '@actions/subject';
// import { questionActionConstant } from '@actions/question';
// components

// functions

type OwnProps = {};

const Header: FunctionComponent<OwnProps> = (props) => {
	// store
	const { userReducer } = useSelector((state: State) => state);

	const { user } = userReducer;
	// action
	const dispatch = useDispatch();

	const onClickLogout = () => {
		dispatch({ type: userActionConst.LOGOUT });
	};

	return (
		<div className="header">
			<div>Logo</div>
			{user ? <button onClick={onClickLogout}>logout</button> : null}
		</div>
	);
};

export default Header;
