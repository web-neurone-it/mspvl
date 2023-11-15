import React, { useEffect, useState } from 'react';
import Background from '../../Components/Background';
import Layout from '../../Components/Layout';
import classes from '../../styles/Admin/Admin.module.scss';
import Navbar from '../../Components/Navbar';
import UIButton from '../../UIKit/UIButton';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import {
	createCategory,
	createVehicle,
	deleteCategory,
	deleteVehicle,
	fetchCategories,
	fetchVehicles,
	setCurrentCategory,
	updateCategory,
	updateVehicle,
} from '../../store/ActionCreators/VehicleActionCreators';
import {
	createCatalogCategory,
	createCatalogProduct,
	deleteCatalogCategory,
	deleteCatalogProduct,
	fetchCatalogCategories,
	fetchCatalogProducts,
	setCurrentCatalogCategory,
	updateCatalogCategory,
	updateCatalogProduct,
} from '../../store/ActionCreators/PriceActionCreators';
import TextareaAutosize from 'react-textarea-autosize';
import Footer from '../../Components/Footer';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import AdminInputList from './AdminInputList';
import { ICategory } from '../../models/BaseItems';
import AdminUpdateCategory from './AdminUpdateCategory';
import AdminUpdateVehicle from './AdminUpdateVehicle';
import AdminUpdatePrice from './AdminUpdatePrice';
import AdminUpdateProduct from './AdminUpdateProduct';

const Admin = () => {
	const [creationCategory, setCreationCategory] = useState<boolean>(false);
	// const [refreshingCategory, setRefreshingCategory] = useState<boolean>(false);
	const [categoryImage, setCategoryImage] = useState<FileList | null>(null);

	const [vehicleCreation, setVehicleCreation] = useState<boolean>(false);
	const [vehicleImages, setVehicleImages] = useState<FileList | null>(null);
	const [vehicleName, setVehicleName] = useState<string>('');
	const [vehicleDescription, setVehicleDescription] = useState<string>('');

	const [creationCatalogCategory, setCreationCatalogCategory] = useState<boolean>(false);
	const [catalogCategoryImage, setCatalogCategoryImage] = useState<FileList | null>(null);
	const [catalogCategoryName, setCatalogCategoryName] = useState<string>('');
	const [creationCatalogProduct, setCreationCatalogProduct] = useState<boolean>(false);
	const [catalogProductName, setCatalogProductName] = useState<string>('');

	const [category, setCategory] = useState<string>('');
	const dispatch = useAppDispatch();
	const { categories, currentCategory, vehicles, limit, page } = useAppSelector((state) => state.vehicleReducer);
	const {
		catalogCategories,
		catalogProducts,
		currentCatalogCategory,
		limit: catalogLimit,
		page: catalogPage,
	} = useAppSelector((state) => state.priceReducer);

	///////////////////////////////////////
	interface ProductInput {
		name: string;
	}

	const [productInputs, setProductInputs] = useState<ProductInput[]>([{ name: '' }]);
	// console.log('Список наименований - ', productInputs);

	const handleProductNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
		const newProductInputs = [...productInputs];
		newProductInputs[index].name = event.target.value;
		setProductInputs(newProductInputs);
	};

	const handleAddProductInput = () => {
		setProductInputs([...productInputs, { name: '' }]);
	};

	const handleAddProductToList = () => {
		console.log('Список наименований - ', productInputs);
		productInputs.forEach((input, index) => {
			createCatalogProductHandler(input.name);
		});
	};

	///////////////////////////////////////
	///////////////////////////////////////
	///////////////////////////////////////
	interface Input {
		name: string;
		description: string;
		file: FileList | null;
	}

	const [inputs, setInputs] = useState<Input[]>([{ name: '', description: '', file: null }]);
	// console.log('Список техники - ', inputs);

	const handleNameChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
		const newInputs = [...inputs];
		newInputs[index].name = event.target.value;
		setInputs(newInputs);
	};

	const handleDescriptionChange = (index: number, event: React.ChangeEvent<HTMLTextAreaElement>) => {
		const newInputs = [...inputs];
		newInputs[index].description = event.target.value;
		setInputs(newInputs);
	};

	const handleFileChange = (index: number, event: React.ChangeEvent<HTMLInputElement>) => {
		const newInputs = [...inputs];
		const file = event.target.files;
		if (file) {
			newInputs[index].file = file;
			setInputs(newInputs);
		}
	};

	const handleAddInput = () => {
		setInputs([...inputs, { name: '', description: '', file: null }]);
	};

	const handleAddToList = () => {
		console.log('Список техники - ', inputs);
		inputs.forEach((input, index) => {
			createVehicleHandler(input.name, input.description, input.file);
		});
	};
	///////////////////////////////////////

	useDocumentTitle('МСП - Админ-панель');

	const createCategoryHandler = () => {
		if (categoryImage && category) {
			dispatch(createCategory(category, categoryImage)).then(() => dispatch(fetchCategories()));
			setCreationCategory(false);
			setCategoryImage(null);
			setCategory('');
		} else {
			alert('Заполните все поля !');
		}
	};

	const updateCategoryHandler = (id: number, name: string, image: FileList | null) => {
		if (name && image) {
			dispatch(updateCategory(id, name, image)).then(() => dispatch(fetchCategories()));
			setCreationCategory(false);
			setCategoryImage(null);
			setCategory('');
		} else {
			alert('Заполните все поля !');
		}
	};

	const createVehicleHandler = (name: string, description: string, images: FileList | null) => {
		if (currentCategory.id !== 0 && name && description && images && images.length > 1) {
			dispatch(createVehicle(currentCategory, name, description, images)).then(() =>
				dispatch(fetchVehicles(currentCategory, page, limit))
			);
			setVehicleCreation(false);
			setVehicleName('');
			setVehicleDescription('');
			setVehicleImages(null);
		}
	};

	const updateVehicleHandler = (id: string, name: string, description: string, images: FileList | null) => {
		if (name && description && images && images.length > 1) {
			dispatch(updateVehicle(id, currentCategory, name, description, images)).then(() =>
				dispatch(fetchVehicles(currentCategory, page, limit))
			);
			setVehicleCreation(false);
			setVehicleName('');
			setVehicleDescription('');
			setVehicleImages(null);
		}
	};

	const createCatalogCategoryHandler = () => {
		console.log(catalogCategoryImage, catalogCategoryName);
		if (catalogCategoryImage && catalogCategoryName) {
			dispatch(createCatalogCategory(catalogCategoryName, catalogCategoryImage)).then(() =>
				dispatch(fetchCatalogCategories())
			);
			setCreationCatalogCategory(false);
			setCatalogCategoryImage(null);
			setCatalogCategoryName('');
		} else {
			alert('Заполните все поля !');
		}
	};

	const updateCatalogCategoryHandler = (id: string, name: string, image: FileList) => {
		if (catalogCategoryImage && catalogCategoryName) {
			dispatch(updateCatalogCategory(id, name, image)).then(() => dispatch(fetchCatalogCategories()));
			setCreationCatalogCategory(false);
			setCatalogCategoryImage(null);
			setCatalogCategoryName('');
		} else {
			alert('Заполните все поля !');
		}
	};

	const createCatalogProductHandler = (name: string) => {
		console.log(currentCatalogCategory.id, name);
		if (currentCatalogCategory.id !== 0 && name) {
			dispatch(createCatalogProduct(currentCatalogCategory, name)).then(
				() => dispatch(fetchCatalogProducts(currentCatalogCategory, catalogPage, catalogLimit)) // ?????
			);
			setCreationCatalogProduct(false);
			setCatalogProductName('');
		}
	};

	const updateCatalogProductHandler = (id: string, name: string) => {
		if (name) {
			dispatch(updateCatalogProduct(id, name)).then(
				() => dispatch(fetchCatalogProducts(currentCatalogCategory, catalogPage, catalogLimit)) // ?????
			);
			setCreationCatalogProduct(false);
			setCatalogProductName('');
		}
	};

	// const createCatalogProductHandler = () => {
	// 	console.log(currentCatalogCategory.id, catalogProductName);
	// 	if (currentCatalogCategory.id !== 0 && catalogProductName) {
	// 		dispatch(createCatalogProduct(currentCatalogCategory, catalogProductName)).then(() =>
	// 			dispatch(fetchCatalogCategories())
	// 		);
	// 		setCreationCatalogProduct(false);
	// 		setCatalogProductName('');
	// 	} else {
	// 		alert('Заполните все поля!');
	// 	}
	// };

	useEffect(() => {
		dispatch(fetchCategories());
		dispatch(fetchVehicles(currentCategory, page, limit));
		dispatch(fetchCatalogCategories());
		dispatch(fetchCatalogProducts(currentCatalogCategory, page, limit));
	}, [currentCatalogCategory, currentCategory, dispatch, limit, page]);

	const handleModalClose = (name: string) => {
		if (name === 'category') setOpenCategoryIndex(null);
		if (name === 'vehicle') setOpenVehicleIndex(null);
		if (name === 'price') setOpenPriceIndex(null);
		if (name === 'product') setopenProductIndex(null);
	};

	const [openCategoryIndex, setOpenCategoryIndex] = useState<number | null>(null);
	const [openVehicleIndex, setOpenVehicleIndex] = useState<number | null>(null);
	const [openPriceIndex, setOpenPriceIndex] = useState<number | null>(null);
	const [openProductIndex, setopenProductIndex] = useState<number | null>(null);

	const handleEditClick = (index: number, name: string) => {
		if (name === 'category') setOpenCategoryIndex(index === openCategoryIndex ? null : index);
		if (name === 'vehicle') setOpenVehicleIndex(index === openVehicleIndex ? null : index);
		if (name === 'price') setOpenPriceIndex(index === openPriceIndex ? null : index);
		if (name === 'product') setopenProductIndex(index === openProductIndex ? null : index);
	};

	return (
		<Background>
			<Navbar />
			<Layout>
				<div className={classes['Admin']}>
					<div className={classes['Admin__item']}>
						<div className={classes['Admin__item-title']}>Категории спецтехники</div>
						<hr />
						<div className={classes['Admin__item-categories']}>
							{categories.map((i, index) => (
								<div
									className={
										i.id === currentCategory.id
											? classes['Admin__item-categories-item-active']
											: classes['Admin__item-categories-item']
									}
									key={i.id}
									onClick={() => dispatch(setCurrentCategory(i))}
								>
									<div
										className={classes['Admin__item-categories-item-image']}
										style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}${i.img})` }}
									/>
									<p
										className={classes['Admin__item-categories-item-title']}
										style={{ marginRight: 50 }}
									>
										{i.name}
									</p>

									<div style={{ display: 'flex', gap: '0 10px' }}>
										{openCategoryIndex === index ? (
											<AdminUpdateCategory
												isOpen={openCategoryIndex === index}
												onClose={() => handleModalClose('category')}
												inputValue={i.name}
												// onInputChange={() => setCategory(i.name)}
												categoryImage={categoryImage}
												//@ts-ignore
												onUpdateCategory={updateCategoryHandler}
												id={i.id}
												setCategory={setCategory}
												setCategoryImage={setCategoryImage}
												category={category}
											/>
										) : (
											<UIButton
												type={'outline'}
												onClick={() => handleEditClick(index, 'category')}
											>
												Изменить
											</UIButton>
										)}
										<UIButton
											type={'outline'}
											onClick={() =>
												dispatch(deleteCategory(i)).then(() => dispatch(fetchCategories()))
											}
										>
											Удалить
										</UIButton>
									</div>
								</div>
							))}
						</div>
						{creationCategory ? (
							<div
								className={classes['Admin__item-categories-form']}
								style={creationCategory && { flexDirection: 'column' }}
							>
								<div className={'UIInput'}>
									<input
										required
										value={category}
										onChange={(e) => setCategory(e.currentTarget.value)}
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
								<UIButton type={'outline'} onClick={() => createCategoryHandler()}>
									Добавить категорию
								</UIButton>
							</div>
						) : (
							<UIButton type={'outline'} onClick={() => setCreationCategory(true)}>
								Добавить Категорию
							</UIButton>
						)}
					</div>
					<div className={classes['Admin__item']}>
						<div className={classes['Admin__item-title']}>Каталог спецтехники</div>
						<hr />
						<div className={classes['Admin__item-categories']}>
							{vehicles.rows.map((i: any, index) => (
								<div
									className={
										i === currentCategory
											? classes['Admin__item-categories-item-active']
											: classes['Admin__item-categories-item']
									}
									key={i.id}
								>
									<div
										className={classes['Admin__item-categories-item-image']}
										style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}${i.image})` }}
									/>
									<p
										className={classes['Admin__item-categories-item-title']}
										style={{ marginRight: 50 }}
									>
										{i.name}
									</p>

									<div style={{ display: 'flex', gap: '0 10px' }}>
										{openVehicleIndex === index ? (
											<AdminUpdateVehicle
												id={i.id}
												isOpen={openVehicleIndex === index}
												onClose={() => handleModalClose('vehicle')}
												inputName={i.name}
												inputDescription={i.description}
												// onInputChange={() => setCategory(i.name)}
												vehicleImages={vehicleImages}
												//@ts-ignore
												onUpdateVehicle={updateVehicleHandler}
												setVehicleImages={setVehicleImages}
												setVehicleName={setVehicleName}
												setVehicleDescription={setVehicleDescription}
											/>
										) : (
											<UIButton
												type={'outline'}
												onClick={() => handleEditClick(index, 'vehicle')}
											>
												Изменить
											</UIButton>
										)}
										<UIButton
											type={'outline'}
											onClick={() =>
												dispatch(deleteVehicle(i)).then(() =>
													dispatch(fetchVehicles(currentCategory, page, limit))
												)
											}
										>
											Удалить
										</UIButton>
									</div>
								</div>
							))}
						</div>

						{vehicleCreation ? ( //////////////////////////////////////////////////////////
							<div>
								{inputs.map((input, index) => (
									<div
										className={classes['Admin__item-categories-form']}
										style={{
											flexDirection: 'row',
											alignItems: 'center',
											flexWrap: 'wrap',
											padding: 10,
											border: '1px solid white',
										}}
										key={index}
									>
										<div className={'UIInput'}>
											<input
												type='text'
												value={input.name}
												onChange={(event) => handleNameChange(index, event)}
												placeholder='Название'
											/>
										</div>
										<div className={'UIInput'}>
											<TextareaAutosize
												value={input.description}
												onChange={(event) => handleDescriptionChange(index, event)}
												placeholder='Описание'
											/>
										</div>
										<label className={classes['file']}>
											<input
												placeholder={'Добавить файлы'}
												multiple
												minLength={2}
												type='file'
												onChange={(event) => handleFileChange(index, event)}
											/>
											<span className={classes['file-span']}>
												{input.file
													? 'Добавлено: ' + input.file.length + ' шт.'
													: 'Добавить файл'}
											</span>
										</label>
									</div>
								))}
								<div style={{ display: 'flex', gap: '0 10px', paddingTop: 10 }}>
									<UIButton type='outline' onClick={handleAddInput}>
										Добавить поле
									</UIButton>
									<UIButton type='outline' onClick={handleAddToList}>
										Сохранить
									</UIButton>
								</div>
							</div>
						) : (
							// <div
							// 	className={classes['Admin__item-categories-form']}
							// 	style={{ flexDirection: 'row', alignItems: 'center' }}
							// >
							// 	<div className={'UIInput'}>
							// 		<input
							// 			required
							// 			value={vehicleName}
							// 			onChange={(e) => setVehicleName(e.currentTarget.value)}
							// 		/>
							// 		<div className={'UIInput-placeholder'}>Название</div>
							// 	</div>
							// 	<div className={'UIInput'}>
							// 		<TextareaAutosize
							// 			required
							// 			value={vehicleDescription}
							// 			onChange={(e) => setVehicleDescription(e.currentTarget.value)}
							// 		/>
							// 		<div className={'UIInput-placeholder'}>Описание</div>
							// 	</div>
							// 	<label className={classes['file']}>
							// 		<input
							// 			placeholder={'Добавить файлы'}
							// 			type='file'
							// 			minLength={2}
							// 			multiple
							// 			onChange={(e) => setVehicleImages(e.target.files)}
							// 		/>
							// 		<span className={classes['file-span']}>
							// 			{vehicleImages
							// 				? 'Добавлено: ' + vehicleImages.length + ' шт.'
							// 				: 'Добавить файл'}
							// 		</span>
							// 	</label>
							// 	<UIButton type={'text-small'} onClick={() => createVehicleHandler()}>
							// 		Добавить технику
							// 	</UIButton>
							// </div>
							<UIButton type={'outline'} onClick={() => setVehicleCreation(true)}>
								Добавить технику
							</UIButton>
						)}
					</div>
					{/* ////// */}

					<div className={classes['Admin__item']}>
						<div className={classes['Admin__item-title']}>Категории прайс-листа</div>
						<hr />
						<div className={classes['Admin__item-categories']}>
							{catalogCategories.map((i, index) => (
								<div
									className={
										i.id === currentCatalogCategory.id
											? classes['Admin__item-categories-item-active']
											: classes['Admin__item-categories-item']
									}
									key={i.id}
									onClick={() => dispatch(setCurrentCatalogCategory(i))}
								>
									<div
										className={classes['Admin__item-categories-item-image']}
										style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}${i.img})` }}
									/>
									<p
										className={classes['Admin__item-categories-item-title']}
										style={{ marginRight: 50 }}
									>
										{i.name}
									</p>

									<div style={{ display: 'flex', gap: '0 10px' }}>
										{openPriceIndex === index ? (
											<AdminUpdatePrice
												id={i.id}
												isOpen={openPriceIndex === index}
												onClose={() => handleModalClose('price')}
												inputValue={i.name}
												categoryImage={catalogCategoryImage}
												//@ts-ignore
												onUpdatePrice={updateCatalogCategoryHandler}
											/>
										) : (
											<UIButton type={'outline'} onClick={() => handleEditClick(index, 'price')}>
												Изменить
											</UIButton>
										)}
										<UIButton
											type={'outline'}
											onClick={() =>
												dispatch(deleteCatalogCategory(i)).then(() =>
													dispatch(fetchCatalogCategories())
												)
											}
										>
											Удалить
										</UIButton>
									</div>
								</div>
							))}
						</div>
						{creationCatalogCategory ? (
							<div
								className={classes['Admin__item-categories-form']}
								style={creationCatalogCategory && { flexDirection: 'column' }}
							>
								<div className={'UIInput'}>
									<input
										required
										value={catalogCategoryName}
										onChange={(e) => setCatalogCategoryName(e.currentTarget.value)}
										placeholder='Категория'
									/>
									{/* <div className={'UIInput-placeholder'}>Категория</div> */}
								</div>
								<label className={classes['file']}>
									<input
										placeholder={'Добавить файл'}
										type='file'
										onChange={(e) => setCatalogCategoryImage(e.target.files)}
									/>
									<span className={classes['file-span']}>
										{catalogCategoryImage
											? catalogCategoryImage[0].name.length > 20
												? `${catalogCategoryImage[0].name.substring(0, 20)}...`
												: catalogCategoryImage[0].name
											: 'Добавить файл'}
									</span>
								</label>
								<UIButton type={'outline'} onClick={() => createCatalogCategoryHandler()}>
									Добавить категорию
								</UIButton>
							</div>
						) : (
							<UIButton type={'outline'} onClick={() => setCreationCatalogCategory(true)}>
								Добавить Категорию
							</UIButton>
						)}
					</div>

					{/* ////////// */}

					<div className={classes['Admin__item']}>
						<div className={classes['Admin__item-title']}>Каталог прайс-листа</div>
						<hr />
						<div className={classes['Admin__item-categories']}>
							{catalogProducts.map((i: any, index) => (
								<div
									key={i.id}
									className={classes['Admin__item-categories-item']} /////
									// className={
									// 	i.id === currentCatalogCategory.id
									// 		? classes['Admin__item-categories-item-active']
									// 		: classes['Admin__item-categories-item']
									// }
								>
									<div className={classes['Admin__item-categories-item-image']} />
									<p
										className={classes['Admin__item-categories-item-title']}
										style={{ marginRight: 50 }}
									>
										{i.name}
									</p>

									<div style={{ display: 'flex', gap: '0 10px' }}>
										{openProductIndex === index ? (
											<AdminUpdateProduct
												id={i.id}
												isOpen={openProductIndex === index}
												onClose={() => handleModalClose('product')}
												inputValue={i.name}
												//@ts-ignore
												onUpdateProduct={updateCatalogProductHandler}
												setCatalogProductName={setCatalogProductName}
											/>
										) : (
											<UIButton
												type={'outline'}
												onClick={() => handleEditClick(index, 'product')}
											>
												Изменить
											</UIButton>
										)}
										<UIButton
											type={'outline'}
											onClick={() =>
												dispatch(deleteCatalogProduct(i)).then(() =>
													dispatch(fetchCatalogCategories())
												)
											}
										>
											Удалить
										</UIButton>
									</div>
								</div>
							))}
						</div>
						{creationCatalogProduct ? (
							// <AdminInputList catalogProductName={catalogProductName} setCatalogProductName={setCatalogProductName} onCreateProduct={createCatalogProductHandler} />

							// <div className={classes['Admin__item-categories-form']} style={{ flexDirection: 'column' }}>
							// 	<div className={'UIInput'}>
							// 		<input
							// 			required
							// 			value={catalogProductName}
							// 			onChange={(e) => setCatalogProductName(e.currentTarget.value)}
							// 		/>
							// 		<div className={'UIInput-placeholder'}>Название товара</div>
							// 	</div>
							// 	<UIButton type={'text-small'} onClick={() => createCatalogProductHandler()}>
							// 		Добавить товар
							// 	</UIButton>
							// </div>

							<div>
								{productInputs.map((product, index) => (
									<div
										key={index}
										className={classes['Admin__item-categories-form']}
										style={{ flexDirection: 'column' }}
									>
										<div className={'UIInput'}>
											<input
												required
												value={product.name}
												onChange={(event) => handleProductNameChange(index, event)}
												placeholder='Название товара'
											/>
										</div>
									</div>
								))}
								<div style={{ display: 'flex', gap: '0 10px', paddingTop: 10 }}>
									<UIButton type='outline' onClick={handleAddProductInput}>
										Добавить поле
									</UIButton>
									<UIButton type={'outline'} onClick={handleAddProductToList}>
										Сохранить
									</UIButton>
								</div>
							</div>
						) : (
							<UIButton type={'outline'} onClick={() => setCreationCatalogProduct(true)}>
								Добавить товар
							</UIButton>
						)}
					</div>
				</div>
			</Layout>
			<Footer />
		</Background>
	);
};

export default Admin;
