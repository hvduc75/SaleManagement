import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';

import styles from './ProductDetail.module.scss';
import { FaStar } from 'react-icons/fa6';
import images from '../../../assets/images';

const cx = classNames.bind(styles);

function ProductDetail() {
    const { productId } = useParams();
    const [quantity, setQuantity] = useState(1);

    const handleAddItem = () => {
        setQuantity(+quantity + 1)
    }

    const handleRemoveItem = () => {
        if(+quantity <= 1){
            return;
        }
        setQuantity(+quantity-1)
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('product_container')}>
                <div className={cx('product_image')}>
                    <div className={cx('image_frame')}></div>
                    <div className={cx('ThumbnailList')}></div>
                </div>
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
                                <img src={images.pd_TopDeal} className={cx('webpimg_container')} alt="test" />
                                <img src={images.pd_FreeShip} className={cx('webpimg_container')} alt="test" />
                                <img src={images.pd_exchange} className={cx('webpimg_container')} alt="test" />
                                <img src={images.pd_real} className={cx('webpimg_container')} alt="test" />
                            </div>
                            <div className={cx('product_name')}>
                                Bình Giữ Nhiệt Lock&Lock Energetic One-Touch Tumbler LHC3249 - 550ML
                            </div>
                            <div className={cx('rating')}>
                                <div className={cx('review')}>
                                    <div
                                        style={{
                                            marginRight: '4px',
                                            fontSize: '14px',
                                            lineHeight: '150%',
                                            fontWeight: '500',
                                        }}
                                    >
                                        4.8
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center' }}>
                                        <FaStar fill="rgb(255, 196, 0)" />
                                        <FaStar fill="rgb(255, 196, 0)" />
                                        <FaStar fill="rgb(255, 196, 0)" />
                                        <FaStar fill="rgb(255, 196, 0)" />
                                        <FaStar fill="rgb(255, 196, 0)" />
                                    </div>
                                    <div className={cx('number')}>(3531)</div>
                                </div>
                                <div className={cx('separator')}></div>
                                <div className={cx('quantity_sold')}>Đã bán 21k</div>
                            </div>
                        </div>
                        <div className={cx('infor_bot')}>
                            <div className={cx('product_price')}>
                                <div className={cx('current_price')}>
                                    275.000<sup>đ</sup>
                                </div>
                                <div className={cx('discount_rate')}>-48%</div>
                                <div className={cx('discount_icon')}>
                                    <img style={{ width: '14px', height: '14px', opacity: '1' }} src={images.pd_coupon} alt="test" />
                                </div>
                                <div className={cx('original_price')}>
                                    528.000<sup>đ</sup>
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
                    <div className={cx('product_desc')}></div>
                </div>
            </div>
            <div className={cx('widget')}>
                <div className={cx('header')}>
                    <div className={cx('logo')}>
                        <img src={images.pd_logo} alt="logo" />
                    </div>
                    <div className={cx('desc_tiki')}>
                        <span>Tiki Trading</span>
                        <div className={cx('seller_detail')}>
                            <div className={cx('item')}>
                                <img src={images.pd_official} alt="img_official" />
                            </div>
                            <div className={cx('item_review')}>
                                4.7 <FaStar style={{ width: '25px' }} fill="rgb(255, 196, 0)" />{' '}
                                <span>(5.5tr+ đánh giá)</span>
                            </div>
                        </div>
                    </div>
                </div>
                {/* <div className={cx('item_info')}>
                    <img src={images.book} alt='sanpham'/>
                    <div></div>
                </div> */}
                <div className={cx('add_to_cart')}>
                    <div className={cx('quantity_input')}>
                        <p className={cx('label')}>Số Lượng</p>
                        <div className={cx('group_input')}>
                            <button onClick={() => handleRemoveItem()} className={+quantity <= 1 ? cx('disable') : cx('over')}>
                                <img
                                    style={{ width: '20px', height: '20px' }}
                                    src={images.pd_icon_remove}
                                    alt="remove_icon"
                                />
                            </button>
                            <input type="text" value={quantity} onChange={(event) => setQuantity(event.target.value)} className={cx('input')} />
                            <button onClick={() => handleAddItem()} className={cx('over')}>
                                <img
                                    style={{ width: '20px', height: '20px' }}
                                    src={images.pd_icon_add}
                                    alt="add_icon"
                                />
                            </button>
                        </div>
                    </div>
                    <div className={cx('price_container')}>
                        <div className={cx('price_label')}>Tạm tính</div>
                        <div className={cx('price')}>
                            {242.600 * +quantity}<sup>đ</sup>
                        </div>
                    </div>
                    <div className={cx('group_button')}>
                        <button className={cx('primary_btn')}>Mua ngay</button>
                        <button className={cx('secondary_btn')}>Thêm vào giỏ</button>
                        <button className={cx('secondary_btn')}>Mua trước trả sau</button>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default ProductDetail;
