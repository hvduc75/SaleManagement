import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Admin from './Components/Admin/Admin';
import ManageUser from './Components/Admin/Content/ManageUser/ManageUser';
import ManageBanner from './Components/Admin/Content/ManageBanner/ManageBanner';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';
import ManageCategory from './Components/Admin/Content/ManageCategory/ManageCategory';
import ManageProduct from './Components/Admin/Content/ManageProduct/ManageProduct';
import ProductDetail from './Components/Pages/ProductDetailPage/ProductDetail';
import AddProductDetail from './Components/Admin/Content/AddProductDetail/AddProductDetail';

import DefaultLayout from './Components/User/Layouts/DefaultLayout/DefaultLayout';
import Homepage from './Components/Pages/HomePage/Homepage';
import CartPage from './Components/Pages/CartPage/CartPage';
import SearchPage from './Components/Pages/SearchPage/SearchPage';

import PaymentLayout from './Components/User/Layouts/PaymentLayout/PaymentLayout';
import AddressDeliveryPage from './Components/Pages/AddressDeliveryPage/AddressDeliveryPage';
import PaymentPage from './Components/Pages/PaymentPage/PaymentPage';
import PaymentStatus from './Components/Pages/PaymentPage/PaymentStatus/PaymentStatus';

import OrderHistory from './Components/Pages/OrderHistoryPage/OrderHistory';
import Profile from './Components/Pages/Profile/Profile';
import ProductCategoryPage from './Components/Pages/ProductCategoryPage/ProductCategoryPage';
import AddRole from './Components/Admin/Content/ManageRoles/AddRole/AddRole';
import AssignRole from './Components/Admin/Content/ManageRoles/AssignRole/AssignRole';

const NotFound = () => {
    return <div className="container fs-4 mt-3 alert alert-danger">404.Not found data with current URL</div>;
};

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Homepage />} />
                    <Route path="/product/:productId" element={<ProductDetail />} />
                    <Route path='/cart' element={<CartPage />}/>
                    <Route path="/category/:categoryId" element={<ProductCategoryPage/>}/>
                    <Route path="/search" element={<SearchPage/>}/>
                    <Route path='/order/history' element={<OrderHistory />}>
                        {/* <Route path='customer/account' element={<Profile/>}/> */}
                    </Route>
                </Route>
                <Route path="/checkout" element={<PaymentLayout />}>
                    {/* <Route index element={<Homepage />} /> */}
                    <Route path="shipping" element={<AddressDeliveryPage />} />
                    <Route path="payment" element={<PaymentPage />} />
                    <Route path="status" element={<PaymentStatus />} />
                </Route>
                <Route path="/admin" element={<Admin />}>
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-banners" element={<ManageBanner />} />
                    <Route path="manage-categories" element={<ManageCategory />} />
                    <Route path="manage-products" element={<ManageProduct />} />
                    <Route path="manage-product-detail" element={<AddProductDetail />} />
                    <Route path='add-roles' element={<AddRole/>}/>
                    <Route path='assign-roles' element={<AssignRole/>}/>
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="*" element={<NotFound />} />
            </Routes>
            <ToastContainer
                position="top-right"
                autoClose={3000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </>
    );
}

export default App;
