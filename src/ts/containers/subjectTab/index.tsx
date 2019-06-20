import * as React from 'react';
import { FunctionComponent, useState, useEffect, Fragment } from 'react';
import { Guid } from 'guid-typescript';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'ts/redux/reducers';
// models
import { SubjectType } from 'ts/redux/models/subject';
// actions
import { sessionActionConst } from 'ts/redux/actions/session';
// components
import Item from './item';
// func
import { copySubjectList } from 'ts/utils/func';

type OwnProps = {};

const SubjectTab: FunctionComponent<OwnProps> = (props) => {
	// store
	const { userReducer, sessionReducer } = useSelector((state: State) => state);
	const { user } = userReducer;
	const { subjectList } = sessionReducer;
	// action
	const dispatch = useDispatch();
	// state
	const [ curSubjectList, setCurSubjectList ] = useState<SubjectType[]>([]);
	const [ backupSubjectList, setBackupSubjectList ] = useState<SubjectType[]>([]);
	const [ isEdit, setIsEdit ] = useState(false);
	const [ isCancel, setIsCancel ] = useState(false);

	// 1. subjectList가 불러와지면, curSubjectList와 backupSubjectList를 설정한다.
	useEffect(
		() => {
			if (!subjectList) return;
			let nextCurSubjectList = Object.values(subjectList).sort((a, b) => a.order - b.order);
			setCurSubjectList(nextCurSubjectList);
			setBackupSubjectList(copySubjectList(nextCurSubjectList));
		},
		[ subjectList ]
	);

	// 2. 수정을 시작한다.
	const onClickEdit = () => {
		setIsEdit(true);
	};

	// 2-1. subject를 추가한다.
	const onClickAdd = () => {
		if (!user) return;
		const nextId = Guid.create().toString();
		const nextCurSubjectList = curSubjectList.slice();
		nextCurSubjectList.push({
			id: nextId,
			userId: user.id,
			name: 'new subject',
			order: curSubjectList.length
		});
		setCurSubjectList(nextCurSubjectList);
	};

	// 2-2. item 에서 변동되는 이름을 가져온다.
	const getChangedName = (idx: number, name: string): void => {
		const nextCurSubjectList = curSubjectList.slice();
		nextCurSubjectList[idx].name = name;
		setCurSubjectList(nextCurSubjectList);
	};

	// 2-3. item의 순서를 변경한다.
	const onClickOrdering = (idx: number, dir: string) => {
		if (dir === 'up') {
			if (idx === 0) return;
			const nextCurSubjectList = curSubjectList.slice();

			nextCurSubjectList[idx].order = idx - 1;
			nextCurSubjectList[idx - 1].order = idx;
			[ nextCurSubjectList[idx], nextCurSubjectList[idx - 1] ] = [
				nextCurSubjectList[idx - 1],
				nextCurSubjectList[idx]
			];
			setCurSubjectList(nextCurSubjectList);
		} else {
			if (idx === curSubjectList.length - 1) return;
			const nextCurSubjectList = curSubjectList.slice();

			nextCurSubjectList[idx].order = idx + 1;
			nextCurSubjectList[idx + 1].order = idx;
			[ nextCurSubjectList[idx], nextCurSubjectList[idx + 1] ] = [
				nextCurSubjectList[idx + 1],
				nextCurSubjectList[idx]
			];
			setCurSubjectList(nextCurSubjectList);
		}
	};

	// 2-4. item 을 삭제한다.
	const onClickDelete = (idx: number) => {
		const nextCurSubjectList = curSubjectList.slice();
		nextCurSubjectList.splice(idx, 1);
		setCurSubjectList(nextCurSubjectList);
	};

	// 3. 수정 사항을 저장한다.
	// 현재 사항을 backupSubjectList에 저장한다.
	// subjectList 에 반영한다.
	// db에 반영한다.
	const onClickSave = () => {
		setIsEdit(false);
		const nextCurSubjectList = copySubjectList(curSubjectList);
		setBackupSubjectList(nextCurSubjectList);
		dispatch({
			type: sessionActionConst.SAVE_SUBJECT_LIST,
			payload: { subjectList: nextCurSubjectList, postList: {}, putList: {}, deleteList: {} }
		});
	};

	// 4. 수정 사항을 취소한다.
	const onClickCancel = () => {
		setIsEdit(false);
		setIsCancel(true);
		setCurSubjectList(copySubjectList(backupSubjectList));
	};

	useEffect(
		() => {
			if (isCancel) setIsCancel(false);
		},
		[ isCancel ]
	);

	return curSubjectList ? (
		<div className="subject-tab">
			<div className="subject-item-wrap">
				{curSubjectList.map((subject, idx) => (
					<Item
						key={subject.id}
						subject={subject}
						idx={idx}
						isEdit={isEdit}
						onClickOrdering={onClickOrdering}
						getChangedName={getChangedName}
						onClickDelete={onClickDelete}
					/>
				))}
			</div>
			<div className="subject-option-wrap">
				{!isEdit ? (
					<button onClick={onClickEdit}>수정</button>
				) : (
					<Fragment>
						<button onClick={onClickSave}>저장</button>
						<button onClick={onClickAdd}>추가</button>
						<button onClick={onClickCancel}>취소</button>
					</Fragment>
				)}
			</div>
		</div>
	) : null;
};

export default SubjectTab;
