import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile.jsx";
import AdminHeader from "./components/AdminHeader.jsx";
import ProductsAdmin from "./components/ProductsAdmin.jsx";

function App() {
    const renderWithAdminHeader = (Component) => (
        <div className="App">
            <AdminHeader className="App-header sticky-top"/>
            <Component/>
        </div>
    );

    return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profile" element={localStorage.getItem('userData') ? <Profile/> : <Navigate to="/login" />} />
            <Route path="/admin/products" element={renderWithAdminHeader(ProductsAdmin)} />
        </Routes>
    </BrowserRouter>
    )
}

export default App
