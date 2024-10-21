import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useLocation } from 'react-router-dom';
import classNames from 'classnames/bind';

import { vnpay_return } from '../../../../service/paymentService';
import styles from "./PaymentStatus.module.scss";
import { getProductsByCartId } from '../../../../service/cartApiService';
import { createNewOrder } from '../../../../service/orderApiService';
import { getListProductsSuccess } from '../../../../redux/action/cartAction';
import { deleteProductCarts } from '../../../../service/cartApiService';

const cx = classNames.bind(styles);

function PaymentStatus() {
    const location = useLocation();
    const dispatch = useDispatch();

    const [paymentStatus, setPaymentStatus] = useState(null);
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
        // Kiểm tra trạng thái từ session storage trước
        const savedPaymentStatus = sessionStorage.getItem('paymentStatus');
        if (!savedPaymentStatus) {
            fetchProductsPayment();
        } else {
            setPaymentStatus(savedPaymentStatus);
        }
    }, [cartId]);

    useEffect(() => {
        const filtered = listProductsPayment.filter((item) => item.Product_Cart.isChecked === true);
        setListProducts(filtered);
    }, [listProductsPayment]);

    useEffect(() => {
        const verifyPayment = async () => {
            // Kiểm tra nếu đã có trạng thái lưu trong sessionStorage thì không gọi API nữa
            const savedPaymentStatus = sessionStorage.getItem('paymentStatus');
            if (savedPaymentStatus || listProducts.length === 0) {
                return;
            }

            const queryParams = new URLSearchParams(location.search);
            const paymentParams = {};
            queryParams.forEach((value, key) => {
                paymentParams[key] = value;
            });

            const transactionId = paymentParams['vnp_TransactionNo'];

            try {
                const res = await vnpay_return(paymentParams);
                setPaymentStatus(res.status);
                
                // Lưu trạng thái vào session storage
                sessionStorage.setItem('paymentStatus', res.status);

                if (res.status === 'success') {
                    const totalAmount = paymentParams['vnp_Amount'] / 100;

                    let data = {
                        products: listProducts.map((product) => ({
                            id: product.id,
                            quantity: product.Product_Cart.quantity,
                            price: product.price_current ? product.price_current : product.price,
                        })),
                        userInfoId: userInfoId,
                        cartId: cartId,
                        userId: userId,
                        totalPrice: totalAmount,
                        transactionID: transactionId,
                    };

                    await createNewOrder(data);
                    await deleteProductCarts(data);

                    let res = await getProductsByCartId(cartId);
                    dispatch(getListProductsSuccess(res.DT[0].Products));
                }
            } catch (error) {
                console.error('Lỗi khi xác minh thanh toán:', error);
                setPaymentStatus('error');
                sessionStorage.setItem('paymentStatus', 'error');
            }
        };

        verifyPayment();
    }, [location.search, listProducts]);

    return (
        <div className={cx('wrapper')}>
            {paymentStatus === 'success' ? (
                <div className={cx('success')}>Thanh toán thành công!</div>
            ) : paymentStatus === 'error' ? (
                <div className={cx('error')}>Thanh toán thất bại. Vui lòng thử lại.</div>
            ) : (
                <div className={cx('processing')}>
                    <div className={cx('spinner')}></div>
                    <div>Đang xử lý thanh toán...</div>
                </div>
            )}
        </div>
    );
}

export default PaymentStatus;
