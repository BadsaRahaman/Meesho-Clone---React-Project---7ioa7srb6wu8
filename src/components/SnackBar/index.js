import * as React from "react";
import Stack from "@mui/material/Stack";
import Button from "@mui/material/Button";
import Snackbar from "@mui/material/Snackbar";
import MuiAlert from "@mui/material/Alert";
import Slide from "@mui/material/Slide";

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

function Transition(props) {
  return <Slide {...props} direction="down" />;
}

export const severity = {
  error: "error",
  warning: "warning",
  info: "info",
  success: "success",
};

export const SnackbarContext = React.createContext();

export default function CustomizedSnackbars({ data }) {
  const { severity, msg, isOpen } = data;
  const snackBarContext = React.useContext(SnackbarContext);

  const handleClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }

    snackBarContext({ severity: "", msg: "", isOpen: false });
  };

  return (
    <Snackbar
      open={isOpen}
      autoHideDuration={6000}
      onClose={handleClose}
      anchorOrigin={{ vertical: "top", horizontal: "center" }}
      TransitionComponent={Transition}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {msg}
      </Alert>
    </Snackbar>
  );
}
