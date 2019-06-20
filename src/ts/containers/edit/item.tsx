import * as React from 'react';
import { FunctionComponent, useState, useEffect, Fragment } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'ts/redux/reducers';
// actions
import { userActionConst } from 'ts/redux/actions/user';
import { subjectActionConstant } from 'ts/redux/actions/subject';
// models
import { QuestionType, SelIndexListType } from 'ts/redux/models/question';
// components
// functions
import { clone } from 'ts/utils/func';
// static
import symbolArr from 'static/js/symbolArr';

type OwnProps = {
	question: QuestionType;
	idx: number;
	isEdit: boolean;
	isCancel: boolean;
	isSave: boolean;
	onClickOrdering(idx: number, dir: string): void;
	onClickDelete(idx: number): void;
	getQuestion(question: QuestionType): QuestionType;
	getChangedName(idx: number, name: string): void;
	getChangedText(idx: number, text: string): void;
	getChangedSelIndexList(idx: number, selIndexList: SelIndexListType): void;
};

type TextArrType = {
	type: string;
	content: string;
};

const Item: FunctionComponent<OwnProps> = (props) => {
	// store
	const { userReducer, sessionReducer } = useSelector((state: State) => state);
	// action
	const dispatch = useDispatch();
	// props
	const {
		question,
		idx,
		isEdit,
		isCancel,
		isSave,
		onClickOrdering,
		onClickDelete,
		getChangedName,
		getChangedText,
		getChangedSelIndexList
	} = props;
	const { text, name, selIndexList } = question;
	// state
	const [ curQuesiton, setCurQuestion ] = useState<QuestionType>(question);
	const [ backupQuestion, setBackupQuestion ] = useState<QuestionType>();
	const [ curName, setCurName ] = useState(name);
	const [ backupName, setBackupName ] = useState(name);
	const [ curText, setCurText ] = useState(text);
	const [ backupText, setBackupText ] = useState(text);
	const [ curSelIndexList, setCurSelIndexList ] = useState<SelIndexListType>(selIndexList);
	const [ backupSelIndexList, setBackupSelIndexList ] = useState<SelIndexListType>(selIndexList);

	const [ mode, setMode ] = useState<string>('mode');
	const [ textArr, setTextArr ] = useState<TextArrType[]>([]);

	useEffect(() => {
		const nextBackupQuestion = clone(curQuesiton);
		setBackupQuestion(nextBackupQuestion);
		textToArr(curText);
	}, []);

	useEffect(
		() => {
			if (mode === 'input') {
			} else if (mode === 'select') {
			} else if (mode === 'done') {
			}
		},
		[ mode ]
	);

	useEffect(
		() => {
			if (!isCancel) return;
			setCurName(backupName);
			setCurText(backupText);
			setCurSelIndexList(backupSelIndexList);
		},
		[ isCancel ]
	);

	useEffect(
		() => {
			if (!isSave) return;
			setBackupName(curName);
			setBackupText(curText);
			setCurSelIndexList(curSelIndexList);
		},
		[ isSave ]
	);

	const textToArr = (text: string) => {
		const length = text.length;
		const nextTextArr: TextArrType[] = [];
		let content = '';

		const pushText = (type: string, content: string) => {
			if (content === '') return;
			const nextText = { type, content };
			nextTextArr.push(nextText);
		};

		for (let i = 0; i < length; i++) {
			const char = text[i];
			if (symbolArr.some((symbol) => symbol === char)) {
				if (char === ' ') {
					pushText('text', content);
					content = '';
					pushText('space', ' ');
				} else if (char === '\n') {
					pushText('text', content);
					content = '';
					pushText('enter', ' ');
				} else {
					pushText('text', content);
					content = '';
					pushText('symbol', char);
				}
			} else {
				content += char;
			}
		}
		pushText('text', content);
		content = '';
		setTextArr(nextTextArr);
	};

	// 1-1. input
	const onClickSelectInInput = () => {
		setMode('select');
		setCurSelIndexList({});
		textToArr(curText);
	};

	const onChangeCurText = (e: any) => {
		setCurText(e.target.value);
		getChangedText(idx, e.target.value);
	};

	// 1-2. select
	const onClickSaveInSelect = () => {
		setMode('done');
	};
	const onClickKeyword = (i: number) => {
		const nextSelIndexList = clone(curSelIndexList);
		if (nextSelIndexList[i]) {
			delete nextSelIndexList[i];
		} else {
			nextSelIndexList[i] = true;
		}
		setCurSelIndexList(nextSelIndexList);
		getChangedSelIndexList(idx, nextSelIndexList);
	};

	// 1-3. done
	const onClickInputInDone = () => {
		setMode('input');
	};

	const onClickSelectInDone = () => {
		setMode('select');
	};

	// 1-4.
	const onChangeCurName = (e: any) => {
		setCurName(e.target.value);
		getChangedName(idx, e.target.value);
	};

	const onClickCancel = () => {
		setMode('done');
		setCurText(backupText);
		textToArr(backupText);
		setCurName(backupName);
		getChangedName(idx, backupName);
		setCurSelIndexList(backupSelIndexList);
	};

	return (
		<div className="question">
			{!isEdit ? (
				<div className="question-wrap">
					<div className="question-title">{curName}</div>
					<div className="question-text">
						{textArr.map((word, i) => {
							const { type, content } = word;

							return (
								<div key={i} className={`text ${type} ${curSelIndexList[i] ? 'sel' : ''} `}>
									{content}
								</div>
							);
						})}
					</div>
				</div>
			) : (
				<Fragment>
					{mode === 'input' ? (
						<div className="question-wrap">
							<input className="question-title-input" value={curName} onChange={onChangeCurName} />
							<textarea className="question-textarea" value={curText} onChange={onChangeCurText} />
							<div className="question-input-option">
								<button onClick={onClickSelectInInput}>keyword 수정</button>
								<button onClick={onClickCancel}>취소</button>
							</div>
						</div>
					) : mode === 'select' ? (
						<div className="question-wrap">
							<input className="question-title-input" value={curName} onChange={onChangeCurName} />
							<div className="question-text">
								{textArr.map((word, i) => {
									const { type, content } = word;
									if (type !== 'text') return null;
									else
										return (
											<button
												key={i}
												className={`keyword-btn ${type} ${curSelIndexList[i] ? 'sel' : ''}`}
												onClick={() => onClickKeyword(i)}
											>
												{content}
											</button>
										);
								})}
							</div>
							<div className="question-option">
								<button onClick={onClickSaveInSelect}>저장</button>
								<button onClick={onClickCancel}>취소</button>
							</div>
						</div>
					) : (
						<div className="question-wrap">
							<input className="question-title-input" value={curName} onChange={onChangeCurName} />
							<div className="question-text">
								{textArr.map((word, i) => {
									const { type, content } = word;

									return (
										<div key={i} className={`text ${type} ${curSelIndexList[i] ? 'sel' : ''} `}>
											{content}
										</div>
									);
								})}
							</div>
							<div className="question-done-option">
								<button onClick={onClickInputInDone}>text 수정</button>
								<button onClick={onClickSelectInDone}>keyword 수정</button>
								<button onClick={onClickCancel}>수정 전으로</button>
							</div>
						</div>
					)}
					<div className="question-list-option">
						<div className="question-order-btn-wrap">
							<i
								className="xi-angle-up-min question-order-btn"
								onClick={() => onClickOrdering(idx, 'up')}
							/>
							<i
								className="xi-angle-down-min question-order-btn"
								onClick={() => onClickOrdering(idx, 'down')}
							/>
						</div>
						<i className="xi-minus-circle-o question-delete-btn" onClick={() => onClickDelete(idx)} />
					</div>
				</Fragment>
			)}
		</div>
	);
};

export default Item;
