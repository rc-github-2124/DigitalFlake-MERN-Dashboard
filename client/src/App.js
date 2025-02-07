import React from "react";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom"; 
import Sidebar from "./components/Navigation/Sidebar";
import Appbar from "./components/Navigation/Appbar";
import Home from "./components/Home/Home";
import Category from "./components/Category/Category";
import Subcategory from "./components/Subcategory/Subcategory";
import Products from "./components/Products/Products";
import Login from "./components/Login/Login";
import 'bootstrap/dist/css/bootstrap.min.css';
import Addcategory from "./components/Category/Addcategory";
import Editcategory from "./components/Category/Editcategory";
import Editsubcategory from "./components/Subcategory/Editsubcategory";
import Addsubcategory from "./components/Subcategory/Addsubcategory";
import AddProduct from "./components/Products/Addproduct";
import EditProduct from "./components/Products/EditProduct";
import { AuthProvider } from './context/Authcontext';
import PrivateRoute from './context/PrivateRoute';
import ForgotPassword from "./components/Login/ForgotPassword";

const App = () => {
    const location = useLocation();
    const isLoginPage = location.pathname === "/";
    return (
        <AuthProvider>
            <div style={styles.appContainer}>
                {!isLoginPage && <Appbar />}

                <div style={styles.mainContainer}>
                    {!isLoginPage && <Sidebar />}
                    <div style={styles.content}>
                        <Routes>
                            <Route path="/" element={<Login />} />
                            <Route path="/home" element={<PrivateRoute element={<Home />} />} />
                            <Route path="/category" element={<PrivateRoute element={<Category />} />} />
                            <Route path="/subcategory" element={<PrivateRoute element={<Subcategory />} />} />
                            <Route path="/products" element={<PrivateRoute element={<Products />} />} />
                            <Route path="/category/addnew" element={<PrivateRoute element={<Addcategory />} />} />
                            <Route path="/category/edit/:id" element={<PrivateRoute element={<Editcategory />} />} />
                            <Route path="/subcategory/edit/:id" element={<PrivateRoute element={<Editsubcategory />} />} />
                            <Route path="/subcategory/addnew" element={<PrivateRoute element={<Addsubcategory />} />} />
                            <Route path="/product/addnew" element={<PrivateRoute element={<AddProduct />} />} />
                            <Route path="/product/edit/:id" element={<PrivateRoute element={<EditProduct />} />} />
                            <Route path="/forgot-password/:token" element={<ForgotPassword/>} />
                        </Routes>
                    </div>
                </div>
            </div>
        </AuthProvider>
    );
};

const styles = {
    appContainer: {
        display: "flex",
        flexDirection: "column",
        height: "100vh",
    },
    mainContainer: {
        display: "flex",
        flex: 1,
    },
    content: {
        flex: 1,
        padding: "20px",
        backgroundColor: "#f9f9f9",
    },
};

export default App;
