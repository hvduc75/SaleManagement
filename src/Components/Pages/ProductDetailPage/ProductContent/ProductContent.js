import React from 'react';
import classNames from 'classnames/bind';

import styles from './ProductContent.module.scss';
import { IoStar } from 'react-icons/io5';
import { IoIosStarHalf } from 'react-icons/io';
import images from '../../../../assets/images';

const cx = classNames.bind(styles);

function ProductContent(props) {
    const { product, formatPrice } = props;

    return (
        <div className={cx('product_content')}>
            <div className={cx('product_info')}>
                <div className={cx('infor_top')}>
                    <div className={cx('brandAuthor')}>
                        <div
                            className={cx('text_badge')}
                            style={{ color: 'rgb(255, 240, 241)', backgroundColor: '#D93843' }}
                        >
                            10.10
                        </div>
                        <img src={images.pd_TopDeal} className={cx('webping_container')} alt="test" />
                        <img src={images.pd_FreeShip} className={cx('webping_container')} alt="test" />
                        <img src={images.pd_exchange} className={cx('webping_container')} alt="test" />
                        <img src={images.pd_real} className={cx('webping_container')} alt="test" />
                    </div>
                    <div className={cx('product_name')}>{product.name}</div>
                    <div className={cx('rating')}>
                        <div className={cx('review')}>
                            <div className={cx('css_star')}>{product.star ? product.star.toFixed(1) : '5.0'}</div>
                            <div style={{ display: 'flex', alignItems: 'center' }}>
                                {Array.from({ length: 5 }).map((_, index) => {
                                    const starValue = index + 1;
                                    if (starValue <= Math.floor(product.star || 5)) {
                                        return <IoStar key={index} fill="rgb(255, 196, 0)" />;
                                    } else if (starValue - 0.5 <= product.star) {
                                        return <IoIosStarHalf key={index} fill="rgb(255, 196, 0)" />;
                                    } else {
                                        return <IoStar key={index} fill="#e4e5e9" />;
                                    }
                                })}
                            </div>
                            <div className={cx('number')}>({product?.Orders?.length})</div>
                        </div>
                        <div className={cx('separator')}></div>
                        <div className={cx('quantity_sold')}>Đã bán {product?.quantity_sold}</div>
                    </div>
                </div>
                <div className={cx('infor_bot')}>
                    <div className={cx('product_price')}>
                        <div className={cx('current_price')}>
                            {product.price_current ? formatPrice(+product.price_current) : formatPrice(+product.price)}
                            <sup>đ</sup>
                        </div>
                        <div className={cx('discount_rate')}>{product.sale ? '-' + product.sale + '%' : ''}</div>
                        <div className={cx('discount_icon')}>
                            <img
                                style={{ width: '14px', height: '14px', opacity: '1' }}
                                src={images.pd_coupon}
                                alt="test"
                            />
                        </div>
                        <div className={cx('original_price')}>
                            {product.price_current ? formatPrice(+product.price) : ''}
                            {product.price_current && <sup>đ</sup>}
                        </div>
                        <div className={cx('popup_3')}></div>
                    </div>
                    <div className={cx('coupon')}>
                        <div className={cx('title')}>Giá sau áp dụng mã khuyến mãi</div>
                        <div className={cx('discount_content')}>
                            <img
                                src={images.pd_coupon}
                                style={{ width: '18px', height: '18px', opacity: '1' }}
                                alt="test"
                            />
                            <div>
                                <strong>
                                    Giảm 5.000<sup>đ</sup>
                                </strong>
                                <span style={{ color: '#808089' }}> từ mã khuyến mãi của nhà bán</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <div className={cx('product_desc')}>
                <div className={cx('title')}>Mô tả sản phẩm</div>
                {product.ProductDetail && (
                    <div
                        className={cx('content')}
                        dangerouslySetInnerHTML={{ __html: product.ProductDetail.description }}
                    ></div>
                )}
            </div>
        </div>
    );
}

export default ProductContent;
