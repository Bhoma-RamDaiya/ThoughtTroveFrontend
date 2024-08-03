import React from "react";
import { Navigate, Outlet } from "react-router-dom";
import { isLogedIn } from "../../Auth";

const PrivateRoute = () => {
  if (isLogedIn()) {
    return <Outlet />;
  } else {
    return <Navigate to={"/Login"} />;
  }
};

export default PrivateRoute;
