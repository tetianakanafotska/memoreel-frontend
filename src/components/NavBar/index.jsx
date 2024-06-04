import React, { useContext, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "@context";
import { LogoFull, LogoSquare } from "@components/Logo";
import styles from "./index.module.sass";
import placeholder from "@img/placeholder.jpg";
import { BoxArrowRight } from "react-bootstrap-icons";
import Button from "../Button";
import { useMediaPredicate } from "react-media-hook";

function NavBar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const location = useLocation();
  const mobileViewport = useMediaPredicate("(max-width: 578px)");

  const renderLogo = () => {
    let size = "300px";
    if (location.pathname === "/dashboard") size = "550px";
    if (location.pathname === "/") size = "400px";

    return (
      <NavLink to="/">
        {mobileViewport ? (
        <LogoSquare color="#D6F487" size={60} />

        ) : (

        <LogoFull color="#D6F487" size={size} />
        )}
      </NavLink>
    );
  };

  const renderAuthLinks = () => (
    <>
      {location.pathname !== "/login" && <Button to="/login">Login</Button>}
      {location.pathname !== "/signup" && <Button to="/signup">Signup</Button>}
    </>
  );

  return (
    <div>
      <div
        className={
          location.pathname === "/dashboard" ? styles.centerLogo : styles.navbar
        }
      >
        <div>{renderLogo()}</div>
        <div>{!isLoggedIn && renderAuthLinks()}</div>
        {isLoggedIn && (
          <div className={styles.navbarButtons}>
            {(location.pathname === "/dashboard/history" ||
              location.pathname === "/profile") && (
              <Button to="/dashboard">Dashboard</Button>
            )}
            <Button to="/" onClick={logOutUser}>
              {<BoxArrowRight size="20" />}
            </Button>
          </div>
        )}
      </div>
      {isLoggedIn && (
        <div className={styles.navbar_bottom}>
          <div>
            {user ? (
              <NavLink to="/profile" className="user-picture">
                <img
                  src={user.profileImg}
                  onError={(e) => {
                    e.target.src = placeholder;
                  }}
                  alt={user.name}
                  className={styles.navbar_userProfile}
                />
              </NavLink>
            ) : (
              <Button to="/profile">{user.name.trim().charAt(0)}</Button>
            )}
          </div>
          <div>
            {location.pathname === "/dashboard" && (
              <div className="history-button">
                <Button
                  to="/dashboard/history"
                  type="primary"
                  className={styles.navlink}
                >
                  History
                </Button>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

export default NavBar;
