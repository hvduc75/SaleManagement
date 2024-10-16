import React from 'react';
import classNames from 'classnames/bind';

import styles from './CartContent.module.scss';
import { Link } from 'react-router-dom';
import images from '../../../../assets/images';

const cx = classNames.bind(styles);

function CartContent(props) {
    const { listProducts, quantities, setSelectedItems, selectedItems, formatPrice } = props;

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

    const handleCheckboxChange = (itemId) => {
        setSelectedItems((prev) => {
            const newSelected = { ...prev, [itemId]: !prev[itemId] };
            return newSelected;
        });
    };

    const handleDeleteProduct = () => {
        alert('xoa san pham di nhung ma chua lam');
    };

    const handleSelectAllCheckbox = () => {
        const allSelected = listProducts.every((item) => selectedItems[item.id]);
        
        const newSelectedItems = {};
        if (!allSelected) {
            listProducts.forEach((item) => {
                newSelectedItems[item.id] = true;
            });
        }
        setSelectedItems(newSelectedItems);
    };
    
    const allSelected = listProducts.length > 0 && listProducts.every((item) => selectedItems[item.id]);
    
    return (
        <div className={cx('wrapper')}>
            <div className={cx('cart_header')}>
                <label htmlFor="check" className={cx('label_styles')}>
                    <input
                        type="checkbox"
                        name="check"
                        id="check"
                        checked={allSelected}
                        onChange={handleSelectAllCheckbox}
                    />
                    <span className={cx('label')}>Tất cả ({listProducts.length} sản phẩm)</span>
                </label>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <img style={{ cursor: 'pointer' }} src={images.cp_trash} alt="deleted" />
            </div>
            <div className={cx('cart_content')}>
                {listProducts.map((item) => (
                    <div className={cx('cart_item')} key={`item-${item.id}`}>
                        <div className={cx('item_infor')}>
                            <input
                                type="checkbox"
                                checked={selectedItems[item.id]}
                                onChange={() => handleCheckboxChange(item.id)}
                            />
                            <Link>
                                <img src={getImageSrc(item.image)} alt="product_image" />
                            </Link>
                            <div className={cx('item_name')}>{item.name}</div>
                        </div>
                        <div className={cx('item_price')}>
                            {item.price_current && (
                                <div className={cx('price_current')}>
                                    {formatPrice(+item.price_current)}
                                    <sup>đ</sup>
                                </div>
                            )}
                            <div className={item.price_current ? cx('price_original') : cx('price_style')}>
                                {formatPrice(+item.price)}
                                <sup>đ</sup>
                            </div>
                        </div>
                        <div className={cx('item_quantity')}>
                            <div className={cx('styles_quantity')}>
                                <span
                                    onClick={() => props.handleDecreaseProduct(item)}
                                    className={cx('qty_decrease')}
                                >
                                    <img src={images.pd_icon_remove} alt="icon_remove" />
                                </span>
                                <input type="text" value={quantities[item.id]} readOnly />
                                <span
                                    onClick={() => props.handleIncreaseProduct(item)}
                                    className={cx('qty_increase')}
                                >
                                    <img src={images.pd_icon_add} alt="icon_add" />
                                </span>
                            </div>
                        </div>
                        <div className={cx('total_price')}>
                            {formatPrice(
                                (item.price_current ? +item.price_current : +item.price) * quantities[item.id],
                            )}
                            <sup>đ</sup>
                        </div>
                        <div onClick={() => handleDeleteProduct()} className={cx('item_action')}>
                            <img src={images.cp_trash} alt="deleted" />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
    
export default CartContent;
