import styles from "./style.module.css";
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { routes } from "../../utils/routes";
import { createUser } from "../../utils/localStorage";

import InputAdornment from "@mui/material/InputAdornment";
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
import { SnackbarContext, severity } from "../../components/SnackBar";

import { useData } from "../../utils/Store";

const initialValues = {
  name: "",
  mobile: "",
  email: "",
  password: "",
};

const Register = () => {
  const {
    state: { user },
    dispatch,
  } = useData();

  const [values, setValues] = useState(initialValues);
  const [data, setData] = useState([]);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const snackBarContext = React.useContext(SnackbarContext);

  const getData = (e) => {
    const { name, value } = e.target;
    setValues(() => {
      return { ...values, [name]: value };
    });
  };

  const handleRegister = (e) => {
    e.preventDefault();
    const { name, email, mobile, password } = values;

    if (name === "") {
      alert("name filed is required");
    } else if (mobile === "") {
      alert("mobile filed is required");
    } else if (email === "") {
      alert("email filed is required");
    } else if (!email.includes("@")) {
      alert("please enter valid email address");
    } else if (password === "") {
      alert("password filed is required");
    } else if (password.length < 5) {
      alert("password to short please minimum 5");
    } else {
      const user = createUser(values);
      if (user) {
        dispatch({ type: "SET_USER", payload: user });
        snackBarContext({
          severity: severity.success,
          msg: "Resiter succesfully..",
          isOpen: true,
        });
        navigate("/", { replace: true });
      } else {
        snackBarContext({
          severity: severity.warning,
          msg: "User Already Exist",
          isOpen: true,
        });
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
        {user ? (
          <Typography>Welcome {user.name}</Typography>
        ) : (
          <>
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
                  onChange={getData}
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
                  onChange={getData}
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
                          {isPasswordVisible ? (
                            <VisibilityOff />
                          ) : (
                            <Visibility />
                          )}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </Grid>
              <Grid item xs={12}>
                <Button fullWidth variant="contained" onClick={handleRegister}>
                  Register
                </Button>
              </Grid>
              <Grid item xs={12}>
                <Typography className={styles.links}>
                  Already have an account?{" "}
                  <Link to={routes.login.path}>Login</Link>
                </Typography>
              </Grid>
            </Grid>
          </>
        )}
      </Card>
    </Container>
  );
};

export default Register;
