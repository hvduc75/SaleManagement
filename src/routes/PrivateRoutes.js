import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = ({ children, loading }) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const role = useSelector((state) => state.user.account.role);
    if (loading) {
        return <div>Loading...</div>; 
    }

    if (!isAuthenticated) {
        return <Navigate to="/login"></Navigate>;
    }
    if (isAuthenticated && role === 'Admin') {
        return <>{children}</>;
    }
};

export default PrivateRoute;
