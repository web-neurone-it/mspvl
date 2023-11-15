import React, { memo, useCallback, useEffect, useState } from 'react';
import classes from '../../styles/Price/PriceSidebarItem.module.scss';
import { ICatalogCategory } from '../../models/BaseItems';
import { Link } from 'react-scroll';
import cn from 'classnames';

interface SidebarItemProps {
	item: ICatalogCategory;
	onItemSelect: () => void;
	selectedItem: {};
	onHideSidebar: () => void;
	setItemsCount: (val: number) => void;
}

const PriceSidebarItem = memo(
	({ item, onItemSelect, selectedItem, onHideSidebar, setItemsCount }: SidebarItemProps) => {
		const [clientWidth, setClientWidth] = useState(document.documentElement.clientWidth);
		const handleClick = () => {
			onItemSelect();
			onHideSidebar();
		};

		const changeOffset = useCallback(() => {
			let offset = -50;
			if (clientWidth <= 850) {
				return (offset = -1180);
			} else {
				return offset;
			}
		}, [clientWidth]);

		useEffect(() => {
			clientWidth <= 850 ? setItemsCount(0) : setItemsCount(-1);
		}, [clientWidth, setItemsCount]);

		useEffect(() => {
			const handleResize = () => {
				setClientWidth(document.documentElement.clientWidth);
			};
			window.addEventListener('resize', handleResize);
			return () => {
				window.removeEventListener('resize', handleResize);
			};
		}, [clientWidth]);
		return (
			<Link
				offset={changeOffset()}
				onClick={handleClick}
				to={String(item.id)}
				className={cn(
					classes.PriceSidebarItem,
					item === selectedItem ? classes['active'] : classes['itemLink']
				)}
			>
				{item.name}
			</Link>
		);
	}
);

export default PriceSidebarItem;
