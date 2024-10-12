import React from 'react';
import Slider from 'react-slick';
import ProductCard from '../ProductCard/ProductCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { NextArrow, PrevArrow } from '../../../GlobalStyles/CustomSlider/CustomSlider';

const FavoriteSlider = (props) => {
    const { listProducts } = props;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: listProducts.length < 6 ? listProducts.length : 6,
        slidesToScroll: listProducts.length < 6 ? listProducts.length : 6,
        autoplay: false,
        autoplaySpeed: 3000,
        nextArrow: <NextArrow />,
        prevArrow: <PrevArrow />,
    };

    return (
        <Slider {...settings}>
            {listProducts && listProducts.length > 0 ? (
                listProducts.map((product) => {
                    return <ProductCard key={product.id} product={product} />;
                })
            ) : (
                <div>No products available.</div>
            )}
        </Slider>
    );
};

export default FavoriteSlider;
