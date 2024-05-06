import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile.jsx";
import AdminHeader from "./components/AdminHeader.jsx";
import ProductsAdmin from "./components/ProductsAdmin.jsx";
import ProductsAddAdmin from "./components/ProductsAddAdmin.jsx";
import Header from "./components/Header.jsx";
import Payment from "./components/Payment.jsx";
import MainPage from "./components/MainPage.jsx";
import Products from "./components/Products.jsx";
import Cart from "./components/Cart.jsx";
import ProductView from "./components/ProductView.jsx";

function App() {
    const renderWithAdminHeader = (Component) => (
        <div className="App">
            <AdminHeader className="App-header sticky-top"/>
            <Component/>
        </div>
    );

    const renderWithHeader = (Component) => (
        <div className="App">
            <Header className="App-header sticky-top"/>
            <Component/>
        </div>
    );

    return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/products" element={renderWithHeader(Products)}/>
            <Route path="/payment" element={renderWithHeader(Payment)}/>
            <Route path="/view" element={renderWithHeader(ProductView)}/>
            <Route path="/" element={renderWithHeader(MainPage)}/>
            <Route path="/Cart" element={renderWithHeader(Cart)}/>
            <Route path="/profile" element={localStorage.getItem('userData') ? <Profile/>: <Navigate to="/login" />} />
            <Route path="/admin/products" element={renderWithAdminHeader(ProductsAdmin)} />
            <Route path="/admin/products/add" element={renderWithAdminHeader(ProductsAddAdmin)} />
        </Routes>
    </BrowserRouter>
    )
}

export default App
