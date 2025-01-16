import React, { useState } from 'react';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import classNames from 'classnames/bind';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

import style from './ModalPhone.module.scss';
import { logout } from '../../../../../service/authService';
import { UserLogoutSuccess, UpdatePhoneSuccess } from '../../../../../redux/action/userAction';
import { UpdatePhone } from '../../../../../service/userApiService';

const cx = classNames.bind(style);

function ModalPhone(props) {
    const { show, setShow } = props;
    const dispatch = useDispatch();
    const [phone, setPhone] = useState('');
    const user = useSelector((state) => state.user.account);

    const handleClose = async () => {
        setShow(false);
        localStorage.removeItem('isLogged');
        dispatch(UserLogoutSuccess());
        await logout();
    };

    const getImageSrc = (image) => {
        if (image && image.data) {
            const byteArray = new Uint8Array(image.data);
            let binary = '';
            byteArray.forEach((byte) => {
                binary += String.fromCharCode(byte);
            });
            return `data:image/jpeg;base64,${window.btoa(binary)}`;
        }
        return null;
    };

    const validatePhone = (phone) => {
        return /^0\d{9}$/.test(phone);
    };

    const handleUpdatePhone = async () => {
        if (!validatePhone(phone)) {
            toast.error('Số điện thoại phải bắt đầu với 0 và có 10 số');
            return;
        }
        let res = await UpdatePhone(user.email, phone);
        if (res && res.EC === 0) {
            dispatch(UpdatePhoneSuccess(phone));
            setShow(false);
        } else {
            toast.error(res.EM);
        }
    };

    return (
        <div>
            <Modal show={show} onHide={handleClose} size="md" backdrop="static" className={cx('modal-update-phone')}>
                <Modal.Header closeButton>
                    <Modal.Title>Cập nhật số điện thoại của bạn</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <div className={cx('form_wrapper')}>
                        <div className={cx('avatar')}>
                            <img
                                src={
                                    getImageSrc(user.image) ||
                                    'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&s'
                                }
                                alt="avatar"
                            />
                        </div>
                        <div className={cx('title')}>{user.username}</div>
                        <input
                            placeholder="Số điện thoại"
                            onChange={(event) => setPhone(event.target.value)}
                            value={phone}
                        />
                        <Button variant="primary" onClick={handleUpdatePhone}>
                            Cập nhật
                        </Button>
                    </div>
                </Modal.Body>
            </Modal>
        </div>
    );
}

export default ModalPhone;