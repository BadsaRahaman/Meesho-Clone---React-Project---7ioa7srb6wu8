import React from "react";
import styles from "./style.module.css";
import NabBar from "../../components/NavBar";
import Products from "../../components/Products";
import { useProducts } from "../../helpers/useProducts";

const Product = () => {
  const productData = useProducts();
  return (
    <div>
      <div className="container">
        {productData ? (
          <Products dataList={productData.products} />
        ) : (
          <p>Loading....</p>
        )}
      </div>
    </div>
  );
};

export default Product;
