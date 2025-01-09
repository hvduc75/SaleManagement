import React, { useState } from 'react';
import classNames from 'classnames/bind';
import styles from './ForgotPassword.module.scss';
import { sendOtp, resetPassword } from '../../../service/authService';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const cx = classNames.bind(styles);

function ForgotPassword(props) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [otp, setOtp] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [step, setStep] = useState(1);

    const validateEmail = (email) => {
        return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    };

    const handleSendOtp = async () => {
        try {
            if (!validateEmail(email)) {
                toast.error('Email is not in correct format ');
                return;
            }
            const response = await sendOtp(email);
            if (response && response.EC === 0) {
                toast.success('OTP sent to your email');
                setStep(2);
            } else {
                toast.error(response.EM);
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    const handleResetPassword = async () => {
        try {
            if (password !== confirmPassword) {
                toast.error('Confirm passwords do not match');
                return;
            }
            const response = await resetPassword(email, otp, password);
            if (response && response.EC === 0) {
                toast.success('Reset Password Success');
                navigate('/login');
            } else {
                toast.error(response.EM);
            }
        } catch (error) {
            toast.error('An error occurred');
        }
    };

    return (
        <div className={cx('forgot-password-container')}>
            {step === 1 && (
                <>
                    <div className={cx('form-group')}>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email"
                            required
                        />
                        <button onClick={handleSendOtp}>Gửi mã OTP</button>
                    </div>
                </>
            )}
            {step === 2 && (
                <div className={cx('form-group')}>
                    <input
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="Enter your email"
                        required
                    />
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        placeholder="Enter new password"
                        required
                    />
                    <input
                        type="password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        placeholder="Confirm new password"
                        required
                    />
                    <input
                        type="text"
                        value={otp}
                        onChange={(e) => setOtp(e.target.value)}
                        placeholder="Enter OTP"
                        required
                    />
                    <button onClick={handleResetPassword}>Thay đổi mật khẩu</button>
                </div>
            )}
        </div>
    );
}

export default ForgotPassword;
