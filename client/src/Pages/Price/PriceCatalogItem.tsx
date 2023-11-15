import React, { useEffect } from 'react';
import classes from '../../styles/Price/PriceCatalogItem.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import PriceProductItem from './PriceProductItem';
import { fetchCatalogCategories } from '../../store/ActionCreators/PriceActionCreators';

interface PriceCatalogItemProps {
	name: string;
	img: string;
	id: number;
}

const PriceCatalogItem = ({ id, name, img }: PriceCatalogItemProps) => {
	const dispatch = useAppDispatch();
	const { catalogProducts, currentCatalogCategory, page, limit } = useAppSelector((state) => state.priceReducer);

	useEffect(() => {
		dispatch(fetchCatalogCategories());
	}, [currentCatalogCategory, dispatch, limit, page]);
	const categoryItems = catalogProducts.filter((item) => item.priceCategoryId === id);
	return (
		<div className={classes['PriceCatalogItem']}>
			<div className={classes['title']}>{name}</div>
			<div
				className={classes['catalogImg']}
				style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}${img})` }}
			/>
			{categoryItems.map((item) => (
				<PriceProductItem key={item.id} title={item.name} />
			))}
		</div>
	);
};

export default PriceCatalogItem;
