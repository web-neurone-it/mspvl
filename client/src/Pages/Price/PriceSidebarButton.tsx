import React from 'react';
import cn from 'classnames';
import classes from '../../styles/Price/PriceSidebarButton.module.scss';

interface PriceSidebarButtonProps {
	children?: string;
	className?: string;
	onClick?: () => void;
}

const PriceSidebarButton = (props: PriceSidebarButtonProps) => {
	const { children, className, onClick } = props;
	return (
		<button onClick={onClick} className={cn(classes.PriceSidebarButton, className)}>
			{children}
		</button>
	);
};

export default PriceSidebarButton;
