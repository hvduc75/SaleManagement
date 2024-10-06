import React from 'react';
import classNames from 'classnames/bind';

import styles from "./TopDeal.module.scss"

const cx = classNames.bind(styles)

function TopDeal(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <div className={cx('image-title')}></div>
                <div>Xem </div>
            </div>
            <div className={cx('content-container')}>

            </div>
        </div>
    );
}

export default TopDeal;