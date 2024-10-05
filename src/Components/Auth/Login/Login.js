import { Link, useNavigate } from 'react-router-dom';
import { useState} from 'react';
import { toast } from 'react-toastify';
import { useDispatch } from 'react-redux';
import { UserLoginSuccess } from '../../../redux/action/userAction';
import classNames from 'classnames/bind';
import styles from './Login.module.scss';
import { loginUser } from '../../../service/authService';

const cx = classNames.bind(styles);

function Login(props) {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const [valueLogin, setValueLogin] = useState('');
    const [password, setPassword] = useState('');

    const defaultObjValidInput = {
        isValidValueLogin: true,
        isValidPassword: true,
    };
    const [objValidInput, setObjValidInput] = useState(defaultObjValidInput);

    const handleCreateNewAccount = () => {
        navigate('/register');
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
            let data = response;
            dispatch(UserLoginSuccess(data));
            if(response.DT.role === "User") {
                navigate('/');
            }else {
                navigate('/admin')
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

    //   useEffect(() => {
    //     if (user && user.isAuthenticated) {
    //       navigate("/");
    //     }
    //   }, [user, navigate]);

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('row', 'px-3', 'px-sm-0')}>
                    <div className={cx('content-left', 'col-sm-7', 'd-sm-block', 'd-none')}>
                        <div className={cx('brand', 'text-center')}>HVD75</div>
                        <div className={cx('detail', 'text-center')}>
                            Build your own database and clone the Tiki project with Fontend ReactJs, ReduxJs And Backend
                            Nodejs, ExpressJs
                        </div>
                    </div>
                    <div
                        className={cx(
                            'content-right',
                            'col-sm-5',
                            'col-12',
                            'd-flex',
                            'flex-column',
                            'gap-3',
                            'py-3',
                            'px-3',
                        )}
                    >
                        <div className={cx('brand', 'd-sm-none', 'd-block')}>HVD75</div>
                        <input
                            type="text"
                            className={cx(objValidInput.isValidValueLogin ? 'form-control' : 'form-control is-invalid')}
                            placeholder="Email address or phone number"
                            value={valueLogin}
                            onChange={(e) => setValueLogin(e.target.value)}
                        />
                        <input
                            type="password"
                            className={cx(objValidInput.isValidPassword ? 'form-control' : 'form-control is-invalid')}
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            onKeyPress={handlePressEnter}
                        />
                        <button className={cx('btn', 'btn-primary')} onClick={handleLogin}>
                            Login
                        </button>
                        <span className={cx('text-center')}>
                            <Link to={'/test'} className={cx('forgot-password')}>
                                Forgot your password?
                            </Link>
                        </span>
                        <hr />
                        <div className={cx('text-center')}>
                            <button className={cx('btn', 'btn-success')} onClick={handleCreateNewAccount}>
                                Create new account
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Login;
