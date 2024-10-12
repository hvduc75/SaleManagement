import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import images from '../../../../assets/images';
import styles from './AllProduct.module.scss';
import ProductsPage from './AllProductContent.js/ProductsPage';

const cx = classNames.bind(styles);

function AllProduct(props) {
    const { isFixed } = props;

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header', isFixed ? 'fixed' : 'initial')}>
                <div className={cx('header_title')}>Gợi ý hôm nay</div>
                <div className={cx('header_item')}>
                    <div className={cx('tab_item', 'active_tab')}>
                        <img className={cx('logo_item')} src={images.Foryou} alt="test" />
                        <div className={cx('tab_text')}>Dành cho bạn</div>
                    </div>
                    <div className={cx('tab_item')}>
                        <img className={cx('logo_item')} src={images.logoTd} alt="test" />
                        <div className={cx('tab_text')}>Top Deal</div>
                    </div>
                    <div className={cx('tab_item')}>
                        <img className={cx('logo_item')} src={images.FreeShip} alt="test" />
                        <div className={cx('tab_text')}>Freeship 100k</div>
                    </div>
                    <div className={cx('tab_item')}>
                        <img className={cx('logo_item')} src={images.book} alt="test" />
                        <div className={cx('tab_text')}>Sách Xả Kho - 60%</div>
                    </div>
                    <div className={cx('tab_item')}>
                        <img className={cx('logo_item')} src={images.Appliance} alt="test" />
                        <div className={cx('tab_text')}>Gia Dụng - 50%</div>
                    </div>
                </div>
            </div>
            <div className={cx('container_product')}>
                <ProductsPage/>
            </div>
        </div>
    );
}

export default AllProduct;
