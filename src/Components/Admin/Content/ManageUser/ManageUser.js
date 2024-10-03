import { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ManageUser.module.scss';
import { FcPlus } from 'react-icons/fc';
import ModalCreateUser from './AddUser/ModalCreateUser';
import TableUserPaginate from './TableUser/TableUserPaginate';
import { getUserWithPaginate } from '../../../../service/apiService';

const cx = classNames.bind(styles);

function ManageUser(props) {
    const LIMIT_USER = 6;
    const [listUsers, setListUsers] = useState([]);
    const [pageCount, setPageCount] = useState(0);
    const [currentPage, setCurrentPage] = useState(1);

    const [showModalCreateUser, setShowModalCreateUser] = useState(false);

    useEffect(() => {
        fetchListUsersWithPaginate(1);
    }, []);

    const fetchListUsersWithPaginate = async (page) => {
        let res = await getUserWithPaginate(page, LIMIT_USER);
        if (res.EC === 0) {
            setListUsers(res.DT.users);
            setPageCount(res.DT.totalPages);
        }
    };

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
                <div className={cx('table-user-container')}>
                    <TableUserPaginate
                        listUsers={listUsers}
                        // handleClickBtnUpdate={handleClickBtnUpdate}
                        // handleClickBtnView={handleClickBtnView}
                        // handleClickBtnDelete={handleClickBtnDelete}
                        fetchListUsersWithPaginate={fetchListUsersWithPaginate}
                        pageCount={pageCount}
                        currentPage={currentPage}
                        setCurrentPage={setCurrentPage}
                    />
                </div>
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
