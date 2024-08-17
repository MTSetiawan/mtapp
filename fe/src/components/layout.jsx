/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import Navbar from "./Navbar";

const Layout = async ({ children }) => {
  return <div className="h-screen">{children}</div>;
};

export default Layout;
