import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';

import styles from './CartPage.module.scss';
import {
    updateQuantity,
    getProductsByCartId,
    deleteProductInCart,
    getAllProductByCheckbox,
} from '../../../service/cartApiService';
import { getListProductsSuccess } from '../../../redux/action/cartAction';
import CartContent from './CartContent/CartContent';
import CartPayment from './CartPayment/CartPayment';

const cx = classNames.bind(styles);

function CartPage(props) {
    const dispatch = useDispatch();
    const listProducts = useSelector((state) => state.cart.cart.products);
    const cartId = useSelector((State) => State.cart.cartId);

    const [totalPrice, setTotalPrice] = useState(0);
    const [totalPriceOriginal, setTotalPriceOriginal] = useState(0);
    const [quantityBuy, setQuantityBuy] = useState(0);
    const [listProductChecked, setListProductChecked] = useState([]);
    const [selectedItems, setSelectedItems] = useState({});

    const [quantities, setQuantities] = useState(
        listProducts.reduce((acc, item) => {
            acc[item.id] = item.Product_Cart.quantity;
            return acc;
        }, {}),
    );

    useEffect(() => {
        // Tính toán totalPrice và totalPriceOriginal mỗi khi danh sách sản phẩm hoặc trạng thái checkbox thay đổi
        const newTotalPrice = listProductChecked.reduce((total, item) => {
            return total + (selectedItems[item.id] ? (item.price_current || item.price) * quantities[item.id] : 0);
        }, 0);

        const newTotalPriceOriginal = listProductChecked.reduce((total, item) => {
            return total + (selectedItems[item.id] ? item.price * quantities[item.id] : 0);
        }, 0);

        const newQuantityBuy = listProductChecked.reduce((total, item) => {
            return total + (selectedItems[item.id] ? 1 : 0);
        }, 0);

        setQuantityBuy(newQuantityBuy);
        setTotalPrice(newTotalPrice);
        setTotalPriceOriginal(newTotalPriceOriginal);
    }, [listProductChecked, quantities, selectedItems]);

    useEffect(() => {
        fetchListProductChecked();
    }, []);

    const fetchListProductChecked = async () => {
        let data = await getAllProductByCheckbox(cartId);
        if (data && data.EC === 0) {
            setListProductChecked(data.DT[0].Products);
            setSelectedItems(
                data.DT[0].Products.reduce((acc, item) => {
                    acc[item.id] = item.Product_Cart.isChecked;
                    return acc;
                }, {}),
            );
        }
    };

    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            return '0';
        }
        return price.toLocaleString('vi-VN');
    };

    const handleIncreaseProduct = async (item) => {
        const newQuantity = (quantities[item.id] || 1) + 1;
        setQuantities((prev) => ({ ...prev, [item.id]: newQuantity }));

        try {
            await updateQuantity(cartId, item.id, newQuantity);
            let res = await getProductsByCartId(cartId);
            dispatch(getListProductsSuccess(res.DT[0].Products));
        } catch (error) {
            console.error('Lỗi khi cập nhật số lượng:', error);
        }
    };

    const handleDecreaseProduct = async (item) => {
        let newQuantity = Math.max((quantities[item.id] || 1) - 1, 0);

        if (newQuantity === 0) {
            let cof = window.confirm('Bạn có chắc chắn muốn xóa sản phẩm này không?');
            if (cof) {
                await deleteProductInCart(cartId, item.id);
                let res = await getProductsByCartId(cartId);
                dispatch(getListProductsSuccess(res.DT[0].Products));
                return;
            } else {
                newQuantity = 1;
            }
        }

        setQuantities((prev) => ({ ...prev, [item.id]: newQuantity }));

        try {
            await updateQuantity(cartId, item.id, newQuantity);
            let res = await getProductsByCartId(cartId);
            dispatch(getListProductsSuccess(res.DT[0].Products));
        } catch (error) {
            console.error('Lỗi khi cập nhật số lượng:', error);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Giỏ Hàng</div>
            <div className={cx('container')}>
                <div className={cx('cart_container')}>
                    <div className={cx('cart_left')}>
                        <CartContent
                            handleIncreaseProduct={handleIncreaseProduct}
                            handleDecreaseProduct={handleDecreaseProduct}
                            listProducts={listProducts}
                            quantities={quantities}
                            setSelectedItems={setSelectedItems}
                            selectedItems={selectedItems}
                            formatPrice={formatPrice}
                            cartId={cartId}
                            listProductChecked={listProductChecked}
                            setListProductChecked={setListProductChecked}
                        />
                    </div>
                    <div className={cx('cart_right')}>
                        <CartPayment
                            formatPrice={formatPrice}
                            totalPrice={totalPrice}
                            selectedItems={selectedItems}
                            totalPriceOriginal={totalPriceOriginal}
                            quantityBuy={quantityBuy}
                        />
                    </div>
                </div>
                <div className={cx('product_interest')}></div>
            </div>
        </div>
    );
}

export default CartPage;
