import React, { useContext, useState } from "react";
import styles from "./styles/NavBar.module.sass";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "@context";
import settingsImg from "@img/settings-gear.svg";
import { LogoSquare } from "@components/Logo";

function NavBar() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();

  const handleMouseEnter = () => {
    setShowSettings(true);
  };

  const handleMouseLeave = () => {
    setShowSettings(false);
  };

  return (
    <>
      <nav className={styles.navbar_top}>
        <div>
          <NavLink to="/">
            <LogoSquare color="#fff" size="50px" />
          </NavLink>
        </div>

        <div>
          {!isLoggedIn && (
            <>
              {location.pathname !== "/login" && (
                <NavLink to="/login" className={styles.navlink}>
                  Login
                </NavLink>
              )}
              {location.pathname !== "/signup" && (
                <NavLink to="/signup" className={styles.navlink}>
                  Signup
                </NavLink>
              )}
            </>
          )}
        </div>
      </nav>

      {isLoggedIn && (
        <nav className={styles.navbar_bottom}>
          <div
            className={styles.navbar_bottom_settings}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
          >
            <NavLink className="d-flex">
              <img
                src={settingsImg}
                width={"40px"}
                height={"40px"}
                alt="Settings"
                className={styles.navbar_bottom_settings_icon}
              />
            </NavLink>

            <div
              className={showSettings ? styles.navbar_show : styles.navbar_hide}
            >
              <NavLink to="/dashboard/history" className={styles.navlink}>
                History
              </NavLink>

              <NavLink to="/" className={styles.navlink} onClick={logOutUser}>
                Logout
              </NavLink>
            </div>
          </div>
        </nav>
      )}
    </>
  );
}

export default NavBar;
