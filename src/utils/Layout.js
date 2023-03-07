import React from "react";
import NavBar from "../components/NavBar";
import { GlobalContext } from "../components/App";

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      {children}
    </div>
  );
};

export default Layout;
