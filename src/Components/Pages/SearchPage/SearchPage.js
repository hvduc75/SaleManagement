import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useLocation, Link } from 'react-router-dom';

import styles from './SearchPage.module.scss';
import { IoIosArrowForward } from 'react-icons/io';
import ProductCard from '../../User/Content/ProductCard/ProductCard';

import { getAllProductsWithSearchText } from '../../../service/productApiService';

const cx = classNames.bind(styles);

function SearchPage() {
    const location = useLocation();
    const [listProduct, setListProduct] = useState([]);
    const query = new URLSearchParams(location.search).get('q');

    useEffect(() => {
        fetListProducts();
    }, [query])

    const fetListProducts = async () => {
        let products = await getAllProductsWithSearchText(query);
        if(products.EC === 0){
            setListProduct(products.DT);
        }
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list_category_top')}>
                <Link to={'/'} className={cx('path_home')}>
                    Trang chủ
                </Link>
                <IoIosArrowForward className={cx('icon')} />
                <div className={cx('current_path')}>{`Kết quả tìm kiếm "${query}"`}</div>
            </div>
            <div className={cx('container')}>
                <div className={cx('filter')}>Lọc sản phẩm</div>
                <div className={cx('list_product')}>
                    {listProduct?.length > 0 &&
                        listProduct.map((product, index) => <ProductCard cssText={cx("cssText", "cssPrice")} key={index} product={product} />)}
                </div>
            </div>
        </div>
    );
}

export default SearchPage;
