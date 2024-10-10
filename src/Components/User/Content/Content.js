import React from 'react';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import TopDeal from './TopDeal/TopDeal';
import Banners from './Banners/Banners';
import FavoriteProduct from './FavoriteProduct/FavoriteProduct';
import ProductInterest from './ProductInterest/ProductInterest';

const cx = classNames.bind(styles);

function Content() {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <Banners />
            </div>
            <div className={cx('top_deal')}><TopDeal /></div>
            <div className={cx('favorite_product')}>
                <ProductInterest/>
            </div>
            <div className={cx('favorite_product')}>
                <FavoriteProduct/>
            </div>
        </div>
    );
}

export default Content;
