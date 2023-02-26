import styles from "./styles.module.css";
import React from "react";
import { useProducts } from "../../helpers/useProducts";

const Cart = () => {
  const productData = useProducts();

  return (
    <div>
      Cart Data
    </div>
  );
};

export default Cart;
