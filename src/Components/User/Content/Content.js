import React from 'react';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import SimpleSlider from './SimpleSlider/SimpleSlider';
import TopDeal from './TopDeal/TopDeal';

const cx = classNames.bind(styles);

function Content() {
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <SimpleSlider />
            </div>
            <TopDeal/>
        </div>
    );
}

export default Content;

