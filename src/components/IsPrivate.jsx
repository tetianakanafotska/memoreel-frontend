import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate } from "react-router-dom";
import { Loading } from "@components";

function IsPrivate({ children }) {
  const { isLoggedIn, isLoading } = useContext(AuthContext);

  if (isLoading) return <Loading />;

  if (!isLoggedIn) {
    return <Navigate to="/login" />;
  } else {
    return children;
  }
}

export default IsPrivate;
