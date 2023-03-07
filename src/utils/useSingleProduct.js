import React, { useState, useEffect } from "react";
import { PRODUT_URL } from "./constants";

export const useSingleProduct = (id) => {
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    const response = await fetch(`${PRODUT_URL}/${id}`);
    const data = await response.json();
    setProduct(data);
  };
  useEffect(() => {
    getProduct();
  }, []);
  return product;
};
