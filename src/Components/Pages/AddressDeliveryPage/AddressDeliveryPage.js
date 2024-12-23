import React, { useEffect, useState } from 'react';
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
    const [provinceCode, setProvinceCode] = useState('');
    const [districtCode, setDistrictCode] = useState('');
    const [communeCode, setCommuneCode] = useState('');
    const [address, setAddress] = useState('');
    const [isDefault, setIsDefault] = useState(false);
    const [hideForm, setHireForm] = useState(false);
    const [listProvince, setListProvince] = useState([]);
    const [listDistrict, setListDistrict] = useState([]);
    const [listCommune, setListCommune] = useState([]);

    const phone = useSelector((state) => state.user.account.phone);
    const username = useSelector((state) => state.user.account.username);
    const userId = useSelector((state) => state.user.account.id);
    const userInfor = useSelector((state) => state.user.userInfor);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    useEffect(() => {
        const fetchProvinces = async () => {
            try {
                const response = await fetch('https://provinces.open-api.vn/api/?depth=1');
                const data = await response.json();
                setListProvince(data);
            } catch (error) {
                console.error('Error fetching provinces:', error);
            }
        };
        fetchProvinces();
    }, []);

    const handleProvinceChange = async (e) => {
        const selectedProvinceCode = e.target.value;
        console.log(selectedProvinceCode);
        setProvinceCode(selectedProvinceCode);
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/p/${selectedProvinceCode}?depth=2`);
            const data = await response.json();
            setListDistrict(data.districts || []);
        } catch (error) {
            console.error('Error fetching districts:', error);
        }
    };

    const handleDistrictChange = async (e) => {
        const selectedDistrictCode = e.target.value;
        setDistrictCode(selectedDistrictCode);
        try {
            const response = await fetch(`https://provinces.open-api.vn/api/d/${selectedDistrictCode}?depth=2`);
            const data = await response.json();
            setListCommune(data.wards || []);
        } catch (error) {
            console.error('Error fetching communes:', error);
        }
    };

    const handleRadioChange = (value) => {
        setRadioValue(value);
    };

    const handleAddNew = async () => {
        const getProvinceName = (provinceCode) => {
            const provinceSelected = listProvince.find((item) => item.code === +provinceCode);
            // console.log(provinceCode)
            // console.log(provinceSelected)
            return provinceSelected ? provinceSelected.name : 'Không xác định';
        };

        const getDistrictName = (districtCode) => {
            const districtSelected = listDistrict.find((item) => item.code === +districtCode);
            return districtSelected ? districtSelected.name : 'Không xác định';
        };

        const getCommuneName = (communeCode) => {
            const communeSelected = listCommune.find((item) => item.code === +communeCode);
            // console.log(communeCode)
            // console.log(commune)
            return communeSelected ? communeSelected.name : 'Không xác định';
        };
        setProvince(getProvinceName(provinceCode));
        setDistrict(getDistrictName(districtCode));
        setCommune(getCommuneName(communeCode));
        console.log(province, district, commune, address, radioValue, isDefault, userId);

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
                {userInfor.id !== undefined && (
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
                {userInfor.id !== undefined ? (
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
                                <select
                                    value={provinceCode}
                                    className={cx('style_input')}
                                    onChange={handleProvinceChange}
                                >
                                    <option value="">Chọn Tỉnh/Thành Phố</option>
                                    {listProvince.map((province) => (
                                        <option key={province.code} value={province.code}>
                                            {province.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={cx('style_form_item')}>
                                <label>Quận/Huyện</label>
                                <select
                                    value={districtCode}
                                    className={cx('style_input')}
                                    onChange={handleDistrictChange}
                                >
                                    <option value="">Chọn Quận/Huyện</option>
                                    {listDistrict.map((district) => (
                                        <option key={district.code} value={district.code}>
                                            {district.name}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className={cx('style_form_item')}>
                                <label>Phường/Xã</label>
                                <select
                                    value={communeCode}
                                    className={cx('style_input')}
                                    onChange={(e) => setCommuneCode(e.target.value)}
                                >
                                    <option value="">Chọn Phường/Xã</option>
                                    {listCommune.map((commune) => (
                                        <option key={commune.code} value={commune.code}>
                                            {commune.name}
                                        </option>
                                    ))}
                                </select>
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
