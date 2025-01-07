import { useNavigate, Link } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import classNames from 'classnames/bind';

import { registerNewUser } from '../../../service/authService';
import styles from './Register.module.scss';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

const cx = classNames.bind(styles);

function Register(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const defaultValidInput = {
        isValidEmail: true,
        isValidPhone: true,
        isValidPassword: true,
        isConfirmPassword: true,
    };

    const [objCheckInput, setObjCheckInput] = useState(defaultValidInput);

    const validatePhone = (phone) => {
        return /^0\d{9}$/.test(phone);
    };

    const isValidInputs = () => {
        setObjCheckInput(defaultValidInput);

        if (!email) {
            toast.error('Email is required');
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            return false;
        }

        let regx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!regx.test(email)) {
            setObjCheckInput({ ...defaultValidInput, isValidEmail: false });
            toast.error('Please enter a valid email address');
            return false;
        }

        if (!phone) {
            toast.error('Phone is required');
            setObjCheckInput({ ...defaultValidInput, isValidPhone: false });
            return false;
        }

        if (!validatePhone(phone)) {
            toast.error('Số điện thoại phải bắt đầu với 0 và có 10 số');
            return;
        }

        if (!password) {
            toast.error('Password is required');
            setObjCheckInput({ ...defaultValidInput, isValidPassword: false });
            return false;
        }

        if (password !== confirmPassword) {
            toast.error('Your password is not the same');
            setObjCheckInput({ ...defaultValidInput, isConfirmPassword: false });
            return false;
        }

        return true;
    };

    const handleRegister = async () => {
        let check = isValidInputs();
        let userData = { email, phone, username, password };
        if (check === true) {
            let serverData = await registerNewUser(userData);
            if (+serverData.EC === 0) {
                toast.success(serverData.EM);
                navigate('/login');
            } else {
                toast.error(serverData.EM);
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('row', 'px-3', 'px-sm-0')}>
                    <div className={cx('content-left', 'col-sm-8', 'd-sm-block', 'd-none', 'col-0')}>
                        <div className={cx('brand', 'text-center')}>Tiki-Shop</div>
                        <div className={cx('detail', 'text-center')}>
                            Build your own database and clone the Tiki project with Fontend ReactJs, ReduxJs And Backend
                            Nodejs, ExpressJs
                        </div>
                    </div>
                    <div
                        className={cx(
                            'content-right',
                            'col-sm-4',
                            'col-12',
                            'd-flex',
                            'flex-column',
                            'gap-3',
                            'py-3',
                            'px-3',
                        )}
                    >
                        <div className={cx('brand', 'd-sm-none', 'd-block')}>Tiki-Shop</div>
                        <div className={cx('form-group')}>
                            <input
                                type="text"
                                className={cx('form-control', { 'is-invalid': !objCheckInput.isValidEmail })}
                                placeholder="Email address"
                                value={email}
                                onChange={(e) => {
                                    setEmail(e.target.value);
                                }}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <input
                                type="text"
                                className={cx('form-control', { 'is-invalid': !objCheckInput.isValidPhone })}
                                placeholder="Phone number"
                                value={phone}
                                onChange={(e) => {
                                    setPhone(e.target.value);
                                }}
                            />
                        </div>
                        <div className={cx('form-group')}>
                            <input
                                type="text"
                                className={cx('form-control')}
                                placeholder="Username"
                                value={username}
                                onChange={(e) => {
                                    setUsername(e.target.value);
                                }}
                            />
                        </div>
                        <div className={cx('form-group', 'password-group')}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={cx('form-control', { 'is-invalid': !objCheckInput.isValidPassword })}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <span className={cx('eye-icon')} onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <div className={cx('form-group', 'password-group')}>
                            <input
                                type={showConfirmPassword ? 'text' : 'password'}
                                className={cx('form-control', { 'is-invalid': !objCheckInput.isConfirmPassword })}
                                placeholder="Confirm password"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                            />
                            <span
                                className={cx('eye-icon')}
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button className={cx('btn', 'btn-primary')} onClick={handleRegister}>
                            Register
                        </button>
                        <hr />
                        <span className={cx('link_register')}>
                            Already've an account?
                            <Link to={'/login'} className={cx('btn_register')}>
                                Login
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Register;
