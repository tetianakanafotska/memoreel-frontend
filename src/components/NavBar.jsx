import React, { useContext, useState, useEffect } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { AuthContext } from "@context";
import { LogoFull } from "@components/Logo";
import styles from "./styles/NavBar.module.sass";
import placeholder from "@img/placeholder.jpg";
import { BoxArrowRight } from "react-bootstrap-icons";
import Button from "./Button";
import usersService from "../services/users.service";

function NavBar() {
  const { isLoggedIn, logOutUser, user } = useContext(AuthContext);
  const [profileImg, setProfileImg] = useState("");
  const location = useLocation();

  useEffect(() => {
    const getUser = async () => {
      if (user) {
        try {
          const response = await usersService.get(user._id);
          setProfileImg(response.data.profileImg);
        } catch (error) {
          console.error(error);
        }
      }
    };
    getUser();
  }, [user]);

  const renderLogo = () => {
    let size = "300px";
    if (location.pathname === "/dashboard") size = "550px";
    if (location.pathname === "/") size = "400px";

    return (
      <NavLink to="/">
        <LogoFull color="#D6F487" size={size} />
      </NavLink>
    );
  };

  const renderAuthLinks = () => (
    <>
      {location.pathname !== "/login" && (
        <Button to="/login" className={styles.navlink}>
          Login
        </Button>
      )}
      {location.pathname !== "/signup" && (
        <Button to="/signup" className={styles.navlink}>
          Signup
        </Button>
      )}
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
              <Button to="/dashboard" className={styles.navlink}>
                Dashboard
              </Button>
            )}
            <Button to="/" className={styles.navlink} onClick={logOutUser}>
              {<BoxArrowRight size="20" />}
            </Button>
          </div>
        )}
      </div>
      {isLoggedIn && (
        <div className={styles.navbar_bottom}>
          <div>
            {user && profileImg ? (
              <NavLink to="/profile" className="user-picture">
                <img
                  src={profileImg}
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
