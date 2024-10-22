import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

import { IoIosArrowForward } from 'react-icons/io';
import styles from './ProductCategoryPage.module.scss';
import { getProductsByCategoryId } from '../../../service/productApiService';
import ProductCard from '../../User/Content/ProductCard/ProductCard';

const cx = classNames.bind(styles);

function ProductCategoryPage(props) {
    const [listProduct, setListProduct] = useState([]);
    const { categoryId } = useParams();

    useEffect(() => {
        fetchListProducts();
    }, [categoryId]);

    const fetchListProducts = async () => {
        let products = await getProductsByCategoryId(categoryId);
        if (products && products.EC === 0) {
            setListProduct(products.DT);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('list_category_top')}>
                <Link to={'/'} className={cx('path_home')}>
                    Trang chủ
                </Link>
                <IoIosArrowForward className={cx('icon')} />
                <div className={cx('current_path')}>{listProduct?.name}</div>
            </div>
            <div className={cx('container')}>
                <div className={cx('title')}>
                    <h2>{listProduct?.name}</h2>
                </div>
                <div className={cx('filter')}>Lọc sản phẩm</div>
                <div className={cx('list_product')}>
                    {listProduct?.Products?.length > 0 &&
                        listProduct.Products.map((product, index) => (
                            <ProductCard key={index} product={product} />
                        ))
                    }
                </div>
            </div>
        </div>
    );
}

export default ProductCategoryPage;
