import styles from "./styles.module.css";
import React, { useEffect, useState } from "react";
import { useProducts } from "../../utils/useProducts";
import { useData } from "../../utils/Store";
import {
  Grid,
  Typography,
  Box,
  Container,
  Card,
  IconButton,
  CardMedia,
  Divider,
  Button,
} from "@mui/material";
import { removeProductFromCart } from "../../utils/localStorage";
import DeleteOutlineOutlinedIcon from "@mui/icons-material/DeleteOutlineOutlined";
import { useNavigate } from "react-router-dom";
import { routes } from "../../utils/routes";

const DISCOUNT = 180;

const Cart = () => {
  const navigator = useNavigate();
  const {
    state: { cart, user },
    dispatch,
  } = useData();

  const [total, setTotal] = useState(0);

  const getTotal = () => {
    const total = cart?.reduce((prev, acc) => {
      return prev + acc.price;
    }, 0);
    return total;
  };
  useEffect(() => {
    setTotal(getTotal() || 0);
  }, [cart]);

  if (!cart) {
    return (
      <Container sx={{ paddingBlock: { xs: "40px", sm: "50px", md: "80px" } }}>
        Loading...
      </Container>
    );
  } else if (cart.length == 0) {
    return (
      <Container sx={{ paddingBlock: { xs: "40px", sm: "50px", md: "80px" } }}>
        No item found...
      </Container>
    );
  }

  const removeCartItem = (productId) => {
    removeProductFromCart(user.id, productId);
    const filteredList = cart.filter((product) => product.id !== productId);
    dispatch({ type: "SET_CART", payload: filteredList });
  };

  return (
    <Container sx={{ paddingBlock: { xs: "40px", sm: "50px", md: "80px" } }}>
      <Grid container spacing={{ xs: "20px", md: "30px" }}>
        <Grid item xs={12} sm={7} md={8}>
          <Card sx={{ padding: 2 }}>
            {cart?.map((product) => (
              <Card key={product.id} variant="outlined" sx={{ p: 3, mb: 2 }}>
                <Grid container spacing={2}>
                  <Grid item xs={12} md={4}>
                    <CardMedia
                      component="img"
                      height="200"
                      image={product.thumbnail}
                      alt={product.title}
                      onClick={() =>
                        navigator(`${routes.products.path}/${product.id}`)
                      }
                      sx={{ cursor: "pointer" }}
                    />
                  </Grid>
                  <Grid item xs={12} md={8}>
                    <Box sx={{ display: "flex", width: "100%" }}>
                      <Box flexBasis={"calc(100% - 50px)"}>
                        <Typography
                          variant={"h6"}
                          sx={{
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.3s",
                            "&:hover": { color: "orange" },
                          }}
                          onClick={() =>
                            navigator(`${routes.products.path}/${product.id}`)
                          }
                        >
                          {product.title}
                        </Typography>
                        <p className="product__details_extra">
                          Brand: <span>{product.brand}</span>
                        </p>
                        <p className="product__details_extra">
                          Category: <span>{product.category}</span>
                        </p>
                        <p className="product__details_descriptoin">
                          {product.description}
                        </p>

                        <Typography className="product__details_price">
                          {product.price.toLocaleString("en-US", {
                            style: "currency",
                            currency: "USD",
                          })}
                        </Typography>
                      </Box>
                      <Box flexBasis={"40px"}>
                        <IconButton onClick={() => removeCartItem(product.id)}>
                          <DeleteOutlineOutlinedIcon />
                        </IconButton>
                      </Box>
                    </Box>
                  </Grid>
                </Grid>
              </Card>
            ))}
          </Card>
        </Grid>
        <Grid item xs={12} sm={5} md={4}>
          <Card sx={{ marginBottom: "20px" }}>
            <Box sx={{ padding: 2 }}>
              <Typography sx={{ fontWeight: 600, color: "#878787" }}>
                PRICE DETAILS
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{ padding: 2 }}
              display={"flex"}
              alignItems="center"
              justifyContent="space-between"
              gap={"15px"}
              flexWrap={"wrap"}
            >
              <Typography variant="body1">
                Price ({cart.length} items)
              </Typography>
              <Typography variant="body2">
                {total.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Typography>
            </Box>
            <Box
              sx={{ padding: 2 }}
              display={"flex"}
              alignItems="center"
              justifyContent="space-between"
              gap={"15px"}
              flexWrap={"wrap"}
            >
              <Typography variant="body1">Discount</Typography>
              <Typography variant="body2" sx={{ color: "red" }}>
                -
                {DISCOUNT.toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Typography>
            </Box>
            <Box
              sx={{ padding: 2 }}
              display={"flex"}
              alignItems="center"
              justifyContent="space-between"
              gap={"15px"}
              flexWrap={"wrap"}
            >
              <Typography variant="body1">Delivery Charges</Typography>
              <Typography variant="body2" sx={{ color: "red" }}>
                Free
              </Typography>
            </Box>
            <Divider />
            <Box
              sx={{ padding: 2 }}
              display={"flex"}
              alignItems="center"
              justifyContent="space-between"
              gap={"15px"}
              flexWrap={"wrap"}
            >
              <Typography
                variant={"h6"}
                sx={{ fontWeight: 700, fontSize: "18px" }}
              >
                Total Amount
              </Typography>
              <Typography
                variant="body2"
                sx={{ fontWeight: 700, fontSize: "18px" }}
              >
                {(total - DISCOUNT).toLocaleString("en-US", {
                  style: "currency",
                  currency: "USD",
                })}
              </Typography>
            </Box>
          </Card>
          <Button variant="contained" color="success" fullWidth size="large">
            Place Order
          </Button>
        </Grid>
      </Grid>
    </Container>
  );
};

export default Cart;
