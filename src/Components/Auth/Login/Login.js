import { Link, useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import classNames from 'classnames/bind';

import { UserLoginSuccess, GetUserInforSuccess } from '../../../redux/action/userAction';
import { getCartId, getListProductsSuccess } from '../../../redux/action/cartAction';
import styles from './Login.module.scss';
import { loginUser } from '../../../service/authService';
import { getCartByUserId, getProductsByCartId } from '../../../service/cartApiService';
import { getUserInforDefault } from '../../../service/userInforApiService';
import { FaEye, FaEyeSlash, FaGooglePlusG } from 'react-icons/fa';
import { FaFacebook } from 'react-icons/fa6';

const cx = classNames.bind(styles);

function Login(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [valueLogin, setValueLogin] = useState('');
    const [password, setPassword] = useState('');
    const [showPassword, setShowPassword] = useState(false);

    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    };
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

    const handleLoginWithGoogle = () => {
        window.open(`http://localhost:8080/auth/google`, '_self');
    };

    const handleLoginWithFacebook = () => {
        window.open(`http://localhost:8080/auth/facebook`, '_self');
    };

    const handleLogin = async () => {
        setObjValidInput(defaultObjValidInput);

        if (!valueLogin) {
            toast.error('Please enter your email address or phone number');
            setObjValidInput({ ...defaultObjValidInput, isValidValueLogin: false });
            return;
        }
        if (!password) {
            toast.error('Please enter your password');
            setObjValidInput({ ...defaultObjValidInput, isValidPassword: false });
            return;
        }
        let response = await loginUser(valueLogin, password);
        if (response && +response.EC === 0) {
            dispatch(UserLoginSuccess(response));

            let res = await getCartByUserId(response.DT.id);
            dispatch(getCartId(res));

            let data = await getProductsByCartId(res.DT.id);
            dispatch(getListProductsSuccess(data.DT[0].Products));

            let userInfor = await getUserInforDefault(response.DT.id);
            dispatch(GetUserInforSuccess(userInfor));

            localStorage.setItem('isLogged', true);

            if (response.DT.role === 'User') {
                navigate('/');
            } else {
                navigate('/admin');
            }
        }

        if (response && +response.EC !== 0) {
            // error
            toast.error(response.EM);
        }
    };

    const handlePressEnter = (event) => {
        if (event.charCode === 13 && event.code === 'Enter') {
            handleLogin();
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('row', 'px-3', 'px-sm-0')}>
                    <div className={cx('content-left', 'col-sm-8', 'd-sm-block', 'd-none')}>
                        <div className={cx('brand', 'text-center')}>Tiki-Shop</div>
                        <div className={cx('detail', 'text-center')}>
                            Build your own database and clone the Tiki project with Fontend ReactJs, ReduxJs And Backend
                            Nodejs, ExpressJs
                        </div>
                    </div>
                    <div className={cx('content-right', 'col-sm-4', 'col-12')}>
                        <div className={cx('brand', 'd-sm-none', 'd-block')}>Tiki-Shop</div>
                        <input
                            type="text"
                            className={cx(objValidInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid')}
                            placeholder="Email address or phone number"
                            value={valueLogin}
                            onChange={(e) => setValueLogin(e.target.value)}
                        />
                        <div className={cx('password-wrapper')}>
                            <input
                                type={showPassword ? 'text' : 'password'}
                                className={cx(
                                    objValidInput.isValidPassword ? 'form-control' : 'form-control is-invalid',
                                )}
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                onKeyPress={handlePressEnter}
                            />
                            <span className={cx('eye-icon')} onClick={() => setShowPassword(!showPassword)}>
                                {showPassword ? <FaEyeSlash /> : <FaEye />}
                            </span>
                        </div>
                        <button className={cx('btn', 'btn-primary')} onClick={handleLogin}>
                            Login
                        </button>
                        <Link to={'/test'} className={cx('forgot-password')}>
                            Forgot your password?
                        </Link>
                        <div className={cx('oauth_wrapper')}>
                            <div className={cx('oauth_separator')}>
                                <div className={cx('line')}></div>
                                <span>or</span>
                                <div className={cx('line')}></div>
                            </div>
                            <div className={cx('oauth_method')} onClick={() => handleLoginWithFacebook()}>
                                <div className={cx('fb_method')}>
                                    <FaFacebook className={cx('icon')} />
                                    <span>Facebook</span>
                                </div>
                                <div className={cx('gg_method')} onClick={() => handleLoginWithGoogle()}>
                                    <FaGooglePlusG className={cx('icon')} />
                                    <span>Google</span>
                                </div>
                            </div>
                        </div>
                        <span className={cx('link_register')}>
                            You don't have an account?
                            <Link to={'/register'} className={cx('btn_register')}>
                                Register
                            </Link>
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
