import React, { useEffect, useState } from 'react';
import Slider from 'react-slick';
import classNames from 'classnames/bind';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrowImage, PrevArrowImage } from '../../../../GlobalStyles/CustomSlider/CustomSlider';
import styles from './ProductImageSlider.module.scss';

const cx = classNames.bind(styles);

const ProductImageSlider = (props) => {
    const { listProductImages, mainImage, onSelectImage } = props;
    const [listImages, setListImages] = useState([]);

    useEffect(() => {
        if (mainImage && listProductImages) {
            setListImages([mainImage, ...listProductImages]);
        }
    }, [mainImage, listProductImages]);

    const settings = {
        dots: false,
        infinite: listProductImages?.length < 6 ? false : true,
        speed: 500,
        slidesToShow: listProductImages?.length < 6 ? listProductImages?.length : 6,
        slidesToScroll: listProductImages?.length < 6 ? listProductImages?.length : 6,
        autoplay: false,
        autoplaySpeed: 3000,
        nextArrow: listProductImages.length > 6 && <NextArrowImage />,
        prevArrow: listProductImages.length > 6 && <PrevArrowImage />,
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

    return (
        <Slider className={cx('customize-image-css')} key={listProductImages.length} {...settings}>
            {listImages &&
                listImages.length > 0 &&
                listImages.map((image, index) => (
                    <span
                        key={index}
                        className={cx('Product_Image')}
                        onClick={() => onSelectImage(getImageSrc(image.image || image))} 
                    >
                        <img src={getImageSrc(image?.image || image)} alt="ProductImage" />
                    </span>
                ))}
        </Slider>
    );
};

export default ProductImageSlider;
