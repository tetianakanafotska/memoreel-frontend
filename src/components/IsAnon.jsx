// src/components/IsAnon.jsx

import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Loading } from "@components";

function IsAnon({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <Loading />;

  if (isLoggedIn) {
    return <Navigate to="/dashboard" />;
  } else {
    return children;
  }
}

export default IsAnon;
