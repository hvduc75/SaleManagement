import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import classNames from 'classnames/bind';

import styles from './OrderHistory.module.scss';
import { IoMdSearch } from 'react-icons/io';
import { getOrdersByUserId, cancelOrder, getOrdersBySearchText } from '../../../service/orderApiService';
import { paymentWithVnPay } from '../../../service/paymentService';
import { toast } from 'react-toastify';
import OrderContent from './OrderContent/OrderContent';

const cx = classNames.bind(styles);

function OrderHistory(props) {
    const navigate = useNavigate();
    const user = useSelector((state) => state.user.account);
    const [listOrders, setListOrders] = useState([]);
    const [productsVisible, setProductsVisible] = useState({});
    const [activeTab, setActiveTab] = useState('All');
    const [searchText, setSearchText] = useState('');

    useEffect(() => {
        const savedActiveTab = sessionStorage.getItem('activeTab') || 'All';
        setActiveTab(savedActiveTab);
        fetchListOrders(savedActiveTab);
        sessionStorage.removeItem('activeTab');
    }, [user]);

    const fetchListOrders = async (tab) => {
        let orders = await getOrdersByUserId(user.id, tab);
        if (orders.EC === 0) {
            setListOrders(orders.DT);
            const initialVisibility = {};
            orders.DT.forEach((order) => {
                initialVisibility[order.id] = 2;
            });
            setProductsVisible(initialVisibility);
        }
    };

    const handleOnclickTab = async (tab) => {
        setSearchText('');
        setActiveTab(tab);
        fetchListOrders(tab);
    };

    const handleShowMoreProducts = (orderId) => {
        setProductsVisible((prevState) => ({
            ...prevState,
            [orderId]: prevState[orderId] + 2,
        }));
    };

    const handleViewOrderDetail = (orderId) => {
        sessionStorage.setItem('activeTab', activeTab);
        navigate(`/order/view/${orderId}`);
    };

    const handleBuyBack = async (order) => {
        let res = await paymentWithVnPay(order.total_price, order.id, 'NCB', 'vn');
        window.location.href = res.paymentUrl;
    };

    const handleCancelOrder = async (order) => {
        let data = await cancelOrder(order.id);
        if (data.EC === 0) {
            toast.success('Hủy đơn hàng thành công, vui lòng đợi hoàn tiền');
            handleOnclickTab(activeTab);
        } else {
            toast.error(data.EM);
        }
    };

    const handleSearchOrder = async () => {
        if (searchText) {
            let orders = await getOrdersBySearchText(user.id, activeTab, searchText);
            if (orders.EC === 0) {
                setListOrders(orders.DT);
                const initialVisibility = {};
                orders.DT.forEach((order) => {
                    initialVisibility[order.id] = 2;
                });
                setProductsVisible(initialVisibility);
            }
        } else {
            handleOnclickTab(activeTab);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('header')}>Đơn hàng của tôi</div>
                <div className={cx('header_tab')}>
                    {['All', 'Payment', 'Processing', 'Shipping', 'Delivered', 'Canceled'].map((tab) => (
                        <div
                            key={tab}
                            onClick={() => handleOnclickTab(tab)}
                            className={cx(activeTab === tab ? 'style_tab_active' : 'style_tab')}
                        >
                            {tab === 'All' && 'Tất cả đơn'}
                            {tab === 'Payment' && 'Chờ thanh toán'}
                            {tab === 'Processing' && 'Đang xử lý'}
                            {tab === 'Shipping' && 'Đang vận chuyển'}
                            {tab === 'Delivered' && 'Đã giao'}
                            {tab === 'Canceled' && 'Đã hủy'}
                        </div>
                    ))}
                </div>
                <div className={cx('header_search')}>
                    <IoMdSearch className={cx('search-icon')} />
                    <input
                        type="text"
                        value={searchText}
                        onChange={(e) => setSearchText(e.target.value)}
                        onKeyDown={(e) => e.key === 'Enter' && handleSearchOrder()}
                        placeholder="Tìm đơn hàng theo Mã đơn hàng, Tên sản phẩm"
                    ></input>
                    <div className={cx('search_right')} onClick={() => handleSearchOrder()}>
                        Tìm đơn hàng
                    </div>
                </div>
                <OrderContent
                    activeTab={activeTab}
                    handleBuyBack={handleBuyBack}
                    handleCancelOrder={handleCancelOrder}
                    handleShowMoreProducts={handleShowMoreProducts}
                    handleViewOrderDetail={handleViewOrderDetail}
                    listOrders={listOrders}
                    productsVisible={productsVisible}
                    fetchListOrders={fetchListOrders}
                />
            </div>
        </div>
    );
}

export default OrderHistory;
