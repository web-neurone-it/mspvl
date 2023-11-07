import React, { Dispatch, SetStateAction, useState } from 'react';
import UIButton from '../../UIKit/UIButton';
import classes from '../../styles/Admin/Admin.module.scss';

interface AdminAddCategoryProps {
	category: string;
	setCategory: Dispatch<SetStateAction<string>>;
	categoryImage: FileList | null;
	setCategoryImage: Dispatch<SetStateAction<FileList | null>>;
	onCreateCategory: () => void;
	isCreationCategory: boolean;
	onAddForm: () => void;
}

const AdminAddCategory = (props: AdminAddCategoryProps) => {
    const { category, setCategory, categoryImage, setCategoryImage, onCreateCategory, isCreationCategory, onAddForm } = props;
    
	const [isPushed, setIsPushed] = useState(true);

	const hideButton = () => {
		setIsPushed(!isPushed);
		onAddForm();
	}

	return (
		<div style={{ flexDirection: 'column' }}>
			<div className={classes['Admin__item-categories-form']} style={{ flexDirection: 'row' }}>
				<div className={'UIInput'}>
					<input required value={category} onChange={(e) => setCategory(e.currentTarget.value)} />
					<div className={'UIInput-placeholder'}>Категория</div>
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
			</div>
			<UIButton type={'text-small'} onClick={() => onCreateCategory()}>
				Добавить категорию
			</UIButton>
			{
				<button onClick={hideButton} style={{ width: 50, height: 50 }}>
					+
				</button>
			}
		</div>
	);
};

export default AdminAddCategory;
