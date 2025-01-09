import { Routes, Route, useNavigate, useLocation } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { ToastContainer } from 'react-toastify';
import { getAccount } from './service/authService';
import { UserLoginSuccess, GetUserInforSuccess } from './redux/action/userAction';
import { getCartId, getListProductsSuccess } from './redux/action/cartAction';
import { getCartByUserId, getProductsByCartId } from './service/cartApiService';
import { getUserInforDefault } from './service/userInforApiService';
import 'react-toastify/dist/ReactToastify.css';
import 'react-datepicker/dist/react-datepicker.css';

import Admin from './Components/Admin/Admin';
import ManageUser from './Components/Admin/Content/ManageUser/ManageUser';
import ManageBanner from './Components/Admin/Content/ManageBanner/ManageBanner';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';
import ForgotPassword from './Components/Pages/ForgotPassword/ForgotPassword';
import ManageCategory from './Components/Admin/Content/ManageCategory/ManageCategory';
import ManageProduct from './Components/Admin/Content/ManageProduct/ManageProduct';
import ProductDetail from './Components/Pages/ProductDetailPage/ProductDetail';
import AddProductDetail from './Components/Admin/Content/AddProductDetail/AddProductDetail';

import DefaultLayout from './Components/User/Layouts/DefaultLayout/DefaultLayout';
import AccountLayout from './Components/User/Layouts/AccountLayout/AccountLayout';
import Homepage from './Components/Pages/HomePage/Homepage';
import CartPage from './Components/Pages/CartPage/CartPage';
import SearchPage from './Components/Pages/SearchPage/SearchPage';

import PaymentLayout from './Components/User/Layouts/PaymentLayout/PaymentLayout';
import AddressDeliveryPage from './Components/Pages/AddressDeliveryPage/AddressDeliveryPage';
import PaymentPage from './Components/Pages/PaymentPage/PaymentPage';
import PaymentStatus from './Components/Pages/PaymentPage/PaymentStatus/PaymentStatus';

import OrderHistory from './Components/Pages/OrderHistoryPage/OrderHistory';
import CodePage from './Components/Pages/CodePage/CodePage';
import OrderDetail from './Components/Pages/OrderDetailPage/OrderDetailPage';
import AddressBook from './Components/Pages/AddressBook/AddressBook';
import UpdateAddress from './Components/Pages/AddressBook/UpdateAddress/UpdateAddress';
import CreateAddress from './Components/Pages/AddressBook/CreateAddress/CreateAddress';
import OrderDetailAdmin from './Components/Admin/Content/ManageOrder/OrderDetail/OrderDetail';
import Profile from './Components/Pages/Profile/Profile';
import ProductCategoryPage from './Components/Pages/ProductCategoryPage/ProductCategoryPage';
import AddRole from './Components/Admin/Content/ManageRoles/AddRole/AddRole';
import AssignRole from './Components/Admin/Content/ManageRoles/AssignRole/AssignRole';
import ManageOrder from './Components/Admin/Content/ManageOrder/ManageOrder';
import PrivateRoute from './routes/PrivateRoutes';
import DashBoard from './Components/Admin/Content/DashBoard/DashBoard';

const NotFound = () => {
    return <div className="container fs-4 mt-3 alert alert-danger">404. Not found data with current URL</div>;
};

function App() {
    const location = useLocation();
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const user = useSelector((state) => state.user.account);
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const [loading, setLoading] = useState(true);
    const [check, setCheck] = useState(true);

    useEffect(() => {
        if (
            location.pathname !== '/login' &&
            location.pathname !== '/register' &&
            !location.pathname.startsWith('/code')
        ) {
            if (user && !user.access_token) {
                fetchAccount();
            }
        }
    }, [location.pathname]);

    const fetchAccount = async () => {
        try {
            const response = await getAccount();
            if (response && +response.EC === 0) {
                dispatch(UserLoginSuccess(response));

                let res = await getCartByUserId(response.DT.id);
                dispatch(getCartId(res));

                let data = await getProductsByCartId(res.DT.id);
                dispatch(getListProductsSuccess(data.DT[0].Products));

                let userInfor = await getUserInforDefault(response.DT.id);
                dispatch(GetUserInforSuccess(userInfor));
            }
        } catch (error) {
            console.error('Failed to fetch user:', error);
        } finally {
            setLoading(false);
        }
    };

    // useEffect(() => {
    //     if (role) {
    //         setLoading(false);
    //         if (role === 'Admin' && check) {
    //             navigate('/admin');
    //         } else if (role === 'User') {
    //             navigate('/');
    //         }
    //         setCheck(false);
    //     }
    // }, [role, check, navigate]);

    // if (loading) {
    //     return <div className="loading">Loading...</div>;
    // }

    return (
        <>
            <Routes>
                <Route path="/" element={<DefaultLayout />}>
                    <Route index element={<Homepage />} />
                    <Route path="/product/:productId" element={<ProductDetail />} />
                    <Route path="/cart" element={<CartPage />} />
                    <Route path="/category/:categoryId" element={<ProductCategoryPage />} />
                    <Route path="/search" element={<SearchPage />} />
                </Route>
                <Route path="/" element={<AccountLayout />}>
                    <Route index element={<Profile />} />
                    <Route path="order/history" element={<OrderHistory />} />
                    <Route path="account/info" element={<Profile />} />
                    <Route path="/order/view/:orderId" element={<OrderDetail />} />
                    <Route path="/customer/address" element={<AddressBook />} />
                    <Route path="/customer/address/create" element={<CreateAddress />} />
                    <Route path="/customer/address/edit/:userInfoId" element={<UpdateAddress />} />
                    {/* <Route path="/order/history" element={<OrderHistory />} /> */}
                </Route>
                <Route path="/checkout" element={<PaymentLayout />}>
                    <Route path="shipping" element={<AddressDeliveryPage />} />
                    <Route path="payment" element={<PaymentPage />} />
                    <Route path="status" element={<PaymentStatus />} />
                </Route>
                <Route
                    path="/admin"
                    element={
                        <PrivateRoute loading={loading}>
                            <Admin />
                        </PrivateRoute>
                    }
                >
                    <Route index element={<DashBoard />} />
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-banners" element={<ManageBanner />} />
                    <Route path="manage-categories" element={<ManageCategory />} />
                    <Route path="manage-products" element={<ManageProduct />} />
                    <Route path="manage-orders" element={<ManageOrder />} />
                    <Route path="manage-product-detail" element={<AddProductDetail />} />
                    <Route path="add-roles" element={<AddRole />} />
                    <Route path="assign-roles" element={<AssignRole />} />
                    <Route path="order/view/:orderId" element={<OrderDetailAdmin />} />
                </Route>
                <Route path="/login" element={<Login />} />
                <Route path="/register" element={<Register />} />
                <Route path="/forgot-password" element={<ForgotPassword />} />
                <Route path="/code/:userId/:tokenLogin" element={<CodePage setLoading={setLoading} />} />
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
