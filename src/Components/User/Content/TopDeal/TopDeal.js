import React from 'react';
import classNames from 'classnames/bind';

import styles from './TopDeal.module.scss';
import images from '../../../../assets/images';
import ProductCard from '../Card/ProductCard';

const cx = classNames.bind(styles);

function TopDeal(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <img className={cx('image-title')} src={images.TopDeal} alt="TopDeal" />
                <div className={cx('view-detail')}>Xem tất cả</div>
            </div>
            <div className={cx('content-container')}>
                <div className={cx('item')}><ProductCard/></div>
                <div className={cx('item')}><ProductCard/></div>
                <div className={cx('item')}><ProductCard/></div>
                <div className={cx('item')}><ProductCard/></div>
                <div className={cx('item')}><ProductCard/></div>
                <div className={cx('item')}><ProductCard/></div>
            </div>
        </div>
    );
}

export default TopDeal;
