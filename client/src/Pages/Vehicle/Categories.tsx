import React, { useEffect } from 'react';
import classes from '../../styles/Vehicle/Categories.module.scss';
import { fetchCategories, setCurrentCategory } from '../../store/ActionCreators/VehicleActionCreators';
import { useAppDispatch, useAppSelector } from '../../hooks/redux';
import { motion } from 'framer-motion';
import { useDocumentTitle } from '../../hooks/useDocumentTitle';
import CategoryHeader from './CategoryHeader';
import sample from '../../assets/videos/2.mp4';
import image from '../../assets/modules/m1m.png';

const Categories = () => {
	const dispatch = useAppDispatch();
	const { categories } = useAppSelector((state) => state.vehicleReducer);

	useEffect(() => {
		dispatch(fetchCategories());
	}, [dispatch]);
	useDocumentTitle('МСП - Спецтехника');

	return (
		<>
			<CategoryHeader video={sample} title={'Аренда спецтехники'} image={image} />
			<div className={classes['Categories']}>
				{categories.map((i) => (
					<motion.div
						className={classes['Categories__item']}
						key={i.id}
						onClick={() => dispatch(setCurrentCategory(i))}
						whileHover={{ scale: 1.05 }}
						whileTap={{ scale: 0.95 }}
					>
						<div className={classes['Categories__item-image-container']}>
							<div
								className={classes['Categories__item-image']}
								style={{ backgroundImage: `url(${process.env.REACT_APP_API_URL}${i.img})` }}
							></div>
						</div>
						<div className={classes['Categories__item-name']}>{i.name}</div>
					</motion.div>
				))}
			</div>
		</>
	);
};

export default Categories;
