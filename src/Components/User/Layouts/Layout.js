import React from 'react';
import classNames from 'classnames/bind';

import styles from './Layout.module.scss';
import Header from '../Header/Header';
import { Outlet } from 'react-router-dom';

const cx = classNames.bind(styles);

function Layout(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Header />
            </div>
            <div className={cx('container')}>
                <Outlet />
            </div>
        </div>
    );
}

export default Layout;
