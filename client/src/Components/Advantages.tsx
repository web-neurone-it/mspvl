import React from 'react';
import Layout from './Layout';
import classes from '../styles/Components/PageIntro.module.scss';

interface IDataset {
	icon: React.ReactNode;
	title: string;
    text: string;
}

const Advantages = ({dataset}: {dataset: IDataset[]}) => {
    return (
		<div>
			<Layout>
				<div className={classes['PageIntro__advantages']}>
					{dataset.map((i, index) => (
						<div className={classes['PageIntro__advantages-item']} key={index}>
							<div className={classes['PageIntro__advantages-item-icon']}>{i.icon}</div>
							<div className={classes['PageIntro__advantages-item-title']}>{i.title}</div>
							<div className={classes['PageIntro__advantages-item-text']}>{i.text}</div>
						</div>
					))}
				</div>
			</Layout>
		</div>
	);
};

export default Advantages;
