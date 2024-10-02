import { Routes, Route } from 'react-router-dom';
import Homepage from './Components/Home/Homepage';
import Admin from './Components/Admin/Admin';
import ManageUser from './Components/Admin/Content/ManageUser/ManageUser';

const NotFound = () => {
    return <div className="container fs-4 mt-3 alert alert-danger">404.Not found data with current URL</div>;
};

function App() {
    return (
        <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="*" element={<NotFound />} />
            <Route path="/admins" element={<Admin />}>
                <Route path="manage-users" element={<ManageUser/>} />
            </Route>
        </Routes>
    );
}

export default App;
