import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'ts/redux/reducers';
// actions
import { userActionConst } from 'ts/redux/actions/user';
import { sessionActionConst } from 'ts/redux/actions/session';
// import { subjectActionConstant } from '@actions/subject';
// import { questionActionConstant } from '@actions/question';
// components
import Header from 'ts/layouts/header';
import Content from 'ts/layouts/content';

type OwnProps = {};

const App: FunctionComponent<OwnProps> = (props) => {
	// store
	const { userReducer } = useSelector((state: State) => state);
	const { user, initUser } = userReducer;
	// action
	const dispatch = useDispatch();

	// 1. session을 확인하여 user 설정
	useEffect(() => {
		const nextUser = localStorage.getItem('user');
		if (nextUser) {
			dispatch({ type: userActionConst.SET_USER, payload: JSON.parse(nextUser) });
		} else {
			dispatch({ type: userActionConst.SET_USER, payload: null });
		}
	}, []);

	// 2. 로그인 했을 경우 subjectList, allQuestionList 가져오기
	useEffect(
		() => {
			if (!user) return;
			const { id } = user;
			dispatch({ type: sessionActionConst.GET_USER_DATA, payload: id });
		},
		[ user ]
	);

	return initUser ? (
		<div className="main">
			<Header />
			<Content />
		</div>
	) : null;
};

export default App;
