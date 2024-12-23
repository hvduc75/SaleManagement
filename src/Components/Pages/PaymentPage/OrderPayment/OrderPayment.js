import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';
import { useSelector, useDispatch } from 'react-redux';

import styles from './OrderPayment.module.scss';
import { paymentWithVnPay } from '../../../../service/paymentService';
import CustomerAddress from '../../CartPage/CartPayment/CustomerAddress/CustomerAddress';
import { getProductsByCartId } from '../../../../service/cartApiService';
import { createNewOrder } from '../../../../service/orderApiService';
import { getListProductsSuccess } from '../../../../redux/action/cartAction';
import { deleteProductCarts } from '../../../../service/cartApiService';

const cx = classNames.bind(styles);

function OrderPayment(props) {
    const { formatPrice, totalPrice, totalPriceOriginal, paymentMethod } = props;
    const dispatch = useDispatch();
    const [listProductsPayment, setProductsPayment] = useState([]);
    const [listProducts, setListProducts] = useState([]);

    const cartId = useSelector((state) => state.cart.cartId);
    const userId = useSelector((state) => state.user.account.id);
    const userInfoId = useSelector((state) => state.user.userInfor.id);

    const fetchProductsPayment = async () => {
        let data = await getProductsByCartId(cartId);
        if (data && data.EC === 0) {
            setProductsPayment(data.DT[0].Products);
        }
    };

    useEffect(() => {
        fetchProductsPayment();
    }, [cartId]);

    useEffect(() => {
        const filtered = listProductsPayment.filter((item) => item.Product_Cart.isChecked === true);
        setListProducts(filtered);
    }, [listProductsPayment]);

    const handleClickPayment = async () => {
        if (!paymentMethod) {
            toast.error('Vui lòng chọn hình thức thanh toán');
        } else {
            if (paymentMethod === 'vnpay') {
                let orderData = {
                    products: listProducts.map((product) => ({
                        id: product.id,
                        quantity: product.Product_Cart.quantity,
                        price: product.price_current ? product.price_current : product.price,
                    })),
                    userInfoId: userInfoId,
                    cartId: cartId,
                    userId: userId,
                    totalPrice: totalPrice,
                };

                let data = await createNewOrder(orderData);
                await deleteProductCarts(orderData);
                let productCart = await getProductsByCartId(cartId);
                dispatch(getListProductsSuccess(productCart.DT[0].Products));

                let orderId = data.DT.id;
                let res = await paymentWithVnPay(totalPrice, orderId, 'NCB', 'vn');
                window.location.href = res.paymentUrl;
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <CustomerAddress />
            <div className={cx('payment')}>
                <div className={cx('price_items')}>
                    <div className={cx('price_item')}>
                        <span className={cx('price_text')}>Tạm tính</span>
                        <span className={cx('price_value')}>{formatPrice(totalPriceOriginal)}đ</span>
                    </div>
                    <div className={cx('price_item')}>
                        <span className={cx('price_text')}>Giảm giá từ Deal</span>
                        <span className={cx('price_sale')}>{formatPrice(totalPriceOriginal - totalPrice)}đ</span>
                    </div>

                    <div className={cx('price_item')}>
                        <span className={cx('price_text')}>Giảm giá từ mã khuyến mãi</span>
                        <span className={cx('price_sale')}>0đ</span>
                    </div>
                </div>
                <div className={cx('total_price')}>
                    <span className={cx('price_final')}>Tổng tiền</span>
                    <div className={cx('price_content')}>
                        <span className={cx('price_value')}>{formatPrice(totalPrice)}đ</span>
                        <span className={cx('price_value_saving')}>
                            Tiết kiệm {formatPrice(totalPriceOriginal - totalPrice)}đ
                        </span>
                        <span className={cx('price_note')}>
                            (Giá này đã bao gồm thuế GTGT, phí đóng gói, phí vận chuyển và các chi phí phát sinh khác)
                        </span>
                    </div>
                </div>
                <div onClick={() => handleClickPayment()} className={cx('btn_payment')}>
                    Đặt hàng
                </div>
            </div>
        </div>
    );
}

export default OrderPayment;
