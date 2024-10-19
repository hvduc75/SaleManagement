import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useLocation } from 'react-router-dom';
import { vnpay_return } from '../../../../service/paymentService';
import { getAllProductByCheckbox } from '../../../../service/cartApiService';
import { createNewOrder } from '../../../../service/orderApiService';
import { deleteProductCarts } from '../../../../service/cartApiService';

function PaymentStatus() {
    const location = useLocation();
    const [paymentStatus, setPaymentStatus] = useState(null);
    const [listProductChecked, setListProductChecked] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const cartId = useSelector((state) => state.cart.cartId);
    const userId = useSelector((state) => state.user.account.id);

    const fetchListProductChecked = async () => {
        let data = await getAllProductByCheckbox(cartId);
        if (data && data.EC === 0) {
            setListProductChecked(data.DT[0].Products);
        }
    };

    useEffect(() => {
        fetchListProductChecked();
    }, [cartId]);

    useEffect(() => {
        const filtered = listProductChecked.filter((item) => item.Product_Cart.isChecked === true);
        setListProducts(filtered);
    }, [listProductChecked]);

    useEffect(() => {
        const verifyPayment = async () => {
            if (listProducts.length === 0) {
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

                if (res.status === 'success') {
                    const totalAmount = paymentParams['vnp_Amount'] / 100; 

                    // Tạo dữ liệu cho đơn hàng
                    let data = {
                        products: listProducts.map((product) => ({
                            id: product.id,
                            quantity: product.Product_Cart.quantity,
                            price: product.price_current ? product.price_current : product.price,
                        })),
                        cartId: cartId,
                        userId: userId,
                        totalPrice: totalAmount,
                        transactionID : transactionId
                    };
                    await createNewOrder(data);
                    await deleteProductCarts(data)
                }
            } catch (error) {
                console.error('Lỗi khi xác minh thanh toán:', error);
                setPaymentStatus('error');
            }
        };

        verifyPayment();
    }, [location.search, listProducts]); 

    return (
        <div>
            {paymentStatus === 'success' ? (
                <div>Thanh toán thành công!</div>
            ) : paymentStatus === 'error' ? (
                <div>Thanh toán thất bại. Vui lòng thử lại.</div>
            ) : (
                <div>Đang xử lý thanh toán...</div>
            )}
        </div>
    );
}

export default PaymentStatus;
