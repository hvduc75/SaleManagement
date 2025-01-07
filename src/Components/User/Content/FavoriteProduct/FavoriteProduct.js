import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import styles from './FavoriteProduct.module.scss';
import { getAllProductsFavorite } from '../../../../service/productApiService';
import ProductSlider from '../SimpleSlider/ProductSlider';

const cx = classNames.bind(styles);

function FavoriteProduct(props) {
    const [listProducts, setListProducts] = useState([]);

    useEffect(() => {
        fetchListProducts();
    }, []);

    const fetchListProducts = async () => {
        let data = await getAllProductsFavorite();
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
        setListProducts(data);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <span>Bạn có thể thích</span>
            </div>
            <div className={cx('content-container')}>
                <ProductSlider listProducts={listProducts} />
            </div>
        </div>
    );
}

export default FavoriteProduct;
