import React from 'react'
import classes from '../../styles/Vehicle/VehicleCatalogHeader.module.scss';
import Layout from '../../Components/Layout';
import useWindowSize from '../../hooks/useWindowSize';

const VehicleCatalogHeader = ({ video, title, image }: { video: string, title: string, image: string}) => {
    const { width } = useWindowSize();
  return (
		<div className={classes['PageIntro']}>
			{width > 1000 ? (
				<video className='videoTag' autoPlay loop muted>
					<source src={video} type='video/mp4' />
				</video>
			) : (
				<div className={classes['PageIntro-image']} style={{ backgroundImage: `url(${image})` }}></div>
			)}

			<Layout>
				<p style={{ position: 'relative', zIndex: 999 }}>{title}</p>
			</Layout>
		</div>
  );
}

export default VehicleCatalogHeader