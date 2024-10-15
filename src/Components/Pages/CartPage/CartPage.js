import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';

import styles from './CartPage.module.scss';
import { Link } from 'react-router-dom';
import images from '../../../assets/images';
import { updateQuantity, getProductsByCartId, deleteProductInCart } from '../../../service/cartApiService';
import { getListProductsSuccess } from '../../../redux/action/cartAction';

const cx = classNames.bind(styles);

function CartPage(props) {
    const listProducts = useSelector((state) => state.cart.cart.products);
    const cartId = useSelector((State) => State.cart.cartId);
    const [totalPrice, setTotalPrice] = useState(0);
    const [toatlPriceOriginal, setTotalPriceOriginal] = useState(0)
    const dispatch = useDispatch();

    const [quantities, setQuantities] = useState(
        listProducts.reduce((acc, item) => {
            acc[item.id] = item.Product_Cart.quantity;
            return acc;
        }, {}),
    );

    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            return '0';
        }
        return price.toLocaleString('vi-VN');
    };

    const getImageSrc = (image) => {
        if (image && image.data) {
            const byteArray = new Uint8Array(image.data);
            let binary = '';
            byteArray.forEach((byte) => {
                binary += String.fromCharCode(byte);
            });
            return `data:image/jpeg;base64,${window.btoa(binary)}`;
        }
        return null;
    };

    const handleIncreaseProduct = async (item) => {
        const newQuantity = (quantities[item.id] || 1) + 1;
        setQuantities((prev) => ({
            ...prev,
            [item.id]: newQuantity,
        }));

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

        setQuantities((prev) => ({
            ...prev,
            [item.id]: newQuantity,
        }));

        try {
            await updateQuantity(cartId, item.id, newQuantity);
            let res = await getProductsByCartId(cartId);
            dispatch(getListProductsSuccess(res.DT[0].Products));
        } catch (error) {
            console.error('Lỗi khi cập nhật số lượng:', error);
        }
    };

    const handleDeleteProduct = () => {
        alert('xoa san pham di nhung ma chua lam');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Giỏ Hàng</div>
            <div className={cx('container')}>
                <div className={cx('cart_container')}>
                    <div className={cx('cart_left')}>
                        <div className={cx('cart_header')}>
                            <label htmlFor="check" className={cx('label_styles')}>
                                <input type="checkbox" name="check" id="check" />
                                <span className={cx('label')}>Tất cả ({listProducts.length} sản phẩm)</span>
                            </label>
                            <span>Đơn giá</span>
                            <span>Số lượng</span>
                            <span>Thành tiền</span>
                            <img style={{ cursor: 'pointer' }} src={images.cp_trash} alt="deleted" />
                        </div>
                        <div className={cx('cart_content')}>
                            {listProducts &&
                                listProducts.map((item) => {
                                    return (
                                        <div className={cx('cart_item')} key={`item-${item.id}`}>
                                            <div className={cx('item_infor')}>
                                                <input type="checkbox" />
                                                <Link>
                                                    <img src={getImageSrc(item.image)} alt="product_image" />
                                                </Link>
                                                <div className={cx('item_name')}>{item.name}</div>
                                            </div>
                                            <div className={cx('item_price')}>
                                                {item.price_current && (
                                                    <div className={cx('price_current')}>
                                                        {formatPrice(+item.price_current)}
                                                        <sup>đ</sup>
                                                    </div>
                                                )}
                                                <div
                                                    className={
                                                        item.price_current ? cx('price_original') : cx('price_style')
                                                    }
                                                >
                                                    {formatPrice(+item.price)}
                                                    <sup>đ</sup>
                                                </div>
                                            </div>
                                            <div className={cx('item_quantity')}>
                                                <div className={cx('styles_quantity')}>
                                                    <span
                                                        onClick={() => handleDecreaseProduct(item)}
                                                        className={cx('qty_decrease')}
                                                    >
                                                        <img src={images.pd_icon_remove} alt="icon_remove" />
                                                    </span>
                                                    <input type="text" value={quantities[item.id]} readOnly />
                                                    <span
                                                        onClick={() => handleIncreaseProduct(item)}
                                                        className={cx('qty_increase')}
                                                    >
                                                        <img src={images.pd_icon_add} alt="icon_add" />
                                                    </span>
                                                </div>
                                            </div>
                                            <div className={cx('total_price')}>
                                                {formatPrice(
                                                    (item.price_current ? +item.price_current : +item.price) *
                                                        quantities[item.id],
                                                )}
                                                <sup>đ</sup>
                                            </div>
                                            <div onClick={() => handleDeleteProduct()} className={cx('item_action')}>
                                                <img src={images.cp_trash} alt="deleted" />
                                            </div>
                                        </div>
                                    );
                                })}
                        </div>
                    </div>
                    <div className={cx('cart_right')}>
                        <div className={cx('payment')}>
                            <div className={cx('price_items')}>
                                <div className={cx('price_item')}>
                                    <span>Tạm tính</span>
                                    <span>
                                        1.221.000
                                        <sup>đ</sup>
                                    </span>
                                </div>
                                <div className={cx('price_item')}>
                                    <span>Giảm giá từ Deal</span>
                                    <span>
                                        -272.000
                                        <sup>đ</sup>
                                    </span>
                                </div>
                                <div className={cx('price_item')}>
                                    <span>Giảm giá từ mã khuyến mãi</span>
                                    <span>
                                        -78.920
                                        <sup>đ</sup>
                                    </span>
                                </div>
                            </div>
                            <div className={cx('total_price')}>
                                <span className={cx("price_final")}>Tổng tiền</span>
                                <div className={cx("price_content")}>
                                    <span className={cx('price_value')}>250.000 <sup>đ</sup></span>
                                    <span className={cx('price_value_saving')}>Tiết kiệm 322.000 <sup>đ</sup></span>
                                    <span className={cx('price_note')}>(Đã bao gồm VAT nếu có)</span>
                                </div>
                            </div>
                            <div className={cx('btn_payment')}>Mua Hàng (1)</div>
                        </div>
                    </div>
                </div>
                <div className={cx('product_interest')}></div>
            </div>
        </div>
    );
}

export default CartPage;
