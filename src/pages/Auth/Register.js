import styles from "./style.module.css";
import React, { useState } from "react";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { routes } from "../../helpers/routes";

import InputAdornment from "@mui/material/InputAdornment";

const initialValues = {
  name: "",
  mobile: "",
  email: "",
  password: "",
};

import {
  TextField,
  Grid,
  Box,
  Card,
  IconButton,
  Container,
  Typography,
  Button,
} from "@mui/material";

const Register = () => {
  const [values, setValues] = useState(initialValues);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const handleClickShowPassword = () => {
    setIsPasswordVisible((prev) => !prev);
  };

  return (
    <Container
      sx={{
        display: "flex",
        minHeight: "80vh",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <Card
        sx={{
          p: { xs: 4, sm: 8, md: 10, lg: 10 },
          maxWidth: "600px",
          marginInline: "auto",
        }}
      >
        <Typography variant={"h5"} fontWeight={"600"} textAlign={"center"}>
          Register
        </Typography>
        <Grid container spacing={2}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Name"
              name="name"
              variant="standard"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Name"
              name="name"
              variant="standard"
              value={values.name}
              onChange={(e) => setValues({ ...values, name: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Mobile"
              name="mobile"
              variant="standard"
              value={values.mobile}
              onChange={(e) => setValues({ ...values, mobile: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Email"
              name="email"
              variant="standard"
              value={values.email}
              onChange={(e) => setValues({ ...values, email: e.target.value })}
            />
          </Grid>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Password"
              name="password"
              variant="standard"
              type={`${isPasswordVisible ? "text" : "password"}`}
              value={values.password}
              onChange={(e) =>
                setValues({ ...values, password: e.target.value })
              }
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleClickShowPassword}
                      edge="end"
                    >
                      {isPasswordVisible ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Grid>
          <Grid item xs={12}>
            <Button fullWidth variant="contained">
              Register
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography className={styles.links}>
              Already have an account? <Link to={routes.login.path}>Login</Link>
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Register;
