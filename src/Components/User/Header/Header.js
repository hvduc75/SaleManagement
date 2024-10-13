import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { Link, useNavigate  } from 'react-router-dom';

import styles from './Header.module.scss';
import images from '../../../assets/images';
import { IoMdSearch } from 'react-icons/io';
import { IoCartOutline } from 'react-icons/io5';
import { AiFillHome } from "react-icons/ai";
import Account from './Account/Account';

const cx = classNames.bind(styles);

function Header(props) {
    const [isActiveHome, setIsActiveHome] = useState(false);
    const navigate = useNavigate();
    const handleClickHome = () => {
        navigate("/")
        setIsActiveHome(true);
    }

    return (
        <div className={cx('wrapper')}>
            <div className={cx('header-left')}>
                <Link to={"/"} className={cx('tiki-logo')}>
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
                        <div onClick={() => handleClickHome()} className={isActiveHome && window.location.pathname === "/" ? cx('home', 'activeHome') : cx('home')}>
                            <AiFillHome className={cx('shortcut-icon')} />
                            <span>Trang chủ</span>
                        </div>
                        <Account />
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
