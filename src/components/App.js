import React from "react";
import "../styles/App.css";
import ReactDOM from "react-dom/client";
import { Routes, Route, Link } from "react-router-dom";
import { routes } from "../helpers/routes";
import Catelog from "../pages/Catalog";
import Products from "../pages/Products";
import ProductDetails from "../pages/ProductDetails";
import Cart from "../pages/Cart";
import Login from "../pages/Auth/Login";
import Register from "../pages/Auth/Register";
import Layout from "../helpers/Layout";

const App = () => {
  return (
    <div id="main">
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
    </div>
  );
};

export default App;
