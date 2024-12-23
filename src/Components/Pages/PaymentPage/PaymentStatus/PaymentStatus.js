import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom';

const CheckoutStatus = () => {
    const [status, setStatus] = useState(null);
    const location = useLocation();

    useEffect(() => {
        const queryParams = new URLSearchParams(location.search);
        const paymentStatus = queryParams.get('status');

        if (paymentStatus === 'success') {
            setStatus('Payment was successful!');
        } else if (paymentStatus === 'failed') {
            setStatus('Payment failed. Please try again.');
        } else {
            setStatus('Unable to retrieve payment status.');
        }
    }, [location]);

    return (
        <div>
            <h2>{status}</h2>
        </div>
    );
};

export default CheckoutStatus;
