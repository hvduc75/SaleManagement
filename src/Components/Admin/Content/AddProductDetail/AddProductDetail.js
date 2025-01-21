import React, { useEffect, useState } from 'react';
import MarkdownIt from 'markdown-it';
import MdEditor from 'react-markdown-editor-lite';
import classNames from 'classnames/bind';
import Select from 'react-select';
import { toast } from 'react-toastify';

import styles from './AddProductDetail.module.scss';
import 'react-markdown-editor-lite/lib/index.css';
import { getAllProducts } from '../../../../service/productApiService';
import { postCreateProductDetail, getProductDetail } from '../../../../service/productDetailApiService';

const mdParser = new MarkdownIt();
const cx = classNames.bind(styles);

function AddProductDetail(props) {
    const [selectedProduct, setSelectedProduct] = useState({});
    const [listProducts, setListProducts] = useState([]);
    const [description, setDescription] = useState('');
    const [contentMarkdown, setContentMarkdown] = useState('');
    const [hasOldData, setHasOldData] = useState(false);
    const [action, setAction] = useState('Create');
    const [images, setImages] = useState([]);

    useEffect(() => {
        fetchListProducts();
    }, []);

    useEffect(() => {
        fetchProductDetailByProductId();
    }, [selectedProduct]);

    const fetchListProducts = async () => {
        let products = await getAllProducts();
        if (products && products.EC === 0) {
            let listProducts = products.DT.map((item) => {
                return {
                    value: item.id,
                    label: `${item.id} - ${item.name}`,
                };
            });
            setListProducts(listProducts);
        }
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

    const convertBufferToFile = (buffer, filename) => {
        const arrayBuffer = buffer instanceof Uint8Array ? buffer : new Uint8Array(buffer);
        const file = new File([arrayBuffer], filename, { type: 'image/jpeg' });
        return file;
    };

    const fetchProductDetailByProductId = async () => {
        let data = await getProductDetail(+selectedProduct.value);
        if (data.EC !== 0) {
            toast.error(data.EM);
        } else {
            if (data.DT?.ProductDetail) {
                setContentMarkdown(data.DT?.ProductDetail?.contentMarkdown);
                setDescription(data.DT?.ProductDetail?.description);
                let buildData = data.DT?.ProductImages?.map((item, index) => {
                    const imageBuffer = item.image.data;
                    const file = convertBufferToFile(imageBuffer, `image-${index}.jpg`);
                    const imageSrc = getImageSrc(item.image);
                    return {
                        url: imageSrc,
                        file,
                    };
                });

                setImages(buildData);
                setHasOldData(true);
                setAction('Edit');
            } else {
                setImages([]);
                setContentMarkdown('');
                setHasOldData(false);
                setAction('Create');
            }
        }
    };

    const handleEditorChange = ({ html, text }) => {
        setDescription(html);
        setContentMarkdown(text);
    };

    const handleImageChange = (event) => {
        const files = Array.from(event.target.files);
        const newImages = files.map((file) => ({
            url: URL.createObjectURL(file),
            file,
        }));
        setImages([...images, ...newImages]);
        // console.log(images)
    };

    const removeImage = (index) => {
        const newImages = [...images];
        newImages.splice(index, 1);
        setImages(newImages);
    };

    const handleProductDetail = async () => {
        console.log(images);
        let data = await postCreateProductDetail(description, contentMarkdown, +selectedProduct.value, action, images);
        await fetchProductDetailByProductId();
        if (data.EC === 0) {
            toast.success(data.EM);
        } else {
            toast.error(data.EM);
        }
    };

    return (
        <div className={cx('wrapper')}>
            <div className={cx('container')}>
                <div className={cx('list_products')}>
                    <Select defaultValue={selectedProduct} onChange={setSelectedProduct} options={listProducts} />
                </div>
                <div className={cx('product_images')}>
                    <input
                        id="product_images"
                        type="file"
                        className={cx('form_control')}
                        multiple
                        onChange={handleImageChange}
                        style={{ display: 'none' }}
                    />
                    <div className={cx('image_preview')}>
                        {images.map((image, index) => (
                            <div key={index} className={cx('image_item')}>
                                <img src={image.url} alt={`preview-${index}`} className={cx('image')} />
                                <button className={cx('btn-remove')} onClick={() => removeImage(index)}>
                                    X
                                </button>
                            </div>
                        ))}
                    </div>
                    <label htmlFor="product_images" className={cx('btn', 'btn-success', 'btn_upload')}>
                        Chọn ảnh
                    </label>
                </div>
            </div>
            <MdEditor
                value={contentMarkdown}
                style={{ height: '500px' }}
                renderHTML={(text) => mdParser.render(text)}
                onChange={handleEditorChange}
            />
            <button
                onClick={() => handleProductDetail()}
                className={hasOldData ? cx('btn-save', 'btn', 'btn-warning') : cx('btn-save', 'btn', 'btn-success')}
            >
                {hasOldData ? 'Save' : 'Add'}
            </button>
        </div>
    );
}

export default AddProductDetail;
