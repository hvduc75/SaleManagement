import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import styles from './Content.module.scss';
import TopDeal from './TopDeal/TopDeal';
import Banners from './Banners/Banners';
import FavoriteProduct from './FavoriteProduct/FavoriteProduct';
import ProductInterest from './ProductInterest/ProductInterest';
import AllProduct from './AllProduct/AllProduct';
import FooterContent from './FooterContent/FooterContent';
import { getAllProductsInterestOfUser } from '../../../service/productApiService';

const cx = classNames.bind(styles);

function Content() {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const userId = useSelector((state) => state.user.account.id);
    const [listProducts, setListProducts] = useState([]);

    useEffect(() => {
        fetchListProducts();
    }, [userId]);

    const fetchListProducts = async () => {
        let data = await getAllProductsInterestOfUser(userId);
        if (data && data.EC !== 0) {
            toast.error(data.EM);
        }
        setListProducts(data?.DT[0]);
    };
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <Banners />
            </div>
            <div className={cx('top_deal')}>
                <TopDeal />
            </div>
            {isAuthenticated  && listProducts && listProducts?.Products?.length > 0 && (
                <div className={cx('favorite_product')}>
                    <ProductInterest listProducts = {listProducts}/>
                </div>
            )}
            <div className={cx('favorite_product')}>
                <FavoriteProduct />
            </div>
            <div className={cx('all_product')}>
                <AllProduct />
            </div>
            <div className={cx('footer_content')}>
                <FooterContent />
            </div>
        </div>
    );
}

export default Content;
