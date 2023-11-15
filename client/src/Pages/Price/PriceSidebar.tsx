import React, { useEffect, useMemo, useState } from 'react';
import PriceSidebarItem from './PriceSidebarItem';
import classes from '../../styles/Price/PriceSidebar.module.scss';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { fetchCatalogCategories } from '../../store/ActionCreators/PriceActionCreators';
import PriceSidebarButton from './PriceSidebarButton';
import cn from 'classnames';

const PriceSidebar = () => {
	const dispatch = useAppDispatch();
	const { catalogCategories } = useAppSelector((state) => state.priceReducer);
	const [selectedItem, setSelectedItem] = useState({});
	const [showAll, setShowAll] = useState(false);
	const [itemsCount, setItemsCount] = useState(-1);

	useEffect(() => {
		dispatch(fetchCatalogCategories());
	}, [dispatch]);

	const handleSelect = (item: {}) => {
		setSelectedItem(item);
	};

	const hideSidebar = () => {
		setShowAll(false);
	};

	// let defaultShow = -1;
	const itemsList = useMemo(
		() =>
			catalogCategories.map((item) => (
				<PriceSidebarItem
					key={item.id}
					onItemSelect={() => handleSelect(item)}
					selectedItem={selectedItem}
					item={item}
					onHideSidebar={hideSidebar}
					setItemsCount={setItemsCount}
				/>
			)),
		[catalogCategories, selectedItem]
	);

	const showAllByDefault = itemsList.length <= itemsCount;
	const itemsToShow = showAll || showAllByDefault ? itemsList : itemsList.slice(0, itemsCount);

	return (
		<>
			<div className={classes['PriceSidebar']}>
				{showAllByDefault ? null : (
					<PriceSidebarButton onClick={() => setShowAll((val) => !val)}>
						{showAll ? 'Скрыть категории' : 'Показать все категории'}
					</PriceSidebarButton>
				)}
				<div className={classes['item']}>{itemsToShow}</div>
			</div>
		</>
	);
};

export default PriceSidebar;
