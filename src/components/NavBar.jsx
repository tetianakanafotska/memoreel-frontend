import React, { useContext, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "@context";
import { LogoFull } from "@components/Logo";
import settingsImg from "@img/settings-gear.svg";
import styles from "./styles/NavBar.module.sass";

function NavBar() {
  const { user, isLoggedIn, logOutUser } = useContext(AuthContext);
  const [showSettings, setShowSettings] = useState(false);
  const location = useLocation();

  const handleMouseEnter = () => setShowSettings(true);
  const handleMouseLeave = () => setShowSettings(false);

  const renderLogo = () => {
    let size = "300px";
    if (location.pathname === "/dashboard") size = "600px";
    if (location.pathname === "/") size = "800px";

    return (
      <NavLink to="/">
        <LogoFull color="#D6F487" size={size} />
      </NavLink>
    );
  };

  const renderAuthLinks = () => (
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
  );

  const renderSettingsMenu = () => (
    <div
      className={styles.navbar_bottom_settings}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
    >
      <NavLink className="d-flex">
        <img
          src={settingsImg}
          width="40px"
          height="40px"
          alt="Settings"
          className={styles.navbar_bottom_settings_icon}
        />
      </NavLink>
      <div className={showSettings ? styles.navbar_show : styles.navbar_hide}>
        <NavLink to="/dashboard/history" className={styles.navlink}>
          History
        </NavLink>
        <NavLink to="/" className={styles.navlink} onClick={logOutUser}>
          Logout
        </NavLink>
      </div>
    </div>
  );

  return (
    <>
      <nav className={styles.navbar_top}>
        <div>{renderLogo()}</div>
        <div>{!isLoggedIn && renderAuthLinks()}</div>
      </nav>
      {isLoggedIn && (
        <nav className={styles.navbar_bottom}>{renderSettingsMenu()}</nav>
      )}
    </>
  );
}

export default NavBar;
