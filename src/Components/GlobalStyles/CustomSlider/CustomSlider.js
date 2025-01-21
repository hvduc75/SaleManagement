import React from 'react';
import classNames from 'classnames/bind';
import styles from './CustomArrows.module.scss';

const cx = classNames.bind(styles);

const PrevArrow = (props) => {
    const { style, onClick } = props;
    return (
        <div className={cx('arrow', 'prev-arrow')} style={{ ...style }} onClick={onClick}>
            <span className={cx('icon')}>&#10095;</span>
        </div>
    );
};

const NextArrow = (props) => {
    const { style, onClick } = props;
    return (
        <div className={cx('arrow', 'next-arrow')} style={{ ...style }} onClick={onClick}>
            <span className={cx('icon')}>&#10094;</span>
        </div>
    );
};

const PrevArrowImage = (props) => {
    const { style, onClick } = props;
    return (
        <div className={cx('arrow', 'prev-arrow-image')} style={{ ...style }} onClick={onClick}>
            <span className={cx('icon')}>&#10095;</span>
        </div>
    );
};

const NextArrowImage = (props) => {
    const { style, onClick } = props;
    return (
        <div className={cx('arrow', 'next-arrow-image')} style={{ ...style }} onClick={onClick}>
            <span className={cx('icon')}>&#10094;</span>
        </div>
    );
};

export { PrevArrow, NextArrow, NextArrowImage, PrevArrowImage };
