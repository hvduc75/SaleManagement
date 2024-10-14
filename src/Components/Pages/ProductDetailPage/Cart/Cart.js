import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { FaStar } from 'react-icons/fa6';
import images from '../../../../assets/images';

import styles from './Cart.module.scss';

const cx = classNames.bind(styles);

function Cart(props) {
    const { product, formatPrice } = props;
    const [quantity, setQuantity] = useState(1);

    const handleAddItem = () => {
        setQuantity(+quantity + 1);
    };

    const handleRemoveItem = () => {
        if (+quantity <= 1) {
            return;
        }
        setQuantity(+quantity - 1);
    };
    return (
        <div className={cx('wrapper')}>
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
                            <button
                                onClick={() => handleRemoveItem()}
                                className={+quantity <= 1 ? cx('disable') : cx('over')}
                            >
                                <img
                                    style={{ width: '20px', height: '20px' }}
                                    src={images.pd_icon_remove}
                                    alt="remove_icon"
                                />
                            </button>
                            <input
                                type="text"
                                value={quantity}
                                onChange={(event) => setQuantity(event.target.value)}
                                className={cx('input')}
                            />
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
                            {formatPrice(product.price_current * +quantity)}
                            <sup>đ</sup>
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

export default Cart;
