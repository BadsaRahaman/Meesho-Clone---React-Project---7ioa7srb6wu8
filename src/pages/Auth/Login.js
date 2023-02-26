import styles from "./style.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { routes } from "../../helpers/routes";
import {
  TextField,
  Grid,
  Button,
  Card,
  InputAdornment,
  IconButton,
  Container,
  Typography,
} from "@mui/material";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [values, setValues] = useState(initialValues);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigator = useNavigate();

  const getData = (e) => {
    const { value, name } = e.target;
    setValues(() => {
      return { ...values, [name]: value };
    });
  };
  const handleLogin = (e) => {
    e.preventDefault();
    const getUserArr = localStorage.getItem("regData");
    const { email, password } = values;

    if (email === "") {
      alert("email filed is required");
    }
    else if (!email.includes("@")) {
      alert("please enter valid email address");
    }
    else if (password === "") {
      alert("password filed is required");
    } 
    else if (password.length < 5) {
      alert("password to short please minimum 5");
    }
    else {
      if (getUserArr && getUserArr.length) {
        const userData = JSON.parse(getUserArr);
        const userLogin = userData.filter((ele, key) => {
          return ele.email === email && ele.password === password;
        });
        console.log(userLogin);
        if (userLogin.length === 0) {
          alert("Invalid User..");
        } else {
          alert("login successfully");
          navigator(routes.home.path); 
        }
      }
    }
  };

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
          Login
        </Typography>
        <Grid container spacing={3}>
          <Grid item xs={12}>
            <TextField
              fullWidth
              id="standard-basic"
              label="Email"
              name="email"
              variant="standard"
              value={values.email}
              onChange={getData}
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
              onChange={getData}
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
            <Button fullWidth variant="contained" onClick={handleLogin}>
              Login
            </Button>
          </Grid>
          <Grid item xs={12}>
            <Typography className={styles.links}>
              Don't have an account?{" "}
              <Link to={routes.register.path}>Register</Link> now
            </Typography>
          </Grid>
        </Grid>
      </Card>
    </Container>
  );
};

export default Login;
