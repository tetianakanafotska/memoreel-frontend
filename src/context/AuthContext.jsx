import React, { useState, useEffect } from "react";
import authService from "../services/auth.service";
import usersService from "../services/users.service.js";

const AuthContext = React.createContext();

function AuthProviderWrapper(props) {
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [authError, setAuthError] = useState(null);

  const storeToken = (token) => {
    localStorage.setItem("authToken", token);
  };

  const authenticateUser = () => {
    const storedToken = localStorage.getItem("authToken");

    if (storedToken) {
      authService
        .verify()
        .then((response) => {
          const user = response.data;
          setIsLoggedIn(true);
          setIsLoading(false);
          setUser(user);
        })
        .catch((error) => {
          if (error) {
            setAuthError(error.response.data.message);
            return;
          }
          setIsLoggedIn(false);
          setIsLoading(false);
          setUser(null);
        });
    } else {
      setIsLoggedIn(false);
      setIsLoading(false);
      setUser(null);
    }
  };

  const removeToken = () => {
    localStorage.removeItem("authToken");
  };

  const logOutUser = () => {
    removeToken();
    authenticateUser();
  };

  const handleDeleteAccount = () => {
    usersService
      .delete(user._id)
      .then((response) => {
        console.log(response);
        if (response.status === 200) {
        }
        removeToken();
        setIsLoggedIn(false);
        setIsLoading(false);
        setUser(null);
      })
      .catch((error) => {
        console.error("Error deleting account:", error);
      });
  };

  useEffect(() => {
    authenticateUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        isLoggedIn,
        isLoading,
        user,
        storeToken,
        authenticateUser,
        logOutUser,
        authError,
        handleDeleteAccount,
      }}
    >
      {props.children}
    </AuthContext.Provider>
  );
}

export { AuthProviderWrapper, AuthContext };
