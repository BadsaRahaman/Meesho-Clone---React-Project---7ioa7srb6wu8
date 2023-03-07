import React from "react";
import "../styles/App.css";
import ReactDOM from "react-dom/client";
import { Routes, Route, Link } from "react-router-dom";
import { routes } from "../utils/routes";
import Catelog from "../pages/Catalog";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Layout from "../utils/Layout";
import CustomizedSnackbars, { SnackbarContext } from "../components/SnackBar";

const App = () => {
  const [snackbarData, setSnackbarData] = React.useState({
    severity: "",
    msg: "",
    isOpen: false,
  });

  return (
    <div id="main">
      <SnackbarContext.Provider value={setSnackbarData}>
        <CustomizedSnackbars data={snackbarData} />
        <Layout>
          <Routes>
            <Route path={routes.home.path} element={<Catelog />} />
            <Route path={routes.cart.path} element={<Cart />} />
            <Route path={routes.products.path} element={<Products />} />
            <Route
              path={`${routes.products.path}/:id`}
              element={<ProductDetails />}
            />
            <Route path={routes.login.path} element={<Login />} />
            <Route path={routes.register.path} element={<Register />} />
          </Routes>
        </Layout>
      </SnackbarContext.Provider>
    </div>
  );
};

export default App;
