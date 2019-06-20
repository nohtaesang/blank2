import * as React from 'react';
import { FunctionComponent, useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'ts/redux/reducers';

// models
import { SubjectType } from 'ts/redux/models/subject';
// actions
import { sessionActionConst } from 'ts/redux/actions/session';
// components

type OwnProps = {
	subject: SubjectType;
	idx: number;
	isEdit: boolean;
	onClickOrdering(idx: number, dir: string): void;
	getChangedName(idx: number, name: string): void;
	onClickDelete(idx: number): void;
};

const Item: FunctionComponent<OwnProps> = (props) => {
	// store
	const { userReducer, sessionReducer } = useSelector((state: State) => state);
	const { allQuestionList, selQuestionList, selSubjectId } = sessionReducer;
	// action
	const dispatch = useDispatch();
	// props
	const { subject, idx, isEdit, onClickOrdering, getChangedName, onClickDelete } = props;
	// states
	const [ curName, setCurName ] = useState<string>(subject.name);
	const [ backupName, setBackupName ] = useState<string>('');

	// 1. tab 을 눌렀을 경우 selSubjectId를 설정한다.
	const onClickItem = () => {
		if (selSubjectId === subject.id) return;
		dispatch({ type: sessionActionConst.SET_SEL_SUBECT_ID, payload: subject.id });
	};

	// 2-1. 수정이 시작되면 현재 이름을 백업한다.
	useEffect(
		() => {
			if (!isEdit) return;
			setBackupName(subject.name);
		},
		[ isEdit ]
	);

	// 2-2. 수정이 취소되면 원래 이름으로 복구한다.
	// subject.name이 변경되었지만, 현재 name 과 다른 경우
	// => 수정이 취소되었을 때
	useEffect(
		() => {
			if (subject.name === curName) return;
			setCurName(subject.name);
		},
		[ subject.name ]
	);

	// 2-3. 이름을 변경하는 handler
	const onChangeName = (e: any) => {
		setCurName(e.target.value);
		getChangedName(idx, e.target.value);
	};

	return (
		<div className="subject-item">
			{!isEdit ? (
				<button className="subject-sel-btn" onClick={onClickItem}>
					{subject.name}
				</button>
			) : (
				<div className="subject-edit-form">
					<input value={curName} onChange={onChangeName} />
					<div className="subject-order-btn-wrap">
						<i className="xi-angle-up-min subject-order-btn" onClick={() => onClickOrdering(idx, 'up')} />
						<i
							className="xi-angle-down-min subject-order-btn"
							onClick={() => onClickOrdering(idx, 'down')}
						/>
					</div>
					<i className="xi-minus-circle-o subject-delete-btn" onClick={() => onClickDelete(idx)} />
				</div>
			)}
		</div>
	);
};

export default Item;
