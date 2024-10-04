import React from 'react';
import classNames from 'classnames/bind';
import styles from './Header.module.scss';
import { Link } from 'react-router-dom';
import images from '../../../assets/images';
import { IoMdSearch } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5';
import { RiHome5Line } from 'react-icons/ri';
import { FaRegFaceSmileWink } from 'react-icons/fa6';

const cx = classNames.bind(styles);

function Header(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-left')}>
                <Link className={cx('tiki-logo')}>
                    <img src={images.logo} alt="logo-tiki" style={{ height: '40px', width: '96px' }} />
                    <span className={cx('logo-desc')}>Tốt & Nhanh</span>
                </Link>
            </div>
            <div className={cx('header-right')}>
                <div className={cx('header-top')}>
                    <div className={cx('search')}>
                        <div className={cx('search-icon')}>
                            <IoMdSearch style={{ width: '20px', height: '20px' }} />
                        </div>
                        <input className={cx('search-input')} placeholder="Freeship đơn từ 45k" />
                        <div className={cx('btn-search')}>Tìm Kiếm</div>
                    </div>
                    <div className={cx('user-shortcut')}>
                        <div className={cx('home')}>
                            <RiHome5Line className={cx('shortcut-icon')} />
                            <span>Trang chủ</span>
                        </div>
                        <div className={cx('account')}>
                            <FaRegFaceSmileWink className={cx('shortcut-icon')} />
                            <span>Tài Khoản</span>
                        </div>
                        <div className={cx('cart')}>
                            <IoCartOutline className={cx('shortcut-icon')} />
                            <span className={cx('itemCart')}>0</span>
                        </div>
                    </div>
                </div>
                <div className={cx('header-bottom')}>
                    <span>điện gia dụng</span>
                    <span>xe cộ</span>
                    <span>mẹ & bé</span>
                    <span>khỏe đẹp</span>
                    <span>nhà cửa</span>
                    <span>sách</span>
                    <span>thể thao</span>
                </div>
            </div>
            <div></div>
        </div>
    );
}

export default Header;
