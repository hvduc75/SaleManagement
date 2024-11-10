import React from 'react';
import classNames from 'classnames/bind';

import styles from './ListOrder.module.scss';

const cx = classNames.bind(styles);

function ListOrder(props) {
    const { listOrders, formatPrice } = props;
    
    const formatDate = (dateString) => {
        const date = new Date(dateString);
        return date.toLocaleDateString('vi-VN');
    };
    
    return (
        <div className={cx('list_order')}>
            <div className={cx('title_table')}>Latest Orders</div>
            <div className={cx('table_wrapper')}>
                <table>
                    <thead>
                        <tr>
                            <th>Order ID</th>
                            <th>Customer</th>
                            <th>Amount</th>
                            <th>Status</th>
                            <th>Date</th>
                        </tr>
                    </thead>
                    <tbody>
                        {listOrders &&
                            listOrders.length > 0 &&
                            listOrders.map((order) => {
                                return (
                                    <tr key={order.id}>
                                        <td>{order.id}</td>
                                        <td>{order.User.username}</td>
                                        <td>
                                            {formatPrice(+order.total_price)}
                                            <sup>đ</sup>
                                        </td>
                                        <td>{order.order_status}</td>
                                        <td>{formatDate(order.order_date)}</td>
                                    </tr>
                                );
                            })}
                    </tbody>
                </table>
            </div>
        </div>
    );
}

export default ListOrder;
