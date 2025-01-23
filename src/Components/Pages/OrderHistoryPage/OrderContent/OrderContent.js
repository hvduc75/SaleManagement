import React, { useState } from 'react';
import classNames from 'classnames/bind';

import styles from './OrderContent.module.scss';
import images from '../../../../assets/images';
import ModalFeedback from '../ModalFeedBack/ModalFeedBack';
const cx = classNames.bind(styles);

function OrderContent(props) {
    const {
        listOrders,
        productsVisible,
        handleShowMoreProducts,
        handleBuyBack,
        handleCancelOrder,
        activeTab,
        handleViewOrderDetail,
        fetchListOrders
    } = props;
    const [selectedOrder, setSelectedOrder] = useState(null);

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

    const handleOpenFeedback = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseFeedbackModal = () => {
        setSelectedOrder(null);
    };

    console.log(selectedOrder)

    return (
        <>
            {listOrders && listOrders.length > 0 ? (
                listOrders.map((order, index) => {
                    const visibleProductsCount = productsVisible[order.id] || 2;
                    const totalProducts = order.Products.length;

                    return (
                        <div className={cx('content')} key={order.id}>
                            <div className={cx('title')}>
                                {order.order_status === 0
                                    ? 'Đang xử lý'
                                    : order.order_status === 1
                                    ? 'Đang giao'
                                    : order.order_status === 2
                                    ? 'Đã giao'
                                    : order.order_status === 3
                                    ? `Đã hủy ${
                                          order.payment_status === 2
                                              ? '- Hoàn tiền thành công'
                                              : order.payment_status === 3 && order.payment_method === 'NCB'
                                              ? '- Quá thời gian thanh toán'
                                              : order.payment_status === 3
                                              ? ''
                                              : '- Đang xử lý hoàn tiền vui lòng chờ'
                                      }`
                                    : order.payment_status === 0 && order.payment_method === 'NCB'
                                    ? 'Chờ thanh toán'
                                    : 'Thành công'}
                            </div>
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
                                                                backgroundImage: `url(${getImageSrc(product.image)})`,
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
                                <div className={cx('group_button')}>
                                    {order.payment_status === 0 && activeTab === 'Payment' && (
                                        <div className={cx('btn_buy_back', 'btn')} onClick={() => handleBuyBack(order)}>
                                            Thanh toán lại
                                        </div>
                                    )}
                                    {order.order_status === 0 && activeTab === 'Processing' && (
                                        <div
                                            className={cx('btn_cancel', 'btn')}
                                            onClick={() => handleCancelOrder(order)}
                                        >
                                            Hủy đơn hàng
                                        </div>
                                    )}
                                    {order.order_status === 2 && order.payment_status === 1 && (
                                        <div
                                            className={cx('btn_cancel', 'btn')}
                                            onClick={() => handleOpenFeedback(order)}
                                        >
                                            Đánh Giá
                                        </div>
                                    )}
                                    <div
                                        className={cx('btn_see_detail', 'btn')}
                                        onClick={() => handleViewOrderDetail(order.id)}
                                    >
                                        Xem chi tiết
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })
            ) : (
                <div className={cx('content')}>
                    <div className={cx('emptyOrder')}>
                        <img src={images.emptyOrder} alt="logo" />
                        <span>Chưa có đơn hàng</span>
                    </div>
                </div>
            )}
            {selectedOrder && (
                <ModalFeedback
                    isOpen={!!selectedOrder}
                    onClose={handleCloseFeedbackModal}
                    products={selectedOrder.Products}
                    getImageSrc={getImageSrc}
                    orderId={selectedOrder.id}
                    fetchListOrders={fetchListOrders}
                    activeTab={activeTab}
                />
            )}
        </>
    );
}

export default OrderContent;
