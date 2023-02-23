import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { useSingleProduct } from "../../helpers/useSingleProduct";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Rating from "@mui/material/Rating";
import { Button, Card, Typography } from "@mui/material";

const ProductDetails = () => {
  const { id } = useParams();

  const product = useSingleProduct(id);

  return (
    <>
      <div className="container detail-page">
        {!product ? (
          <p>Lodaing...</p>
        ) : (
          <div className="product__details_container">
            <div className="product__details_image">
              <Carousel>
                {product.images.map((img, i) => (
                  <div>
                    <img src={img} key={i} loading="lazy" />
                  </div>
                ))}
              </Carousel>
              <Button variant="contained" fullWidth>
                Add to Cart
              </Button>
            </div>
            <div className="product_description">
              <Card variant="outlined" sx={{ p: 3, mb: 2 }}>
                <Typography variant={"h6"}>{product.title}</Typography>
                <p className="product__details_extra">
                  Brand: <span>{product.brand}</span>
                </p>
                <p className="product__details_extra">
                  Category: <span>{product.category}</span>
                </p>
                <p className="product__details_descriptoin">
                  {product.description}
                </p>
                <p className="product__details_price">${product.price}</p>

                <p className="product__details_rating">
                  {product.rating} out of 5
                  <Rating
                    name="half-rating-read"
                    defaultValue={product.rating}
                    precision={0.5}
                    readOnly
                  />
                </p>
              </Card>
              <Card variant="outlined" sx={{ p: 3 }}>
                <Typography varinat={"h6"}>Product Details</Typography>
                <Typography>Fabric : Polycotton</Typography>
                <Typography>Pattern : Solid</Typography>
                <Typography>Pattern : Self Design</Typography>
                <Typography>Multipack : I</Typography>
                <Typography>Sizes :</Typography>
                <Typography>S/WL/XL/XXL</Typography>
                <Typography>
                  Good quality Product made of very fine quality material. This
                  Product
                </Typography>
                <Typography>is long lasting.</Typography>
                <Typography>Country of Origin : India</Typography>
                <Typography>More Information</Typography>
              </Card>
            </div>
          </div>
        )}
      </div>
      ;
    </>
  );
};

export default ProductDetails;
