import React from "react";
import { Navigate } from "react-router-dom";

function Protected({ children }) {
  const value = window.sessionStorage.getItem("token");
  if (!value) {
    //alert("Sorry,You are not Logged In");
    return <Navigate to="/" />;
  }
  return children;
}

export default Protected;
