import styles from "./style.module.css";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Link } from "react-router-dom";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { routes } from "../../utils/routes";
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
import { getSingleUser } from "../../utils/localStorage";
import { SnackbarContext, severity } from "../../components/SnackBar";
import { useData } from "../../utils/Store";

const initialValues = {
  email: "",
  password: "",
};

const Login = () => {
  const [values, setValues] = useState(initialValues);
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);
  const navigate = useNavigate();
  const snackBarContext = React.useContext(SnackbarContext);

  const {
    state: { user },
    dispatch,
  } = useData();

  const inputOnChange = (e) => {
    const { value, name } = e.target;
    setValues(() => {
      return { ...values, [name]: value };
    });
  };

  const handleLogin = (e) => {
    e.preventDefault();

    const { email, password } = values;

    if (email === "") {
      alert("email filed is required");
    } else if (!email.includes("@")) {
      alert("please enter valid email address");
    } else if (password === "") {
      alert("password filed is required");
    } else if (password.length < 5) {
      alert("password to short please minimum 5");
    } else {
      const success = getSingleUser({ email, password });

      if (success) {
        const user = {
          name: success.name,
          email: success.email,
          id: success.id,
        };
        dispatch({ type: "SET_USER", payload: user });

        snackBarContext({
          severity: severity.success,
          msg: "Login Successful!",
          isOpen: true,
        });
        navigate("/", { replace: true });
      } else {
        snackBarContext({
          severity: severity.error,
          msg: "Invalid Credentials!",
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
                  onChange={inputOnChange}
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
                  onChange={inputOnChange}
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
          </>
        )}
      </Card>
    </Container>
  );
};

export default Login;
