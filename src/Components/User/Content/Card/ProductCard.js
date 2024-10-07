import React from 'react';
import classNames from 'classnames/bind';
import { Link } from 'react-router-dom';
import { FaStar } from 'react-icons/fa6';
import images from '../../../../assets/images';

import styles from './ProductCard.module.scss';

const cx = classNames.bind(styles);

function ProductCard(props) {
    return (
        <div className={cx('wrapper')}>
            <Link to={'/mmcm'} className={cx('product-item')}>
                <div className={cx('wrapper-image')}>
                    <div className={cx('bg-image')}></div>
                    <img className={cx('product-image')} src={images.image1} alt="test" />
                </div>
                <div className={cx('product-content')}>
                    <div className={cx('product-description')}>
                        <div className={cx('description-top')}>
                            <div className={cx('product-name')}>
                                Ikigai Dành Cho Lứa Tuổi Thiếu Niên - Hành Trình Tìm Kiếm Một Cuộc Đời Đáng Giá
                            </div>
                            <div className={cx('product-rating')}>
                                <FaStar className={cx('product-star')} />
                                <FaStar className={cx('product-star')} />
                                <FaStar className={cx('product-star')} />
                                <FaStar className={cx('product-star')} />
                                <FaStar className={cx('product-star')} />
                            </div>
                        </div>
                        <div className={cx('description-bot')}>
                            <div className={cx('product-price-new')}>
                                185.410
                                <sup>đ</sup>
                            </div>
                            <div className={cx('product-sale')}>
                                <div className={cx('percent-sale')}>-38%</div>
                                <div className={cx('product-price-old')}>
                                    299.000
                                    <sup>đ</sup>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className={cx('product-footer')}>
                        <span>Giao siêu tốc 2h</span>
                    </div>
                </div>
            </Link>
        </div>
    );
}

export default ProductCard;
