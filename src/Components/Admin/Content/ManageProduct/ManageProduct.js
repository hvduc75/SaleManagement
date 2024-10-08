import React, { useEffect, useState } from 'react';
import classNames from 'classnames/bind';
import { v4 as uuidv4 } from 'uuid';
import { toast } from 'react-toastify';
import _ from 'lodash';
import { FaPlusCircle } from 'react-icons/fa';
import { FaRegTrashAlt } from 'react-icons/fa';
import Select from 'react-select';

import { getAllCategories } from '../../../../service/categoryApiService';
import { postCreateNewProduct, getAllProductsWithCategory } from '../../../../service/productApiService';
import styles from './ManageProduct.module.scss';
import TableProductPaginate from './TableProduct/TableProductPaginate';

const cx = classNames.bind(styles);

function ManageProduct(props) {
    const [listCategories, setListCategories] = useState([]);
    const [listProducts, setListProducts] = useState([]);
    const [selectedCategory, setSelectedCategory] = useState({});

    useEffect(() => {
        fetchListCategories();
        fetListProducts();
    }, []);

    const fetchListCategories = async () => {
        let data = await getAllCategories();
        if (data && data.EC === 0) {
            let categories = data.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`,
                };
            });
            setListCategories(categories);
        }
    };

    const fetListProducts = async (page) => {
        let data = await getAllProductsWithCategory(1, 6, 2);
        if(data && data.EC === 0) {
            setListProducts(data.DT.products)
        }
    }

    const dataChildDefault = {
        name: '',
        price: '',
        sale: '',
        quantity: '',
        background: '',
        image: '',
        isValidName: true,
        isValidPrice: true,
        isValidSale: true,
        isValidQuantity: true,
        isValidBackground: true,
        isValidImage: true,
    };

    const [listChild, setListChild] = useState({
        [`child-${uuidv4()}`]: dataChildDefault,
    });

    const handleOnChangeInput = (event, name, key, type = 'text') => {
        let _listChild = _.cloneDeep(listChild);

        if (type === 'file') {
            // Kiểm tra nếu file được chọn (không được rỗng)
            _listChild[key][name] = event.target.files[0] ? event.target.files[0] : '';
            _listChild[key][`isValid${_.upperFirst(name)}`] = event.target.files[0] ? true : false;
        } else {
            // Đối với các trường hợp input khác, lưu lại giá trị
            _listChild[key][name] = event.target.value;
            _listChild[key][`isValid${_.upperFirst(name)}`] = event.target.value && event.target.value.trim() !== '';
        }

        setListChild(_listChild);
    };

    const handleAddNewForm = () => {
        let _listChild = _.cloneDeep(listChild);
        _listChild[`child-${uuidv4()}`] = dataChildDefault;
        setListChild(_listChild);
    };

    const handleDeleteForm = (key) => {
        let _listChild = _.cloneDeep(listChild);
        delete _listChild[key];
        setListChild(_listChild);
    };

    const buildDataToPersist = () => {
        let result = [];
        Object.entries(listChild).map(([key, child]) => {
            result.push({
                name: child.name,
                price: child.price,
                sale: child.sale,
                quantity: child.quantity,
                background: child.background,
                image: child.image,
            });
        });
        return result;
    };

    const handleSave = async () => {
        let _listChild = _.cloneDeep(listChild);
        let isValid = true;
        let isValidSale = true;

        if (_.isEmpty(selectedCategory)) {
            toast.error('Please choose a Category');
            return;
        }

        // Duyệt qua từng đối tượng trong listChild để kiểm tra tính hợp lệ của các trường
        Object.entries(_listChild).forEach(([key, child]) => {
            // Kiểm tra từng trường và set `isValid` tương ứng nếu bị trống
            if (!child.name) {
                _listChild[key]['isValidName'] = false;
                isValid = false;
            }
            if (!child.price) {
                _listChild[key]['isValidPrice'] = false;
                isValid = false;
            }
            // Kiểm tra trường `sale` nếu có giá trị thì phải trong khoảng từ 0 đến 100
            if (child.sale && (Number(child.sale) < 0 || Number(child.sale) > 100)) {
                _listChild[key]['isValidSale'] = false;
                isValid = false;
                isValidSale = false;
            } else {
                // Nếu không có giá trị (trống) hoặc hợp lệ thì không cần hiển thị lỗi
                _listChild[key]['isValidSale'] = true;
            }
            if (!child.quantity) {
                _listChild[key]['isValidQuantity'] = false;
                isValid = false;
            }
            if (!child.background) {
                _listChild[key]['isValidBackground'] = false;
                isValid = false;
            }
            if (!child.image) {
                _listChild[key]['isValidImage'] = false;
                isValid = false;
            }
        });

        // Cập nhật lại listChild để hiển thị class `is-invalid` nếu có trường không hợp lệ
        setListChild(_listChild);

        if (isValid) {
            let data = buildDataToPersist();
            console.log(selectedCategory)
            let res = await postCreateNewProduct(data, +selectedCategory.value);
            if (res && res.EC === 0) {
                toast.success(res.EM);
                setListChild({ [`child-${uuidv4()}`]: dataChildDefault });
            }
            console.log(data);
        } else {
            if (!isValidSale) {
                toast.error('Discount between 0 and 100');
            } else {
                toast.error('Please fill in all required fields!');
            }
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('title')}>
                <h4>Add New Product For Category</h4>
            </div>
            <div className={cx('content-container')}>
                <div className={cx('select-category')}>
                    <Select defaultValue={selectedCategory} onChange={setSelectedCategory} options={listCategories} />
                </div>
                {Object.entries(listChild).map(([key, child], index) => {
                    return (
                        <div className={cx('frame')} key={`child-${key}`}>
                            <div className={cx('frame-group', 'row')}>
                                <div className={cx('form-group', 'mt-1', 'col-6')}>
                                    <label>Name</label>
                                    <input
                                        type="text"
                                        className={child.isValidName ? 'form-control' : 'form-control is-invalid'}
                                        value={child.name}
                                        onChange={(event) => handleOnChangeInput(event, 'name', key)}
                                    />
                                </div>
                                <div className={cx('form-group', 'mt-1', 'col-6')}>
                                    <label>Price</label>
                                    <input
                                        type="number"
                                        className={child.isValidPrice ? 'form-control' : 'form-control is-invalid'}
                                        value={child.price}
                                        onChange={(event) => handleOnChangeInput(event, 'price', key)}
                                    />
                                </div>
                                <div className={cx('form-group', 'mt-1', 'col-6')}>
                                    <label>Sale</label>
                                    <input
                                        type="number"
                                        className={child.isValidSale ? 'form-control' : 'form-control is-invalid'}
                                        value={child.sale}
                                        onChange={(event) => handleOnChangeInput(event, 'sale', key)}
                                    />
                                </div>
                                <div className={cx('form-group', 'mt-1', 'col-6')}>
                                    <label>Quantity</label>
                                    <input
                                        type="number"
                                        className={child.isValidQuantity ? 'form-control' : 'form-control is-invalid'}
                                        value={child.quantity}
                                        onChange={(event) => handleOnChangeInput(event, 'quantity', key)}
                                    />
                                </div>
                                <div className={cx('form-group', 'mt-1', 'col-6')}>
                                    <label>Background</label>
                                    <input
                                        type="file"
                                        className={child.isValidBackground ? 'form-control' : 'form-control is-invalid'}
                                        onChange={(event) => handleOnChangeInput(event, 'background', key, 'file')}
                                    />
                                </div>
                                <div className={cx('form-group', 'mt-1', 'col-6')}>
                                    <label>Image</label>
                                    <input
                                        type="file"
                                        className={child.isValidImage ? 'form-control' : 'form-control is-invalid'}
                                        onChange={(event) => handleOnChangeInput(event, 'image', key, 'file')}
                                    />
                                </div>
                            </div>
                            <div className={cx('frame-btn')}>
                                <button className={cx('btn-plus')}>
                                    <FaPlusCircle onClick={() => handleAddNewForm()} />
                                </button>
                                {index >= 1 && (
                                    <button className={cx('btn-trash')}>
                                        <FaRegTrashAlt onClick={() => handleDeleteForm(key)} />
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
                <div className={cx('btn', 'btn-warning', 'btn-save')} onClick={() => handleSave()}>
                    Save
                </div>
                <div className={cx('table-product')}>
                    <TableProductPaginate listProducts={listProducts}/>
                </div>
            </div>
        </div>
    );
}

export default ManageProduct;
