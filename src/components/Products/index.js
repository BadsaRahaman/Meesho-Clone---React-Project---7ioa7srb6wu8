import React from "react";
import styles from "./index.module.css";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";
import Rating from "@mui/material/Rating";

const Products = ({ dataList }) => {
  const navigator = useNavigate();
  return (
    <div className={styles.productGrid}>
      {dataList.map((item) => (
        <div
          className="productCard"
          key={item.id}
          onClick={() => navigator(`${routes.products.path}/${item.id}`)}
        >
          <div className="product_image">
            <img src={`${item.thumbnail}`} loading="lazy" />
          </div>
          <h3 className="product_name">{item.title}</h3>
          <p className="product_price">
            <span>${item.price}</span>
            <Rating
              name="half-rating-read"
              defaultValue={item.rating}
              precision={0.5}
              readOnly
            />
          </p>
        </div>
      ))}
    </div>
  );
};

export default Products;
