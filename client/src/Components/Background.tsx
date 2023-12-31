import React from 'react';
import image from '../assets/background.png';

const Background = ({ children }: { children: React.ReactNode }) => {
	return (
		<div
			style={{
				backgroundImage: `url(${image})`,
				// backgroundSize: 'cover',
				// overflowX: 'hidden',
				overflowX: 'clip'
			}}
		>
			{children}
		</div>
	);
};

export default Background;
