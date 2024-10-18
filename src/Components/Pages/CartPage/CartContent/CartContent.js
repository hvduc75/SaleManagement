import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';

import styles from './CartContent.module.scss';
import { Link } from 'react-router-dom';
import images from '../../../../assets/images';
import { updateIsChecked, getAllProductByCheckbox } from '../../../../service/cartApiService';

const cx = classNames.bind(styles);

function CartContent(props) {
    const [test, setTest] = useState(false);
    const {
        listProducts,
        quantities,
        setSelectedItems,
        selectedItems,
        formatPrice,
        cartId,
        listProductChecked,
        setListProductChecked,
    } = props;
    console.log(listProductChecked);

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

    const handleCheckboxChange = async (itemId) => {
        setSelectedItems((prev) => {
            const newSelected = { ...prev, [itemId]: !prev[itemId] };

            // Sau khi cập nhật selectedItems, lấy giá trị mới nhất để cập nhật trạng thái checkbox
            const newStatus = newSelected[itemId];

            // Gọi API cập nhật trạng thái
            updateIsChecked(cartId, itemId, newStatus)
                .then(async () => {
                    let data = await getAllProductByCheckbox(cartId);
                    if (data && data.EC === 0) {
                        setListProductChecked(data.DT[0].Products);
                    }
                })
                .catch((error) => {
                    console.error('Lỗi khi gọi API update trạng thái:', error);
                });

            // Trả về trạng thái mới cho selectedItems
            return newSelected;
        });
    };

    const handleDeleteProduct = () => {
        alert('xoa san pham di nhung ma chua lam');
    };

    // const handleSelectAllCheckbox = () => {
    //     const allSelected = listProductChecked.every((item) => selectedItems[item.id]);

    //     const newSelectedItems = {};
    //     if (!allSelected) {
    //         listProductChecked.forEach((item) => {
    //             newSelectedItems[item.id] = true;
    //         });
    //     }
    //     setSelectedItems(newSelectedItems);
    // };

    const handleSelectAllCheckbox = async () => {
        const allSelected = listProductChecked.every((item) => selectedItems[item.id]);

        const newSelectedItems = {};
        const promises = [];

        if (!allSelected) {
            // Chọn tất cả sản phẩm
            listProductChecked.forEach((item) => {
                newSelectedItems[item.id] = true;

                // Gọi API để cập nhật trạng thái là đã chọn
                const promise = updateIsChecked(cartId, item.id, true);
                promises.push(promise);
            });
        } else {
            // Bỏ chọn tất cả sản phẩm
            listProductChecked.forEach((item) => {
                newSelectedItems[item.id] = false;

                // Gọi API để cập nhật trạng thái là chưa chọn
                const promise = updateIsChecked(cartId, item.id, false);
                promises.push(promise);
            });
        }

        // Chờ tất cả các API hoàn tất
        await Promise.all(promises);

        // Cập nhật trạng thái selectedItems sau khi API đã được gọi
        setSelectedItems(newSelectedItems);

        // Gọi API để lấy lại danh sách sản phẩm đã chọn
        let data = await getAllProductByCheckbox(cartId);
        if (data && data.EC === 0) {
            setListProductChecked(data.DT[0].Products);
        }
    };

    useEffect(() => {
        testlll();
    }, []);

    const testlll = () => {
        const allSelected =
            listProductChecked.length > 0 && listProductChecked.every((item) => selectedItems[item.id] === true);
        setTest(allSelected);
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('cart_header')}>
                <label htmlFor="check" className={cx('label_styles')}>
                    <input type="checkbox" name="check" id="check" checked={test} onChange={handleSelectAllCheckbox} />
                    <span className={cx('label')}>Tất cả ({listProductChecked.length} sản phẩm)</span>
                </label>
                <span>Đơn giá</span>
                <span>Số lượng</span>
                <span>Thành tiền</span>
                <img style={{ cursor: 'pointer' }} src={images.cp_trash} alt="deleted" />
            </div>
            <div className={cx('cart_content')}>
                {listProductChecked.map((item) => (
                    <div className={cx('cart_item')} key={`item-${item.id}`}>
                        <div className={cx('item_infor')}>
                            <input
                                type="checkbox"
                                checked={item.Product_Cart.isChecked}
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
                                <span onClick={() => props.handleDecreaseProduct(item)} className={cx('qty_decrease')}>
                                    <img src={images.pd_icon_remove} alt="icon_remove" />
                                </span>
                                <input type="text" value={quantities[item.id]} readOnly />
                                <span onClick={() => props.handleIncreaseProduct(item)} className={cx('qty_increase')}>
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
