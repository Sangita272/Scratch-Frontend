import React from "react";
import { Navigate } from "react-router-dom";

const FreeAuthRoute = ({ auth, children, title = "" }) => {
  const token = localStorage.getItem("auth_token");

  if (token) {
    return <Navigate to="/list" />;
  } else {
    return (
      <>
        {children}
      </>
    );
  }
};

export default FreeAuthRoute;
