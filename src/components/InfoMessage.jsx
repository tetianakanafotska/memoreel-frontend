import React from "react";
import { useContext } from "react";
import userProfilePageStyle from "../pages/styles/UserProfilePage.module.sass";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function InfoMessage() {
  const navigate = useNavigate();
  const { logOutUser } = useContext(AuthContext);

  return (
    <div className={userProfilePageStyle.infoMessage}>
      Your profile has been successfully updated. To see the latest changes,
      please login again.
      <div className={userProfilePageStyle.infoMessage_buttons}>
        <button
          onClick={() => {
            logOutUser();
            navigate("/login");
          }}
        >
          Login
        </button>
      </div>
    </div>
  );
}

export default InfoMessage;
