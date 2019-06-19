import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'ts/redux/reducers';
// actions
import { userActionConst } from 'ts/redux/actions/user';
// components

type OwnProps = {};

const Index: FunctionComponent<OwnProps> = (props) => {
	// store
	const { userReducer } = useSelector((state: State) => state);
	// action
	const dispatch = useDispatch();
	// state
	const [ email, setEmail ] = useState('');
	const [ password, setPassword ] = useState('');

	const onChangeEmail = (e: any) => {
		setEmail(e.target.value);
	};
	const onChangePassword = (e: any) => {
		setPassword(e.target.value);
	};
	const onClickLogin = () => {
		dispatch({ type: userActionConst.LOGIN, payload: { email, password } });
	};

	return (
		<div className="login">
			<div className="label">Login</div>
			<input className="email" onChange={onChangeEmail} value={email} />
			<input className="password" onChange={onChangePassword} value={password} />
			<button className="login-btn" onClick={onClickLogin}>
				Login
			</button>
		</div>
	);
};

export default Index;
