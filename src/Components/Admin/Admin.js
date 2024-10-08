import { useState } from 'react';
import AdminSideBar from './AdminSideBar';
import classNames from 'classnames/bind';
import { Outlet } from 'react-router-dom';
import { FaBars } from 'react-icons/fa';
import PerfectScrollbar from 'react-perfect-scrollbar';

import styles from './Admin.module.scss';
import "react-perfect-scrollbar/dist/css/styles.css";

const cx = classNames.bind(styles);

function Admin(props) {
    const [collapsed, setCollapsed] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('admin-sidebar')}>
                <AdminSideBar collapsed={collapsed} />
            </div>
            <div className={cx('admin-content')}>
                <div className={cx('admin-header')}>
                    <span onClick={() => setCollapsed(!collapsed)}>
                        <FaBars className="leftside" />
                    </span>
                    {/* <div className="rightside">
                        <Language />
                        <NavDropdown title="Settings" id="basic-nav-dropdown">
                            <NavDropdown.Item>Profile</NavDropdown.Item>
                            <NavDropdown.Item>Log out</NavDropdown.Item>
                        </NavDropdown>
                    </div> */}
                </div>
                <div className={cx('admin-main')}>
                    <PerfectScrollbar>
                        <Outlet />
                    </PerfectScrollbar>
                </div>
            </div>
        </div>
    );
}

export default Admin;
