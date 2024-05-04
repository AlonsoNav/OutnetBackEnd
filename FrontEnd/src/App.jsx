import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css'
import {BrowserRouter, Navigate, Route, Routes} from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile.jsx";

function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/login" element={<Login/>} />
            <Route path="/register" element={<Register/>} />
            <Route path="/profile" element={localStorage.getItem('userData') ? <Profile/> : <Navigate to="/login" />} />
        </Routes>
    </BrowserRouter>
    )
}

export default App
