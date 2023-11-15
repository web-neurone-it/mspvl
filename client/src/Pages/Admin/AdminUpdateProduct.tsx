import React, { Dispatch, SetStateAction, useState } from 'react';
import classes from '../../styles/Admin/Admin.module.scss';
import UIButton from '../../UIKit/UIButton';
import TextareaAutosize from 'react-textarea-autosize';

type AdminUpdateProductProps = {
	id: number;
	isOpen: boolean;
	onClose: () => void;
	inputValue: string;
	onUpdateProduct: (id: number, name: string, image: string) => void;
	setCatalogProductName: Dispatch<React.SetStateAction<string>>;
};

const AdminUpdateProduct: React.FC<AdminUpdateProductProps> = ({
	isOpen,
	onClose,
	inputValue,
	onUpdateProduct,
	id,
}) => {
	const [inputValueInternal, setInputValueInternal] = useState(inputValue);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputValueInternal(e.target.value);
	};

	const handleSaveChanges = () => {
		console.log(inputValueInternal);
		//@ts-ignore
		onUpdateProduct(id, inputValueInternal);
		console.log('товары - ', id, inputValueInternal);
		onClose();
	};

	return (
		<>
			{isOpen && (
				// <div className='modal'>
				// <input type='text' value={inputValueInternal} onChange={handleInputChange} />
				// <button onClick={handleSaveChanges}>Сохранить</button>
				// <button onClick={onClose}>Отмена</button>
				// </div>

				<div
					className={classes['Admin__item-categories-form']}
					style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}
				>
					<div className={'UIInput'}>
						<TextareaAutosize
							required
							value={inputValueInternal}
							onChange={handleInputChange}
							placeholder='Категория'
						/>
					</div>
					<UIButton type='outline' onClick={handleSaveChanges}>
						Сохранить
					</UIButton>
					<UIButton type='outline' onClick={onClose}>
						Отмена
					</UIButton>
					{/* <UIButton type={'text-small'} onClick={() => onUpdateCategory()}>
						Добавить категорию
					</UIButton> */}
				</div>
			)}
		</>
	);
};

export default AdminUpdateProduct;
