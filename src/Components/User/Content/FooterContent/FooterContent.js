import React from 'react';
import classNames from 'classnames/bind';

import { FaFacebook, FaTwitter, FaInstagram, FaYoutube } from 'react-icons/fa';
import styles from './FooterContent.module.scss';
import images from '../../../../assets/images/index';

const cx = classNames.bind(styles);

function FooterContent() {
    return (
        <footer className={cx('wrapper')}>
            <div className={cx('content')}>
                <div className={cx('help')}>
                    <h4 className={cx('title')}>Hỗ trợ khách hàng</h4>
                    <p>Các câu hỏi thường gặp</p>
                    <p>Gửi yêu cầu hỗ trợ</p>
                    <p>Hướng dẫn đặt hàng</p>
                    <p>Phương thức vận chuyển</p>
                    <p>Chính sách kiểm hàng</p>
                    <p>Chính sách đổi trả</p>
                    <p>Chính sách hàng nhập khẩu</p>
                    <p>Hướng dẫn trả góp</p>
                </div>
                <div className={cx('about')}>
                    <h4 className={cx('title')}>Về Shop</h4>
                    <p>Chính sách bảo mật thanh toán</p>
                    <p>Chính sách bảo mật thông tin cá nhân</p>
                    <p>Chính sách giải quyết khiếu nại</p>
                    <p>Điều khoản sử dụng</p>
                    <p>Điều kiện vận chuyển</p>
                </div>
                <div className={cx('payment')}>
                    <h4 className={cx('title')}>Phương thức thanh toán</h4>
                    <div className={cx('icons')}>
                        <img src={images.pm_cash} className={cx('icon')} alt="image_payment" />
                        <img src={images.pm_viettel} className={cx('icon')} alt="image_payment" />
                        <img src={images.pm_momo} className={cx('icon')} alt="image_payment" />
                        <img src={images.pm_zalopay} className={cx('icon')} alt="image_payment" />
                        <img src={images.pm_vnpay} className={cx('icon')} alt="image_payment" />
                    </div>
                </div>
                <div className={cx('social')}>
                    <h4 className={cx('title')}>kết nối với chúng tôi</h4>
                    <div className={cx('icons')}>
                        <FaFacebook className={cx('icon', 'facebook')} />
                        <FaTwitter className={cx('icon', 'twitter')} />
                        <FaInstagram className={cx('icon', 'instagram')} />
                        <FaYoutube className={cx('icon', 'youtube')} />
                    </div>
                </div>
            </div>
        </footer>
    );
}

export default FooterContent;
