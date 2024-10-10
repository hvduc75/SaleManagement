import React from 'react';
import { useParams } from 'react-router-dom';

function ProductDetail() {
    const { productId } = useParams();
    
    console.log("Product ID:", productId); // Kiểm tra xem productId có giá trị không
    
    return (
        <div>
            {/* Hiển thị productId */}
            <h1>{`Đây là trang chi tiết cho sản phẩm có ID: ${productId}`}</h1>
        </div>
    );
}

export default ProductDetail;
