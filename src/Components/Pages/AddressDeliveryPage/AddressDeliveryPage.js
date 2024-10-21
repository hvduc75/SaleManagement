import React, { useState } from 'react';
import classNames from 'classnames/bind';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import styles from './AddressDeliveryPage.module.scss';
import { IoMdRadioButtonOff, IoMdRadioButtonOn } from 'react-icons/io';
import { postCreateNewUserInfor, getUserInforDefault } from '../../../service/userInforApiService';
import { GetUserInforSuccess } from '../../../redux/action/userAction';

const cx = classNames.bind(styles);

function AddressDeliveryPage(props) {
    const [radioValue, setRadioValue] = useState('');
    const [province, setProvince] = useState('');
    const [district, setDistrict] = useState('');
    const [commune, setCommune] = useState('');
    const [address, setAddress] = useState('');
    const [isDefault, setIsDefault] = useState(false);
    const [hideForm, setHireForm] = useState(false);

    const phone = useSelector((state) => state.user.account.phone);
    const username = useSelector((state) => state.user.account.username);
    const userId = useSelector((state) => state.user.account.id);
    const userInfor = useSelector((state) => state.user.userInfor);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleRadioChange = (value) => {
        setRadioValue(value);
    };

    const handleAddNew = async () => {
        let data = await postCreateNewUserInfor(province, district, commune, address, radioValue, isDefault, userId);
        if (data && data.EC === 0) {
            toast.success('Địa chỉ của bạn đã được thêm thành công');
            navigate('/checkout/payment');
            let userInfor = await getUserInforDefault(userId);
            dispatch(GetUserInforSuccess(userInfor));
        } else {
            toast.error(data.EM);
        }
    };

    const handleKeepAddress = () => {
        navigate('/cart');
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                {Object.keys(userInfor).length > 0 && (
                    <div className={cx('address_list')}>
                        <h3 className={cx('title')}>2. Địa chỉ giao hàng</h3>
                        <h5 className={cx('address_list_text')}>Chọn địa chỉ giao hàng có sẵn bên dưới: </h5>
                        <div className={cx('address_list')}>
                            <div className={cx('address_item')}>
                                <p className={cx('name')}>{username}</p>
                                <p
                                    className={cx('address')}
                                >{`Địa chỉ: ${userInfor.address}, Xã ${userInfor.commune}, Huyện ${userInfor.district}, ${userInfor.province}`}</p>
                                <p className={cx('address')}>Việt Nam</p>
                                <p className={cx('phone')}>{`Điện thoại: ${phone}`}</p>
                                <p className={cx('action')}>
                                    <button onClick={() => handleKeepAddress()} className={cx('btn', 'saving_address')}>
                                        Giao đến địa chỉ này
                                    </button>
                                    <button onClick={() => setHireForm(true)} className={cx('btn', 'edit_address')}>
                                        Sửa
                                    </button>
                                </p>
                            </div>
                        </div>
                    </div>
                )}
                {Object.keys(userInfor).length > 0 ? (
                    <div className={cx('add_new')}>
                        Bạn muốn giao hàng đến địa chỉ khác? <span>Thêm địa chỉ giao hàng mới</span>
                    </div>
                ) : (
                    <div className={cx('add_new')}></div>
                )}
                {(Object.keys(userInfor).length === 0 || hideForm) && (
                    <div className={cx('address_form')}>
                        <div className={cx('form_container')}>
                            <div className={cx('style_form_item')}>
                                <label>Họ tên</label>
                                <input
                                    type="text"
                                    name=""
                                    value={`${username}`}
                                    className={cx('style_input')}
                                    readOnly
                                    style={{
                                        backgroundColor: '#e9ecef',
                                    }}
                                />
                            </div>
                            <div className={cx('style_form_item')}>
                                <label>Điện thoại di động</label>
                                <input
                                    type="text"
                                    style={{
                                        backgroundColor: '#e9ecef',
                                    }}
                                    name="phone"
                                    readOnly
                                    value={`${phone}`}
                                    className={cx('style_input')}
                                />
                            </div>
                            <div className={cx('style_form_item')}>
                                <label>Tỉnh/Thành phố</label>
                                <input
                                    type="text"
                                    placeholder="Ví dụ : Nam Định"
                                    value={province}
                                    onChange={(event) => setProvince(event.target.value)}
                                    className={cx('style_input')}
                                />
                            </div>
                            <div className={cx('style_form_item')}>
                                <label>Quận/Huyện</label>
                                <input
                                    type="text"
                                    placeholder="Ví dụ : Ý Yên"
                                    value={district}
                                    onChange={(event) => setDistrict(event.target.value)}
                                    className={cx('style_input')}
                                />
                            </div>
                            <div className={cx('style_form_item')}>
                                <label>Phường/Xã</label>
                                <input
                                    type="text"
                                    placeholder="Ví dụ : Yên Trị"
                                    value={commune}
                                    onChange={(event) => setCommune(event.target.value)}
                                    className={cx('style_input')}
                                />
                            </div>
                            <div className={cx('style_form_item')}>
                                <label>Địa chỉ</label>
                                <textarea
                                    type="textarea"
                                    placeholder="Ví dụ : Ngọc Chấn"
                                    value={address}
                                    onChange={(event) => setAddress(event.target.value)}
                                    className={cx('style_area')}
                                />
                            </div>
                            <div className={cx('style_form_item')}>
                                <label></label>
                                <span style={{ fontSize: '11px', fontStyle: 'italic' }}>
                                    Để nhận hàng thuận tiện hơn, bạn vui lòng cho Tiki biết loại địa chỉ.
                                </span>
                            </div>
                            <div className={cx('style_form_item')}>
                                <label>Loại địa chỉ</label>
                                <span className={cx('address_type')}>
                                    <label
                                        style={{ cursor: 'pointer', fontSize: '12px', width: '50%', fontWeight: '500' }}
                                    >
                                        <label htmlFor="home" className={cx('radio_fake')}>
                                            <input
                                                type="radio"
                                                id="home"
                                                name="delivery_address_type"
                                                style={{ display: 'none' }}
                                                onChange={() => handleRadioChange('home')}
                                            />
                                            <span>
                                                {radioValue === 'home' ? (
                                                    <IoMdRadioButtonOn className={cx('btn_radio_on')} />
                                                ) : (
                                                    <IoMdRadioButtonOff className={cx('btn_radio_off')} />
                                                )}
                                            </span>
                                        </label>
                                        Nhà riêng / Chung cư
                                    </label>
                                    <label
                                        style={{ cursor: 'pointer', fontSize: '12px', width: '50%', fontWeight: '500' }}
                                    >
                                        <label htmlFor="company" className={cx('radio_fake')}>
                                            <input
                                                type="radio"
                                                id="company"
                                                name="delivery_address_type"
                                                style={{ display: 'none' }}
                                                onChange={() => handleRadioChange('company')}
                                            />
                                            <span>
                                                {radioValue === 'company' ? (
                                                    <IoMdRadioButtonOn className={cx('btn_radio_on')} />
                                                ) : (
                                                    <IoMdRadioButtonOff className={cx('btn_radio_off')} />
                                                )}
                                            </span>
                                        </label>
                                        Cơ quan / Công ty
                                    </label>
                                </span>
                            </div>
                            <div className={cx('style_form_item')}>
                                <label></label>
                                <label
                                    htmlFor="address_default"
                                    style={{
                                        width: '66.66%',
                                        display: 'flex',
                                        alignItems: 'center',
                                        fontWeight: '500',
                                    }}
                                >
                                    <input
                                        type="checkbox"
                                        id="address_default"
                                        checked={isDefault}
                                        onChange={() => setIsDefault(!isDefault)}
                                        style={{ width: '19px', height: '19px', marginRight: '4px', marginLeft: '3px' }}
                                    />
                                    Sử dụng địa chỉ này làm mặc định.
                                </label>
                            </div>
                            <div className={cx('style_form_item')}>
                                <label></label>
                                <div className={cx('btn_group')}>
                                    {hideForm && (
                                        <button onClick={() => setHireForm(false)} className={cx('btn_cancel')}>
                                            Hủy bỏ
                                        </button>
                                    )}
                                    <button onClick={handleAddNew} className={cx('btn_update')}>
                                        {hideForm ? 'Cập nhật' : 'Thêm mới'}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}

export default AddressDeliveryPage;
