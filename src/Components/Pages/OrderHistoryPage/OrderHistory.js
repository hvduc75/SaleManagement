import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';

import styles from './OrderHistory.module.scss';
import { IoLocation } from 'react-icons/io5';
import { FaUserLarge, FaMessage } from 'react-icons/fa6';
import { RiBookReadFill } from 'react-icons/ri';
import { FaEye } from 'react-icons/fa';
import { getOrdersByUserId } from '../../../service/orderApiService';

const cx = classNames.bind(styles);

function OrderHistory(props) {
    const user = useSelector((state) => state.user.account);
    const [listOrders, setListOrders] = useState([]);
    const [activeItem, setActiveItem] = useState('');
    const [productsVisible, setProductsVisible] = useState({}); // Object to track visible products for each order

    useEffect(() => {
        if (window.location.pathname === '/order/history') {
            setActiveItem('order-history');
            fetchListOrders();
        }
    }, []);

    const fetchListOrders = async () => {
        let orders = await getOrdersByUserId(user.id);
        if (orders.EC === 0) {
            setListOrders(orders.DT);
            // Initialize visibility for each order with 2 products visible by default
            const initialVisibility = {};
            orders.DT.forEach(order => {
                initialVisibility[order.id] = 2;
            });
            setProductsVisible(initialVisibility);
        }
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

    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            return '0';
        }
        return price.toLocaleString('vi-VN');
    };

    const handleShowMoreProducts = (orderId) => {
        // Increase the number of visible products by 2 for the specific order
        setProductsVisible((prevState) => ({
            ...prevState,
            [orderId]: prevState[orderId] + 2,
        }));
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('sidebar')}>
                <div className={cx('avatar')}>
                    <img src={getImageSrc(user.image)} alt="avatar" />
                    <div className={cx('info')}>
                        Tài khoản của <strong>{user.username}</strong>
                    </div>
                </div>
                <div className={cx('sidebar_item')}>
                    <Link
                        className={cx('item', { 'is-active': activeItem === 'account-info' })}
                        onClick={() => setActiveItem('account-info')}
                    >
                        <FaUserLarge className={cx('icon')} />
                        <span>Thông tin tài khoản</span>
                    </Link>
                    <Link
                        to={'/order/history'}
                        className={cx('item', { 'is-active': activeItem === 'order-history' })}
                        onClick={() => setActiveItem('order-history')}
                    >
                        <RiBookReadFill className={cx('icon')} />
                        <span>Quản lý đơn hàng</span>
                    </Link>
                    <Link
                        className={cx('item', { 'is-active': activeItem === 'address-book' })}
                        onClick={() => setActiveItem('address-book')}
                    >
                        <IoLocation className={cx('icon')} />
                        <span>Sổ địa chỉ</span>
                    </Link>
                    <Link
                        className={cx('item', { 'is-active': activeItem === 'product-reviews' })}
                        onClick={() => setActiveItem('product-reviews')}
                    >
                        <FaMessage className={cx('icon')} />
                        <span>Đánh giá sản phẩm</span>
                    </Link>
                    <Link
                        className={cx('item', { 'is-active': activeItem === 'viewed-products' })}
                        onClick={() => setActiveItem('viewed-products')}
                    >
                        <FaEye className={cx('icon')} />
                        <span>Sản phẩm đã xem</span>
                    </Link>
                </div>
            </div>
            <div className={cx('container')}>
                <div className={cx('header')}>Đơn hàng của tôi</div>
                {listOrders &&
                    listOrders.length > 0 &&
                    listOrders.map((order, index) => {
                        const visibleProductsCount = productsVisible[order.id] || 2; // Get visible product count for this order
                        const totalProducts = order.Products.length;

                        return (
                            <div className={cx('content')} key={order.id}>
                                <div className={cx('title')}>{`Đơn hàng thứ ${index + 1}`}</div>
                                <div className={cx('orderInfo')}>
                                    {order.Products &&
                                        order.Products.slice(0, visibleProductsCount).map((product, index) => {
                                            return (
                                                <div className={cx('listProduct')} key={product.id}>
                                                    <div className={cx('product')}>
                                                        <div className={cx('detail')}>
                                                            <div
                                                                className={cx('product_img')}
                                                                style={{
                                                                    backgroundImage: `url(${getImageSrc(
                                                                        product.image,
                                                                    )})`,
                                                                }}
                                                            >
                                                                <span className={cx('quantity')}>
                                                                    x{product.Order_Product.quantity}
                                                                </span>
                                                            </div>
                                                            <div className={cx('product_info')}>
                                                                <p>{product.name}</p>
                                                            </div>
                                                        </div>
                                                        <div className={cx('price')}>
                                                            <span>{formatPrice(+product.Order_Product.price)}đ</span>
                                                        </div>
                                                    </div>
                                                </div>
                                            );
                                        })}
                                    {totalProducts > visibleProductsCount && (
                                        <div className={cx('btn_more')} onClick={() => handleShowMoreProducts(order.id)}>
                                            <p>Xem thêm 2 sản phẩm</p>
                                        </div>
                                    )}
                                </div>
                                <div className={cx('orderFooter')}>
                                    <div className={cx('total_price')}>
                                        <div className={cx('total_text')}>Tổng tiền: </div>
                                        <div className={cx('total')}>{formatPrice(+order.total_price)}đ</div>
                                    </div>
                                    <div className={cx('btn_see_detail')}>Xem chi tiết</div>
                                </div>
                            </div>
                        );
                    })}
            </div>
        </div>
    );
}

export default OrderHistory;
