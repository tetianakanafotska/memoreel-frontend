import { useContext } from "react";
import { Navigate } from "react-router-dom";

import { AuthContext } from "@context";
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
