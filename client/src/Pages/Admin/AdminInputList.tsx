import React, { useState, SetStateAction, Dispatch, FormEvent } from 'react';
import classes from '../../styles/Admin/Admin.module.scss';
import UIButton from '../../UIKit/UIButton';

interface AdminInputListProps {
	catalogProductName: string;
	setCatalogProductName: Dispatch<SetStateAction<string>>;
	onCreateProduct: () => void;
}

const AdminInputList = (props: AdminInputListProps) => {
	const { catalogProductName, setCatalogProductName, onCreateProduct } = props;
	const [inputList, setInputList] = useState([{ value: '' }]);

	const handleAddInput = () => {
		const newInput = { value: '' };
		setInputList([...inputList, newInput]);
	};

	const handleInputChange = (index: number, event: FormEvent<HTMLInputElement>) => {
		const newList = [...inputList];
		newList[index].value = event.currentTarget.value;
		setInputList(newList);
	};

	const handleSaveValues = () => {
		const values = inputList.map((input) => setCatalogProductName(input.value));
		console.log(values);
		// onCreateProduct(values)
	};
	return (
		<div style={{ display: 'flex', flexDirection: 'column' }}>
			{inputList.map((input, index) => (
				<input key={index} value={input.value} onChange={(event) => handleInputChange(index, event)} />
			))}
			<button onClick={handleAddInput}>Добавить поле</button>
			<button onClick={handleSaveValues}>Сохранить</button>
		</div>
		// <>
		// 	<div className={classes['Admin__item-categories-form']} style={{ flexDirection: 'column' }}>
		// 		<div className={'UIInput'}>
		// 			<input
		// 				required
		// 				value={catalogProductName}
		// 				onChange={(e) => setCatalogProductName(e.currentTarget.value)}
		// 			/>
		// 			<div className={'UIInput-placeholder'}>Название товара</div>
		// 		</div>
		// 	</div>
		// 	<UIButton type={'text-small'} onClick={() => onCreateProduct()}>
		// 		Добавить товар
		// 	</UIButton>
		// </>
	);
};

export default AdminInputList;
