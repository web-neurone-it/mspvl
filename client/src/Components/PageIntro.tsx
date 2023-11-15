import React from 'react';
import classes from '../styles/Components/PageIntro.module.scss'
import Layout from "./Layout";
import useWindowSize from "../hooks/useWindowSize";
import MobileNavBar from "./MobileNavBar";

const PageIntro = ({title, video, image}: {title: string, image: string, video: string} ) => {
    const {width} = useWindowSize()

    return (
        <>
            <MobileNavBar title={title}/>
            <div className={classes['PageIntro']}>
                {width > 1000 ?
                    <video className='videoTag' autoPlay loop muted>
                        <source src={video} type='video/mp4' />
                    </video>
                    :
                    <div className={classes['PageIntro-image']} style={{backgroundImage: `url(${image})`}}/>
                }

                <Layout>
                    <p style={{ position: 'relative', zIndex: 999}}>{title}</p>
                </Layout>
            </div>
        </>
    );
};

export default PageIntro;