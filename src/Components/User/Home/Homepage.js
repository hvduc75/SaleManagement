import React from 'react';
import Header from '../Header/Header';
import classNames from 'classnames/bind';
import styles from './Homepage.module.scss';
import SideBar from '../SideBar/SideBar';
import Content from '../Content/Content';

const cx = classNames.bind(styles);

function Homepage(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('inner')}>
                <Header />
            </div>
            <div className={cx('container')}>
                <SideBar />
                <Content />
            </div>
        </div>
    );
}

export default Homepage;