import React, { Dispatch, SetStateAction, useState } from 'react';
import classes from '../../styles/Admin/Admin.module.scss';
import UIButton from '../../UIKit/UIButton';
import TextareaAutosize from 'react-textarea-autosize';

type AdminUpdateVehicleProps = {
	id: number;
	isOpen: boolean;
	onClose: () => void;
	inputName: string;
	vehicleName: string;
	vehicleDescription: string;
	inputDescription: string;
	setVehicleName: Dispatch<SetStateAction<string>>;
	setVehicleDescription: Dispatch<SetStateAction<string>>;
	vehicleImages: FileList | null;
	setVehicleImages: Dispatch<SetStateAction<FileList | null>>;
	onUpdateVehicle: (id: number, name: string, description: string, image: string) => void;
};

const AdminUpdateVehicle: React.FC<AdminUpdateVehicleProps> = ({
	id,
	isOpen,
	onClose,
	inputName,
	inputDescription,
	vehicleImages,
	setVehicleImages,
	onUpdateVehicle,
}) => {
	const [inputNameInternal, setInputNameInternal] = useState(inputName);
	const [inputDescriptionInternal, setInputDescriptionInternal] = useState(inputDescription);
	console.log(vehicleImages);

	const handleInputNameChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputNameInternal(e.target.value);
	};

	const handleInputDescriptionChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
		setInputDescriptionInternal(e.target.value);
	};

	const handleSaveChanges = () => {
		//@ts-ignore
		onUpdateVehicle(id, inputNameInternal, inputDescriptionInternal, vehicleImages);
		console.log('спецтехника - ', id, inputNameInternal, inputDescriptionInternal, vehicleImages);
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
							value={inputNameInternal}
							onChange={handleInputNameChange}
							placeholder='Название'
						/>
					</div>
					<div className={'UIInput'}>
						<TextareaAutosize
							required
							value={inputDescriptionInternal}
							onChange={handleInputDescriptionChange}
							placeholder='Описание'
						/>
					</div>
					<label className={classes['file']}>
						<input
							placeholder={'Добавить файлы'}
							multiple
							minLength={2}
							type='file'
							onChange={(e) => setVehicleImages(e.target.files)}
						/>

						<span className={classes['file-span']}>
							{vehicleImages ? 'Добавлено: ' + vehicleImages.length + ' шт.' : 'Добавить файл'}
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

export default AdminUpdateVehicle;
