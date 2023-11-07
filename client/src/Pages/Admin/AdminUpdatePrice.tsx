import React, { Dispatch, SetStateAction, useState } from 'react';
import classes from '../../styles/Admin/Admin.module.scss';
import UIButton from '../../UIKit/UIButton';
import TextareaAutosize from 'react-textarea-autosize';

type AdminUpdatePriceProps = {
	id: number;
	isOpen: boolean;
	onClose: () => void;
	inputValue: string;
	// onInputChange: (value: string) => void;
	categoryImage: FileList | null;
	onUpdatePrice: (id: number, name: string, image: string) => void;
	setCategory: Dispatch<React.SetStateAction<string>>;
	setCategoryImage: Dispatch<SetStateAction<FileList | null>>;
	category: string;
};

const AdminUpdatePrice: React.FC<AdminUpdatePriceProps> = ({
	id,
	isOpen,
	onClose,
	inputValue,
	categoryImage,
	setCategoryImage,
	onUpdatePrice,
}) => {
	const [inputValueInternal, setInputValueInternal] = useState(inputValue);

	const handleInputChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        e.preventDefault();
        e.stopPropagation()
		setInputValueInternal(e.target.value);
	};

	const handleSaveChanges = () => {
		//@ts-ignore
		onUpdatePrice(id, inputValueInternal, categoryImage);
		console.log('категории прайс-листа - ', id, inputValueInternal, categoryImage);
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
					<label className={classes['file']}>
						<input
							placeholder={'Добавить файл'}
							type='file'
							onChange={(e) => setCategoryImage(e.target.files)}
						/>
						<span className={classes['file-span']}>
							{categoryImage
								? categoryImage[0].name.length > 20
									? `${categoryImage[0].name.substring(0, 20)}...`
									: categoryImage[0].name
								: 'Добавить файл'}
						</span>
					</label>
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

export default AdminUpdatePrice;
