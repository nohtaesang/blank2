import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'ts/redux/reducers/index';
// components
import Login from 'ts/containers/login';
import SubjectTab from 'ts/containers/subjectTab';
import Placeholder from 'ts/containers/placeholder';
import Edit from 'ts/containers/edit';
import Test from 'ts/containers/test';

// functions

type OwnProps = {};

const Content: FunctionComponent<OwnProps> = (props) => {
	// store
	const { userReducer, sessionReducer } = useSelector((state: State) => state);
	const { user } = userReducer;
	const { selSubjectId } = sessionReducer;

	return (
		<div className="content">
			<div>Content</div>

			{!user ? (
				<div className="before-login">
					<Login />
				</div>
			) : (
				<div className="after-login">
					<SubjectTab />
					<div className="subject-wrap">
						{!selSubjectId ? (
							<div className="before-select">
								<Placeholder />
							</div>
						) : (
							<div className="after-select">{true ? <Edit /> : <Test />}</div>
						)}
					</div>
				</div>
			)}
		</div>
	);
};

export default Content;
