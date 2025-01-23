import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import classNames from 'classnames/bind';
import { toast } from 'react-toastify';

import styles from './ProductDetail.module.scss';
import { getProductById, getFeedbacksByProductId } from '../../../service/productApiService';
import AddToCart from './AddToCart/AddToCart';
import ProductImageSlider from '../../User/Content/SimpleSlider/ProductImageSilder/ProductImageSlider';
import ProductContent from './ProductContent/ProductContent';
import { IoStar } from 'react-icons/io5';
import { IoIosStarHalf } from 'react-icons/io';

const cx = classNames.bind(styles);

function ProductDetail() {
    const { productId } = useParams();
    const [product, setProduct] = useState([]);
    const [currentImage, setCurrentImage] = useState(null);
    const [activeTab, setActiveTab] = useState('All');
    const [listFeedback, setListFeedback] = useState([]);
    const [currentPage, setCurrentPage] = useState(1);
    const [hasMore, setHasMore] = useState(true);

    const LIMIT = 7;

    useEffect(() => {
        fetchListFeedbacksByProductId(currentPage, activeTab === 'All' ? null : parseInt(activeTab[0]));
    }, [activeTab, currentPage]);

    useEffect(() => {
        fetchProductById();
    }, []);

    const fetchListFeedbacksByProductId = async (page, star) => {
        let response = await getFeedbacksByProductId(productId, page, star, LIMIT);
        if (response && response.EC === 0) {
            if (page === 1) {
                setListFeedback(response.DT);
            } else {
                setListFeedback((prev) => [...prev, ...response.DT]);
            }
            setHasMore(response.DT.length > 0);
        } else {
            toast.error(response.EM);
        }
    };

    const handleLoadMore = () => {
        if (hasMore) {
            setCurrentPage((prev) => prev + 1);
        }
    };

    const fetchProductById = async () => {
        let data = await getProductById(productId);
        if (data && data.EC === 0) {
            setProduct(data.DT);
            const mainImage = getImageSrc(data.DT.image);
            setCurrentImage(mainImage);
        } else {
            toast.error(data.EM);
        }
    };

    const formatPrice = (price) => {
        if (typeof price !== 'number') {
            return '0';
        }
        return price.toLocaleString('vi-VN');
    };

    const getImageSrc = (image) => {
        if (image && image.data) {
            const byteArray = new Uint8Array(image.data);
            let binary = '';
            byteArray.forEach((byte) => {
                binary += String.fromCharCode(byte);
            });
            return `data:image/jpeg;base64,${window.btoa(binary)}`;
        }
        return null;
    };

    const handleSelectImage = (imageSrc) => {
        setCurrentImage(imageSrc);
    };

    const formatDateTime = (isoDate) => {
        if (!isoDate) return 'Chưa có thông tin';
        const date = new Date(isoDate);
        return date.toLocaleString('vi-VN', {
            timeZone: 'Asia/Ho_Chi_Minh',
            day: '2-digit',
            month: '2-digit',
            year: 'numeric',
            hour: '2-digit',
            minute: '2-digit',
            hour12: false,
        });
    };

    const handleClickStar = (currentTab) => {
        setActiveTab(currentTab);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('product_wrapper')}>
                <div className={cx('product_container')}>
                    <div className={cx('product_image')}>
                        <div className={cx('image_frame')}>
                            <img src={currentImage} alt="ProductImage" />
                        </div>
                        <div className={cx('ThumbnailList')}>
                            <div className={cx('content')}>
                                {product && product.ProductImages && (
                                    <ProductImageSlider
                                        listProductImages={product.ProductImages}
                                        mainImage={product.image}
                                        onSelectImage={handleSelectImage}
                                    />
                                )}
                            </div>
                        </div>
                    </div>
                    <ProductContent product={product} formatPrice={formatPrice} />
                </div>
                <div className={cx('customer_feedback')}>
                    <div className={cx('product_rating_header')}>ĐÁNH GIÁ SẢN PHẨM</div>
                    <div className={cx('product_rating_overview')}>
                        <div className={cx('briefing')}>
                            <div className={cx('overview_wrapper')}>
                                <span>{product.star ? product.star.toFixed(1) : '5.0'}</span> trên 5
                            </div>
                            <div className={cx('stars')}>
                                {Array.from({ length: 5 }).map((_, index) => {
                                    const starValue = index + 1;
                                    if (starValue <= Math.floor(product?.star || 5)) {
                                        return <IoStar className={cx('star')} key={index} fill="rgb(238, 77, 45)" />;
                                    } else if (starValue - 0.5 <= product?.star) {
                                        return <IoIosStarHalf className={cx('star')} key={index} fill="rgb(238, 77, 45)" />;
                                    } else {
                                        return <IoStar className={cx('star')} key={index} fill="#e4e5e9" />;
                                    }
                                })}
                            </div>
                        </div>
                        <div className={cx('filters')}>
                            <div
                                className={cx('filter', { active: activeTab === 'All' })}
                                onClick={() => handleClickStar('All')}
                            >
                                Tất cả
                            </div>
                            <div
                                className={cx('filter', { active: activeTab === '5Star' })}
                                onClick={() => handleClickStar('5Star')}
                            >
                                5 Sao
                            </div>
                            <div
                                className={cx('filter', { active: activeTab === '4Star' })}
                                onClick={() => handleClickStar('4Star')}
                            >
                                4 Sao
                            </div>
                            <div
                                className={cx('filter', { active: activeTab === '3Star' })}
                                onClick={() => handleClickStar('3Star')}
                            >
                                3 Sao
                            </div>
                            <div
                                className={cx('filter', { active: activeTab === '2Star' })}
                                onClick={() => handleClickStar('2Star')}
                            >
                                2 Sao
                            </div>
                            <div
                                className={cx('filter', { active: activeTab === '1Star' })}
                                onClick={() => handleClickStar('1Star')}
                            >
                                1 Sao
                            </div>
                        </div>
                    </div>
                    <div className={cx('product_rating_list')}>
                        {listFeedback?.Orders?.map((feedback, index) => (
                            <div className={cx('product_rating')} key={index}>
                                <div className={cx('customer_avatar')}>
                                    <img
                                        src={
                                            getImageSrc(feedback.User.avatar) ||
                                            'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSxw0eitGgbS6Y3kJODK5lGbWxUV8sONkQUZg&s'
                                        }
                                        alt="customer_avatar"
                                    />
                                </div>
                                <div className={cx('rating_main')}>
                                    <div className={cx('customer_name')}>{feedback?.User?.username}</div>
                                    <div className={cx('stars')}>
                                        <div style={{ display: 'flex', alignItems: 'center' }}>
                                            {Array.from({ length: 5 }).map((_, index) => {
                                                const starValue = index + 1;
                                                if (starValue <= Math.floor(feedback?.Order_Product?.star || 5)) {
                                                    return <IoStar key={index} fill="rgb(255, 196, 0)" />;
                                                } else if (starValue - 0.5 <= feedback?.Order_Product?.star) {
                                                    return <IoIosStarHalf key={index} fill="rgb(255, 196, 0)" />;
                                                } else {
                                                    return <IoStar key={index} fill="#e4e5e9" />;
                                                }
                                            })}
                                        </div>
                                    </div>
                                    <div className={cx('rating_time')}>
                                        {formatDateTime(feedback?.Order_Product?.feedbackDate)}
                                    </div>
                                    <div className={cx('rating_description')}>
                                        {feedback?.Order_Product?.description}
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                    {hasMore && (
                        <button className={cx('load_more')} onClick={handleLoadMore}>
                            Xem thêm
                        </button>
                    )}
                </div>
            </div>
            <div style={{ position: 'sticky', top: '12px' }}>
                <AddToCart product={product} formatPrice={formatPrice} />
            </div>
        </div>
    );
}

export default ProductDetail;
