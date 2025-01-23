import React, { useState, useEffect } from 'react';
import classNames from 'classnames/bind';

import styles from './ModalFeedback.module.scss';
import { feedbackOrder } from '../../../../service/orderApiService';
import { FaStar } from 'react-icons/fa6';

const cx = classNames.bind(styles);

function ModalFeedback({ isOpen, onClose, products, getImageSrc, orderId, activeTab, fetchListOrders }) {
    const [feedbacks, setFeedbacks] = useState({});

    useEffect(() => {
        if (isOpen) {
            const defaultFeedbacks = {};
            products.forEach((product) => {
                defaultFeedbacks[product.id] = {
                    rating: product?.Order_Product?.star ? product?.Order_Product?.star : 5,
                    comment: product?.Order_Product?.description ? product?.Order_Product?.description : '',
                };
            });
            setFeedbacks(defaultFeedbacks);
        }
    }, [isOpen, products]);

    const handleFeedbackChange = (productId, field, value) => {
        setFeedbacks((prev) => ({
            ...prev,
            [productId]: {
                ...prev[productId],
                [field]: value,
            },
        }));
    };

    const handleStarClick = (productId, rating) => {
        handleFeedbackChange(productId, 'rating', rating);
    };

    const handleSubmit = async () => {
        const feedbackData = products.map((product) => ({
            productId: product.id,
            rating: feedbacks[product.id]?.rating || 5,
            comment: feedbacks[product.id]?.comment || '',
        }));

        await feedbackOrder(feedbackData, orderId);
        await fetchListOrders(activeTab)
        onClose();
    };

    if (!isOpen) return null;

    return (
        <div className={cx('modal')}>
            <div className={cx('modal-content')}>
                <div className={cx('modal-header')}>
                    <span>Đánh giá sản phẩm</span>
                </div>
                <div className={cx('modal-body')}>
                    {products.map((product) => (
                        <div key={product.id} className={cx('product-item')}>
                            <div className={cx('product-info')}>
                                <div
                                    className={cx('product-image')}
                                    style={{
                                        backgroundImage: `url(${getImageSrc(product.image)})`,
                                    }}
                                ></div>
                                <div className={cx('product-name')}>{product.name}</div>
                            </div>
                            <div className={cx('choose_star')}>
                                <span>Chất lượng sản phẩm</span>
                                <div style={{ display: 'flex', alignItems: 'center', gap: '5px' }}>
                                    {[1, 2, 3, 4, 5].map((star) => (
                                        <FaStar
                                            key={star}
                                            style={{ fontSize: '30px', cursor: 'pointer' }}
                                            fill={feedbacks[product.id]?.rating >= star ? 'rgb(255, 196, 0)' : '#ddd'}
                                            onClick={() => handleStarClick(product.id, star)}
                                        />
                                    ))}
                                </div>
                            </div>
                            <textarea
                                className={cx('feedback-input')}
                                placeholder="Nhập đánh giá của bạn..."
                                value={feedbacks[product.id]?.comment || ''}
                                onChange={(e) => handleFeedbackChange(product.id, 'comment', e.target.value)}
                            ></textarea>
                        </div>
                    ))}
                </div>
                <div className={cx('modal-footer')}>
                    <button onClick={onClose} className={cx('cancel-button')}>
                        Trở lại
                    </button>
                    <button onClick={handleSubmit} className={cx('submit-button')}>
                        Gửi đánh giá
                    </button>
                </div>
            </div>
        </div>
    );
}

export default ModalFeedback;
