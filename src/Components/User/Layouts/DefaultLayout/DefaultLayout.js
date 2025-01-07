import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Outlet } from 'react-router-dom';
import Header from '../../Header/Header';
import ModalPhone from './ModalPhone/ModalPhone';
import classNames from 'classnames/bind';
import styles from './DefaultLayout.module.scss';

const cx = classNames.bind(styles);

function DefaultLayout(props) {
    const user = useSelector((state) => state.user.account);
    const [show, setShow] = useState(false);

    useEffect(() => {
        if (user && user.access_token && !user.phone) {
            setShow(true);
        }
    }, [user]);

    return (
        <>
            <div className={cx('wrapper')}>
                <div className={cx('container_header')}>
                    <div className={cx('inner')}>
                        <Header />
                    </div>
                </div>
                <div className={cx('container')}>
                    <Outlet />
                </div>
            </div>
            <ModalPhone show={show} setShow={setShow} />
        </>
    );
}

export default DefaultLayout;
