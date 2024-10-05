import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';

const PrivateRoute = (props) => {
    const isAuthenticated = useSelector((state) => state.user.isAuthenticated);
    const role = useSelector((state) => state.user.role);

    if (!isAuthenticated) {
        return <Navigate to="/login"></Navigate>;
    }
    if (isAuthenticated && role === 'user') {
        return <>{props.children}</>;
    }
    if (isAuthenticated && role === 'admin') {
        return <>{props.children}</>;
    }
};

export default PrivateRoute;
