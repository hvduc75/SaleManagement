import React from 'react';
import classNames from 'classnames/bind';

import styles from './ProductInterest.module.scss';
import FavoriteSlider from '../SimpleSlider/FavoriteSlider';

const cx = classNames.bind(styles);

function ProductInterest(props) {
    const { listProducts } = props;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span>Sản phẩm bạn quan tâm</span>
            </div>
            <div className={cx('content-container')}>
                <FavoriteSlider listProducts={listProducts} />
            </div>
        </div>
    );
}

export default ProductInterest;
