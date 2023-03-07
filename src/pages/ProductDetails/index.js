import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useSingleProduct } from "../../utils/useSingleProduct";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Carousel } from "react-responsive-carousel";
import Rating from "@mui/material/Rating";
import { Button, Card, Typography } from "@mui/material";
import { routes } from "../../utils/routes";
import { useData } from "../../utils/Store";
import { addToCart } from "../../utils/localStorage";
import { SnackbarContext, severity } from "../../components/SnackBar";
import { Alert } from "@mui/material";

const ProductDetails = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isProductInCart, setIsProductInCart] = useState(false);
  const { id } = useParams();
  const snackBarContext = React.useContext(SnackbarContext);
  const navigate = useNavigate();

  const {
    state: { user, cart },
    dispatch,
  } = useData();

  useEffect(() => {
    if (user) {
      setIsProductInCart(isItemOnCart());
    }
  }, [cart]);

  const product = useSingleProduct(id);

  const addItemToTheCart = () => {
    setIsLoading(true);
    if (!user) {
      navigate(routes.register.path, { replace: true });
      return;
    }
    const success = addToCart(user.id, product);

    if (success) {
      snackBarContext({
        severity: severity.success,
        msg: "Item added to the cart!!",
        isOpen: true,
      });
      const filteredList = [...cart, product];
      dispatch({ type: "SET_CART", payload: filteredList });
      setIsProductInCart(true);
    } else {
      snackBarContext({
        severity: severity.error,
        msg: "Failed to add item into the cart",
        isOpen: true,
      });
    }
    setIsLoading(false);
  };

  const isItemOnCart = () => {
    if (!cart) {
      return false;
    }
    const isInCart = cart?.findIndex((item) => item.id == id);
    return isInCart !== -1 ? true : false;
  };

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
                    <img src={img} key={i + Math.random() * 2} loading="lazy" />
                  </div>
                ))}
              </Carousel>
              {!isProductInCart ? (
                <Button
                  variant="contained"
                  fullWidth
                  onClick={addItemToTheCart}
                  disabled={isLoading}
                >
                  Add to Cart
                </Button>
              ) : (
                <Alert severity="success">
                  This item has been added to your cart
                </Alert>
              )}
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
                <p className="product__details_price">
                  {product.price.toLocaleString("en-US", {
                    style: "currency",
                    currency: "USD",
                  })}
                </p>

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
