import {useState} from 'react';
import classNames from 'classnames/bind';
import styles from './ManageUser.module.scss';
import { FcPlus } from 'react-icons/fc';
import ModalCreateUser from './AddUser/ModalCreateUser';

const cx = classNames.bind(styles);

function ManageUser(props) {
    const [showModalCreateUser, setShowModalCreateUser] = useState(false);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>Manage User</div>
            <div className={cx('user-content')}>
                <div className={cx('btn-add-new')}>
                    <button className={cx('btn btn-primary')} onClick={() => setShowModalCreateUser(true)}>
                        <div className={cx('btn-add')}>
                            <FcPlus className={cx('icon_plus')} />
                            <span>Add new user</span>
                        </div>
                    </button>
                </div>
                <div className={cx('table-user-container')}></div>
                <ModalCreateUser
                    show={showModalCreateUser}
                    setShow={setShowModalCreateUser}
                    //   fetchListUsers={fetchListUsers}
                    //   fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                    //   currentPage={currentPage}
                    //   setCurrentPage={setCurrentPage}
                />
            </div>
        </div>
    );
}

export default ManageUser;
