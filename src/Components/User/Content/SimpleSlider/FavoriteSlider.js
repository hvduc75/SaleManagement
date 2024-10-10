import React from 'react';
import Slider from 'react-slick';
import ProductCard from '../ProductCard/ProductCard';

import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';

const FavoriteSlider = (props) => {
    const { listProducts } = props;

    const settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 6,
        slidesToScroll: 6,
        autoplay: false,
        autoplaySpeed: 3000,
    };

    return (
        <Slider {...settings}>
            {listProducts.DT && listProducts.DT.length > 0 ? (
                listProducts.DT.map((item) => {
                    return <ProductCard key={item.id} product={item} />;
                })
            ) : (
                <div>No products available.</div>
            )}
        </Slider>
    );
};

export default FavoriteSlider;
