import React from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';

import styles from './CartPayment.module.scss';

const cx = classNames.bind(styles);

function CartPayment(props) {
    const userInfor = useSelector((State) => State.user.userInfor);
    const { formatPrice, totalPrice, totalPriceOriginal, quantityBuy, selectedItems } = props;
    const navigate = useNavigate();

    const handleClickPayment = () => {
        if (!quantityBuy) {
            toast.error('Bạn vẫn chưa chọn sản phẩm nào để mua');
            return;
        }
        if (userInfor) {
            navigate('/checkout/payment');
        }else{
            navigate('/checkout/shipping');
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div style={{height: "100px"}} className={cx('location')}>dia chi o day</div>
            <div className={cx('payment')}>
                <div className={cx('price_items')}>
                    <div className={cx('price_item')}>
                        <span className={cx('price_text')}>Tạm tính</span>
                        <span className={cx('price_value')}>
                            {formatPrice(totalPriceOriginal)}
                            <sup>đ</sup>
                        </span>
                    </div>
                    <div className={cx('price_item')}>
                        <span className={cx('price_text')}>Giảm giá từ Deal</span>
                        <span className={selectedItems && Object.keys(selectedItems).length > 0 && cx('price_sale')}>
                            {formatPrice(totalPriceOriginal - totalPrice)}
                            <sup>đ</sup>
                        </span>
                    </div>
                    {selectedItems && Object.keys(selectedItems).length > 0 && (
                        <div className={cx('price_item')}>
                            <span className={cx('price_text')}>Giảm giá từ mã khuyến mãi</span>
                            <span className={selectedItems && Object.keys(selectedItems).length > 0 && cx('price_sale')}>
                                0<sup>đ</sup>
                            </span>
                        </div>
                    )}
                </div>
                <div className={cx('total_price')}>
                    <span className={cx('price_final')}>Tổng tiền</span>
                    <div className={cx('price_content')}>
                        {selectedItems && Object.keys(selectedItems).length > 0 ? (
                            <span className={cx('price_value')}>
                                {formatPrice(totalPrice)}
                                <sup>đ</sup>
                            </span>
                        ) : (
                            <span className={cx('attention')}>Vui lòng chọn sản phẩm</span>
                        )}
                        {selectedItems && Object.keys(selectedItems).length > 0 && (
                            <span className={cx('price_value_saving')}>
                                Tiết kiệm {formatPrice(totalPriceOriginal - totalPrice)}
                                <sup>đ</sup>
                            </span>
                        )}
                        <span className={cx('price_note')}>(Đã bao gồm VAT nếu có)</span>
                    </div>
                </div>
                <div onClick={() => handleClickPayment()} className={cx('btn_payment')}>
                    Mua Hàng ({quantityBuy})
                </div>
            </div>
        </div>
    );
}

export default CartPayment;
