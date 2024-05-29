import { useEffect, useState, useContext } from "react";
import axios from "axios";
import placeholder from "@img/placeholder.jpg";
import { AuthContext } from "../context/AuthContext";
import usersService from "../services/users.service.js";
import { Link, useNavigate } from "react-router-dom";

// const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5005";

function UserProfilePage() {
  const [userProfile, setUserProfile] = useState(null);
  const [nameInput, setNameInput] = useState("");
  const [emailInput, setEmailInput] = useState("");

  const [loading, setLoading] = useState(true);
  const { user, handleDeleteAccount } = useContext(AuthContext);
  const [errorMessage, setErrorMessage] = useState(undefined);
  //   const [isDeleted, setIsDeleted] = useState(false);
  //   const navigate = useNavigate();

  const token = localStorage.getItem("authToken");

  useEffect(
    () => {
      const getUser = () => {
        if (user) {
          usersService
            .get(user._id)
            .then((response) => {
              setUserProfile(response.data);
              setNameInput(response.data.name);
              setEmailInput(response.data.email);
              setLoading(false);
            })
            .catch((error) => {
              const errorDescription = error.response.data.message;
              setErrorMessage(errorDescription);
            });
        } else {
          setErrorMessage("User not logged in");
        }
      };
      getUser();
    },
    [user],
    nameInput
  );

  const handleSubmit = (e) => {
    e.preventDefault();

    const updateUser = async () => {
      try {
        if (user) {
          const response = await usersService.put(user._id, {
            name: nameInput,
            email: emailInput,
          });
          console.log(response);
          if (response.status === 200) {
            setNameInput(response.data.name);
            setEmailInput(response.data.email);
            setUserProfile(response.data);
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    updateUser();
    console.log("form submitted");
  };

  //   const handleDeleteAccount = () => {
  //     usersService
  //       .delete(user._id)
  //       .then((response) => {
  //         console.log(response);
  //         if (response.status === 200) {
  //         }

  //         setIsDeleted(true);
  //       })
  //       .catch((error) => {
  //         console.error("Error deleting account:", error);
  //       });
  //   };

  if (errorMessage) return <div>{errorMessage}</div>;

  if (loading) return <div>Loading...</div>;

  //   if (isDeleted) {
  //     localStorage.removeItem("authToken");
  //     return (
  //       <div>
  //         <p>User has been successfully deleted.</p>
  //         <Link to="/signup">
  //           <button>Go to Signup Page</button>
  //         </Link>
  //       </div>
  //     );
  //   }

  return (
    <div className="StudentDetailsPage bg-gray-100 py-6 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md mb-6">
        {userProfile && (
          <>
            <img
              referrerPolicy="no-referrer"
              src={userProfile.profileImg || placeholder}
              alt="profile-photo"
              className="rounded-full w-32 h-32 object-cover border-2 border-gray-300"
            />
            <h1 className="text-2xl mt-4 font-bold">{userProfile.name}</h1>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-24 mb-4 border-b pb-4">
              <p className="text-left mb-2 border-b pb-2">
                <strong>Email:</strong> {userProfile.email}
              </p>
            </div>
          </>
        )}
      </div>
      <p>
        <a onClick={handleDeleteAccount}>Delete my account</a>
      </p>
      <form
        onSubmit={(e) => {
          handleSubmit(e);
        }}
      >
        <label htmlFor="username">
          Username
          <input
            type="text"
            name="username"
            value={nameInput}
            onChange={(e) => {
              setNameInput(e.target.value);
            }}
          />
        </label>
        <label htmlFor="username">
          Email
          <input
            type="email"
            name="email"
            value={emailInput}
            onChange={(e) => {
              setEmailInput(e.target.value);
            }}
          />
        </label>
        <button style={{ marginLeft: "20rem" }} type="submit">
          Save
        </button>
      </form>
    </div>
  );
}

export default UserProfilePage;
