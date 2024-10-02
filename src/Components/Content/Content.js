import React from 'react';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import images from '../../assets/images';

const cx = classNames.bind(styles);

function Content(props) {
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <SimpleSlider />
            </div>
        </div>
    );
}

export default Content;

const SimpleSlider = () => {
    const settings = {
        dots: true,
        infinite: true,
        speed: 500,
        slidesToShow: 2,
        slidesToScroll: 1,
        autoplay: true,
        autoplaySpeed: 3000,
    };
    return (
        <Slider {...settings}>
            <div className={cx('slider')}>
                <img className={cx('slider-image')} src={images.iphone16} />
            </div>
            <div className={cx('slider')}>
                <img className={cx('slider-image')} src={images.lamdep} />
            </div>
            <div className={cx('slider')}>
                <img className={cx('slider-image')} src={images.laptop} />
            </div>
        </Slider>
    );
};
