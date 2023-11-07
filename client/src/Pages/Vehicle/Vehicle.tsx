import React from 'react';
import PageIntro from '../../Components/PageIntro';
import Background from '../../Components/Background';
import Layout from '../../Components/Layout';
import Categories from './Categories';
import VehicleCatalog from './VehicleCatalog';
import Navbar from '../../Components/Navbar';
import { useAppSelector } from '../../hooks/redux';
import Footer from '../../Components/Footer';
import sample from '../../assets/videos/2.mp4';
import { IoIosTimer } from 'react-icons/io';
import { BiSupport } from 'react-icons/bi';
import { TbTemperature } from 'react-icons/tb';
import image from '../../assets/modules/m1m.png';
import Advantages from '../../Components/Advantages';
import { title } from 'process';
import CategoryHeader from './CategoryHeader';
import MobileNavBar from '../../Components/MobileNavBar';

const Vehicle = () => {
	const { currentCategory } = useAppSelector((state) => state.vehicleReducer);

	return (
		<>
			<Navbar />
			<Background>
				<MobileNavBar title={currentCategory.name} />
				{/* <PageIntro video={sample} image={image} title={'Аренда спецтехники'} /> */}
				{currentCategory.id === 0 ? <Categories /> : <VehicleCatalog />}
				<Advantages
					dataset={[
						{
							title: 'Круглосуточная поддержка',
							text: 'Экстренная замена/ремонт спецтехники, консультации и выезд на объект в любое время.',
							icon: <BiSupport />,
						},
						{
							title: 'Доставка по ДВФО',
							text: 'Поставка спецтехники на объект в течении суток от момента заявки по всему Дальневосточному Федеральному Округу.',
							icon: <IoIosTimer />,
						},
						{
							title: 'Эксплуатация техники в любых климатических условиях',
							text: 'Вся представленная техника приспособлена к длительным работам в любых климатических, географических и дорожных условиях.',
							icon: <TbTemperature />,
						},
					]}
				/>
				<Footer />
			</Background>
		</>
	);
};

export default Vehicle;
