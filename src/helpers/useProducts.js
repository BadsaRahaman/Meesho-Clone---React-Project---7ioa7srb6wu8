import React, { useState, useEffect } from "react";
import { PRODUT_URL } from "./constants";

export const useProducts = () => {

  const [products, setProducts] = useState(null);
  
  const getProducts = async () => {
    const response = await fetch(PRODUT_URL);
    const data = await response.json();
    setProducts(data);
  };
  useEffect(() => {
    getProducts();
  }, []);
  
  return products;
};
