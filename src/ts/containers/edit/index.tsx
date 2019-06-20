import * as React from 'react';
import { FunctionComponent, useState, useEffect, Fragment } from 'react';
import { Guid } from 'guid-typescript';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'ts/redux/reducers';
// actions
import { sessionActionConst } from 'ts/redux/actions/session';
import { userActionConst } from 'ts/redux/actions/user';
import { subjectActionConstant } from 'ts/redux/actions/subject';
// models
import { SubjectType } from 'ts/redux/models/subject';
import { QuestionType, SelIndexListType } from 'ts/redux/models/question';
import { QuestionMap } from 'ts/redux/models/session';
// components
import Item from './item';
// utils
import { copyQuestionList, clone } from 'ts/utils/func';

type OwnProps = {};

const Temp: FunctionComponent<OwnProps> = (props) => {
	// store
	const { userReducer, sessionReducer } = useSelector((state: State) => state);
	const { user } = userReducer;
	const { subjectList, allQuestionList, selSubjectId } = sessionReducer;
	// action
	const dispatch = useDispatch();
	// state
	const [ _mount, _setMount ] = useState<boolean>(false);

	const [ curSubject, setCurSubject ] = useState<SubjectType | null>(null);
	const [ curQuestionList, setCurQuestionList ] = useState<QuestionType[]>([]);
	const [ backupQuestionList, setBackupQuestionList ] = useState<QuestionType[]>([]);

	const [ isEdit, setIsEdit ] = useState<boolean>(false);
	const [ isCancel, setIsCancel ] = useState<boolean>(false);
	// isCancel:
	// subject에서는 name이 실시간으로 curSubjectList 에 적용되서 필요가 없다.
	// 하지만 question에서는 item 내부에서만 관리되며
	// 저장 시 그 값을 가져와서 처리해야 하고
	// 취소 시 취소를 item에 알려야 한다.
	const [ isSave, setIsSave ] = useState<boolean>(false);

	// 1. selSubjectId가 설정되면,
	// curSubject를 설정한다. (여기서 subject는 수정되지 않으므로 backup은 필요없다.)
	// allQuestionList 에서 selSubject의 id와 일치하는 question을 가져온다.
	// curQuestionList와 backupQuestionList를 설정한다.
	useEffect(
		() => {
			if (!selSubjectId) return;
			setCurSubject(subjectList[selSubjectId]);

			let nextCurQuestionList = Object.values(allQuestionList)
				.filter((question) => question.subjectId === selSubjectId)
				.sort((a, b) => a.order - b.order);

			setCurQuestionList(nextCurQuestionList);
			setBackupQuestionList(copyQuestionList(nextCurQuestionList));
			setIsEdit(false);
			setIsCancel(false);
			_setMount(true);
		},
		[ selSubjectId ]
	);

	// 2. 수정을 시작한다.
	const onClickEdit = () => {
		setIsEdit(true);
	};

	// 2-1. question을 추가한다.
	const onClickAdd = () => {
		if (!user || !selSubjectId) return;
		const nextId = Guid.create().toString();
		const nextCurQuestionList = curQuestionList.slice();
		nextCurQuestionList.push({
			id: nextId,
			userId: user.id,
			subjectId: selSubjectId,
			order: curQuestionList.length,
			name: 'new question',
			text: 'new question',
			selIndexList: {}
		});
		setCurQuestionList(nextCurQuestionList);
	};

	// 2-2 question에서 수정한 값을 가져온다.
	// 2-2-1 name
	const getChangedName = (idx: number, name: string): void => {
		const nextCurQuestionList = copyQuestionList(curQuestionList);
		nextCurQuestionList[idx].name = name;
		setCurQuestionList(nextCurQuestionList);
	};
	// 2-2-2 text
	const getChangedText = (idx: number, text: string): void => {
		const nextCurQuestionList = copyQuestionList(curQuestionList);
		console.log(text);
		nextCurQuestionList[idx].text = text;
		setCurQuestionList(nextCurQuestionList);
	};
	// 2-2-3 selIndexList
	const getChangedSelIndexList = (idx: number, selIndexList: SelIndexListType): void => {
		const nextCurQuestionList = copyQuestionList(curQuestionList);
		nextCurQuestionList[idx].selIndexList = selIndexList;
		setCurQuestionList(nextCurQuestionList);
	};

	// 2-3 question 에서 실시간으로 변하는 값을 가져온다.
	// 2-3-1 ordering
	const onClickOrdering = (idx: number, dir: string) => {
		if (dir === 'up') {
			if (idx === 0) return;
			const nextCurQuestionList = curQuestionList.slice();

			nextCurQuestionList[idx].order = idx - 1;
			nextCurQuestionList[idx - 1].order = idx;
			[ nextCurQuestionList[idx], nextCurQuestionList[idx - 1] ] = [
				nextCurQuestionList[idx - 1],
				nextCurQuestionList[idx]
			];
			setCurQuestionList(nextCurQuestionList);
		} else {
			if (idx === curQuestionList.length - 1) return;
			const nextCurQuestionList = curQuestionList.slice();

			nextCurQuestionList[idx].order = idx + 1;
			nextCurQuestionList[idx + 1].order = idx;
			[ nextCurQuestionList[idx], nextCurQuestionList[idx + 1] ] = [
				nextCurQuestionList[idx + 1],
				nextCurQuestionList[idx]
			];
			setCurQuestionList(nextCurQuestionList);
		}
	};

	// 2-4 question을 삭제한다.
	const onClickDelete = (idx: number) => {
		const nextCurQuestionList = curQuestionList.slice();
		nextCurQuestionList.splice(idx, 1);
		setCurQuestionList(nextCurQuestionList);
	};

	// 2-5 수정 사항을 취소한다.
	const onClickCancel = () => {
		setIsEdit(false);
		setIsCancel(true);
		setCurQuestionList(copyQuestionList(backupQuestionList));
	};
	useEffect(
		() => {
			if (isCancel) setIsCancel(false);
		},
		[ isCancel ]
	);

	// 2-6 변동 사항을 db에 저장한다.
	const onClickSave = () => {
		setIsEdit(false);
		setIsSave(true);

		setBackupQuestionList(copyQuestionList(curQuestionList));
		const nextAllQuestionList = clone(allQuestionList),
			postList: QuestionMap = {},
			putList: QuestionMap = {},
			deleteList: QuestionMap = {};
		curQuestionList.forEach((cur) => {
			const isExist = backupQuestionList.some((back) => cur.id === back.id);
			if (isExist) {
				putList[cur.id] = cur;
			} else {
				postList[cur.id] = cur;
			}
			nextAllQuestionList[cur.id] = cur;
		});

		backupQuestionList.forEach((back) => {
			const isExist = curQuestionList.some((cur) => back.id === cur.id);
			if (!isExist) {
				deleteList[back.id] = back;
				delete nextAllQuestionList[back.id];
			}
		});
		console.log(nextAllQuestionList);
		dispatch({
			type: sessionActionConst.SAVE_QUESTION_LIST,
			payload: { allQuestionList: nextAllQuestionList, postList, putList, deleteList }
		});
	};

	const getQuestion = (question: QuestionType): QuestionType => {
		return question;
	};

	useEffect(
		() => {
			if (isSave) setIsSave(false);
		},
		[ isSave ]
	);

	return _mount ? (
		<div className="edit-wrap">
			<div className="quesiton-list-wrap">
				{curQuestionList.map((question, idx) => (
					<Item
						key={question.id}
						question={question}
						idx={idx}
						isEdit={isEdit}
						isCancel={isCancel}
						isSave={isSave}
						onClickOrdering={onClickOrdering}
						onClickDelete={onClickDelete}
						getQuestion={getQuestion}
						getChangedName={getChangedName}
						getChangedText={getChangedText}
						getChangedSelIndexList={getChangedSelIndexList}
					/>
				))}
			</div>
			<div className="question-list-option-wrap">
				{!isEdit ? (
					<button onClick={onClickEdit}>수정</button>
				) : (
					<Fragment>
						<button onClick={onClickSave}>저장</button>
						<button onClick={onClickCancel}>취소</button>
						<button onClick={onClickAdd}>추가</button>
					</Fragment>
				)}
			</div>
		</div>
	) : null;
};

export default Temp;
