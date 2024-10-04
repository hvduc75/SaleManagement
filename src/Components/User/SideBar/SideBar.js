import React from 'react';
import classNames from 'classnames/bind';
import styles from "./SideBar.scss";

const cx = classNames.bind(styles)

function SideBar(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('category')}>
                <span className={cx('category-title')}>Danh mục</span>
                <div className={cx('category-child')}>
                    <div className={cx('category-inner')}>
                        <div className={cx('category-image')}></div>
                        <span className={cx('category-name')}>Nhà Sách Tiki</span>
                    </div>
                </div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
                <div className={cx('category-child')}>item 1</div>
            </div>
        </div>
    );
}

export default SideBar;