import { useEffect, useState, useContext, useRef } from "react";
import placeholder from "@img/placeholder.jpg";
import { AuthContext } from "../context/AuthContext";
import usersService from "../services/users.service.js";
import uploadService from "../services/file-upload.service";
import userProfilePageStyle from "./styles/UserProfilePage.module.sass";
import { Pen } from "react-bootstrap-icons";

function UserProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");
  const [profileImg, setProfileImg] = useState("");
  const [loading, setLoading] = useState(true);
  const { user, handleDeleteAccount } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  const fileInputRef = useRef(null);
  console.log(profileImg);

  useEffect(() => {
    const getUser = async () => {
      if (user) {
        try {
          const response = await usersService.get(user._id);
          setUserProfile(response.data);
          setNameInput(response.data.name);
          setEmailInput(response.data.email);
          setProfileImg(response.data.profileImg);
          setLoading(false);
        } catch (error) {
          const errorDescription = error.response.data.message;
          setErrorMessage(errorDescription);
        }
      } else {
        setErrorMessage("User not logged in");
      }
    };
    getUser();
  }, [user]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      if (user) {
        const response = await usersService.put(user._id, {
          name: nameInput,
          email: emailInput,
          profileImg: profileImg,
        });
        console.log(response.data);
        if (response.status === 200) {
          setUserProfile(response.data);
          setProfileImg(response.data.profileImg);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      try {
        setLoading(true);
        const fileUrl = await uploadService.uploadFile(file);
        setProfileImg(fileUrl);
        setLoading(false);
        console.log("file upload");
      } catch (error) {
        console.error("Error uploading file:", error);
        setLoading(false);
      }
    }
  };

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  if (errorMessage) return <div>{errorMessage}</div>;

  if (loading) return <div>Loading...</div>;

  return (
    <div className={userProfilePageStyle.userProfile}>
      <form
        onSubmit={handleSubmit}
        className={userProfilePageStyle.formContainer}
      >
        <div className={userProfilePageStyle.profilePicContainer}>
          {userProfile && (
            <>
              <img
                referrerPolicy="no-referrer"
                src={profileImg || placeholder}
                alt="profile-photo"
                style={{
                  height: "150px",
                  width: "150px",
                  borderRadius: "50%",
                  objectFit: "cover",
                  outline: "1px solid black",
                }}
                className={userProfilePageStyle.profileImg}
              />
            </>
          )}
          <button
            type="edit"
            onClick={triggerFileInput}
            className={userProfilePageStyle.changePicLink}
          >
            <Pen className={userProfilePageStyle.pen} />
          </button>
        </div>
        <h2>
          {userProfile.name} {userProfile.email}
        </h2>
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          ref={fileInputRef}
          style={{ display: "none" }}
        />
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            value={nameInput}
            onChange={(e) => setNameInput(e.target.value)}
          />
        </label>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            value={emailInput}
            onChange={(e) => setEmailInput(e.target.value)}
          />
        </label>
        <button type="submit">Save</button>
        <p className={userProfilePageStyle.deleteAccountButton}>
          <a onClick={handleDeleteAccount}>Delete my account</a>
        </p>
      </form>
    </div>
  );
}

export default UserProfilePage;
