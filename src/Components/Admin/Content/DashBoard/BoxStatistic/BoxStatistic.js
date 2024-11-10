import React from 'react';
import classNames from 'classnames/bind';

import styles from './BoxStatistic.module.scss';
import { TfiShoppingCart } from 'react-icons/tfi';
import { FaArrowTurnUp } from 'react-icons/fa6';
import { FaRegUser } from 'react-icons/fa';
import { FaRegMoneyBillAlt } from 'react-icons/fa';

const cx = classNames.bind(styles);

function BoxStatistic(props) {
    const { listOrders, totalRevenue, formatPrice } = props;
    return (
        <div className={cx('statistic')}>
            <div className={cx('box_container')}>
                <div className={cx('box_content')}>
                    <h2>{listOrders ? listOrders.length : 0}</h2>
                    <div className={cx('css_title')}>New Order</div>
                    <div className={cx('css_percent')}>
                        <FaArrowTurnUp />
                        25% higher
                    </div>
                </div>
                <div className={cx('box_icon')}>
                    <TfiShoppingCart className={cx('css_icon')} />
                </div>
            </div>
            <div className={cx('box_container', 'box_income')}>
                <div className={cx('box_content')}>
                    <h2>{formatPrice(+totalRevenue)}</h2>
                    <div className={cx('css_title')}>Total Income</div>
                    <div className={cx('css_percent')}>
                        <FaArrowTurnUp />
                        25% higher
                    </div>
                </div>
                <div className={cx('box_icon')}>
                    <FaRegMoneyBillAlt className={cx('css_icon')} />
                </div>
            </div>
            <div className={cx('box_container', 'box_user')}>
                <div className={cx('box_content')}>
                    <h2>1250</h2>
                    <div className={cx('css_title')}>New Users</div>
                    <div className={cx('css_percent')}>
                        <FaArrowTurnUp />
                        25% higher
                    </div>
                </div>
                <div className={cx('box_icon')}>
                    <FaRegUser className={cx('css_icon')} />
                </div>
            </div>
        </div>
    );
}

export default BoxStatistic;
