import React from 'react';
import classNames from 'classnames/bind';
import styles from "./SideBar.scss";

const cx = classNames.bind(styles)

function SideBar(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('category')}>
                <span>Danh mục</span>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
                <div className={cx('child')}>item 1</div>
            </div>
        </div>
    );
}

export default SideBar;