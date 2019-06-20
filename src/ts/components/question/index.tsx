import * as React from 'react';
import { FunctionComponent, useState, useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { State } from 'ts/redux/reducers';
// actions
import { userActionConst } from 'ts/redux/actions/user';
import { subjectActionConstant } from 'ts/redux/actions/subject';
// models
import { QuestionType, SelIndexListType } from 'ts/redux/models/question';
// components
import Input from './input';
import Select from './select';
import Done from './done';
// functions
import { clone } from 'ts/utils/func';

type OwnProps = {
	question: QuestionType;
	idx: number;
	isEdit: boolean;
};

const Temp: FunctionComponent<OwnProps> = (props) => {
	// store
	const { userReducer, sessionReducer } = useSelector((state: State) => state);
	// action
	const dispatch = useDispatch();
	// props
	const { question, idx, isEdit } = props;
	const { text, selIndexList } = question;
	// state
	const [ curQuesiton, setCurQuestion ] = useState<QuestionType>(question);
	const [ backupQuestion, setBackupQuestion ] = useState<QuestionType>();

	const [ curText, setCurText ] = useState(text);
	const [ backupText, setBackupText ] = useState(text);
	const [ mode, setMode ] = useState<string>('mode');

	const [ textArr, setTextArr ] = useState<string[]>([]);
	const [ curSelIndexList, setCurSelIndexList ] = useState<SelIndexListType>(selIndexList);
	const [ backupSelIndexList, setBackupSelIndexList ] = useState<SelIndexListType>(selIndexList);

	useEffect(() => {
		const nextBackupQuestion = clone(curQuesiton);
		setBackupQuestion(nextBackupQuestion);
		textToArr();
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

	const textToArr = () => {
		const nextTextArr = curText.split(' ');
		setTextArr(nextTextArr);
	};
	// 1-1. input
	const onClickSelectInInput = () => {};
	const onClickCancelInInput = () => {};
	const onChangeCurText = () => {};

	// 1-2. select
	const onClickDoneInSelect = () => {};
	const onClickCancelInSelect = () => {};
	const onClickKeyword = () => {};

	// 1-3. done
	const onClickInputInDone = () => {};
	const onClickSelectInDone = () => {};

	const onClickCancel = () => {
		setMode('done');
		setCurText(backupText);
		setCurSelIndexList(backupSelIndexList);
	};

	return (
		<div className="question">
			{mode === 'input' ? (
				<Input curText={curText} setCurText={setCurText} setMode={setMode} onClickCancel={onClickCancel} />
			) : mode === 'select' ? (
				<Select />
			) : (
				<Done isEdit={isEdit} textArr={textArr} selIndexList={selIndexList} setMode={setMode} />
			)}
		</div>
	);
};

export default Temp;
