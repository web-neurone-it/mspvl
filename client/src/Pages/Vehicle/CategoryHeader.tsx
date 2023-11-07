import React from 'react'
import classes from '../../styles/Vehicle/CategoryHeader.module.scss';
import Layout from '../../Components/Layout';
import useWindowSize from '../../hooks/useWindowSize';

const CategoryHeader = ({video, title, image}: {video: string, title: string, image: string}) => {
    const { width } = useWindowSize();
  return (
		<div className={classes['PageIntro']}>
			{width > 1000 ? (
				<video className='videoTag' autoPlay loop muted>
					<source src={video} type='video/mp4' />
				</video>
			) : (
				<div className={classes['PageIntro-image']} style={{ backgroundImage: `url(${image})` }} />
			)}

			<Layout>
				<p style={{ position: 'relative', zIndex: 999 }}>{title}</p>
			</Layout>
		</div>
  );
}

export default CategoryHeader