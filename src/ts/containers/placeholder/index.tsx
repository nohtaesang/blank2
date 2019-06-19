import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'ts/redux/reducers';
// actions
import { userActionConst } from 'ts/redux/actions/user';
// components

type OwnProps = {};

const Placeholder: FunctionComponent<OwnProps> = (props) => {
	return <div>placeholder</div>;
};

export default Placeholder;
