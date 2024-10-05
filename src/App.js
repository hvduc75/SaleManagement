import { Routes, Route } from 'react-router-dom';
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Homepage from './Components/User/Home/Homepage';
import Admin from './Components/Admin/Admin';
import ManageUser from './Components/Admin/Content/ManageUser/ManageUser';
import ManageBanner from './Components/Admin/Content/ManageBanner/ManageBanner';
import Login from './Components/Auth/Login/Login';
import Register from './Components/Auth/Register/Register';

const NotFound = () => {
    return <div className="container fs-4 mt-3 alert alert-danger">404.Not found data with current URL</div>;
};

function App() {
    return (
        <>
            <Routes>
                <Route path="/" element={<Homepage />} />
                <Route path="/admin" element={<Admin />}>
                    <Route path="manage-users" element={<ManageUser />} />
                    <Route path="manage-banners" element={<ManageBanner />} />
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
