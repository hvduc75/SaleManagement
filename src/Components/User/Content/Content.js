import React from 'react';
import classNames from 'classnames/bind';
import styles from './Content.module.scss';
import SimpleSlider from './SimpleSlider/SimpleSlider';

const cx = classNames.bind(styles);

function Content() {
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <SimpleSlider />
            </div>
        </div>
    );
}

export default Content;

