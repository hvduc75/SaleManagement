import React, {useEffect, useState} from 'react';
import classNames from 'classnames/bind';
import { useSelector } from 'react-redux';

import styles from './Content.module.scss';
import TopDeal from './TopDeal/TopDeal';
import Banners from './Banners/Banners';
import FavoriteProduct from './FavoriteProduct/FavoriteProduct';
import ProductInterest from './ProductInterest/ProductInterest';
import AllProduct from './AllProduct/AllProduct';
import FooterContent from './FooterContent/FooterContent';

const cx = classNames.bind(styles);

function Content() {
    const [isFixed, setIsFixed] = useState(false);
    const [initialPosition, setInitialPosition] = useState(0); // Lưu vị trí ban đầu của header

    useEffect(() => {
        const myDiv = document.getElementById('myDiv');

        if (myDiv) {
            // Lưu vị trí ban đầu của `header`
            setInitialPosition(myDiv.offsetTop);
        }

        const handleScroll = () => {
            if (myDiv) {
                const currentScroll = window.pageYOffset;
                
                // Kiểm tra nếu đã cuộn qua vị trí ban đầu của `header`
                if (currentScroll > initialPosition) {
                    setIsFixed(true);  // Đặt fixed nếu cuộn qua vị trí header
                } else {
                    setIsFixed(false); // Trở về trạng thái ban đầu nếu cuộn về vị trí ban đầu
                }
            }
        };

        window.addEventListener('scroll', handleScroll);

        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, [initialPosition]); // Chạy lại useEffect khi `initialPosition` thay đổi
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    return (
        <div className={cx('wrapper')}>
            <div className={cx('banner')}>
                <Banners />
            </div>
            <div className={cx('top_deal')}>
                <TopDeal />
            </div>
            {isAuthenticated && (
                <div className={cx('favorite_product')}>
                    <ProductInterest />
                </div>
            )}
            <div className={cx('favorite_product')}>
                <FavoriteProduct />
            </div>
            <div  id="myDiv" className={cx('all_product')}>
                <AllProduct isFixed={isFixed}/>
            </div>
            <div className={cx('footer_content')}>
                <FooterContent/>
            </div>
        </div>
    );
}

export default Content;
