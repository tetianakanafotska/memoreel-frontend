import React, { useState, useContext, useEffect } from "react";
import PopUpButtons from "../components/PopUpButtons";
import MediaForm from "../components/MediaForm";
import MediaItem from "../components/MediaItem";
import { AuthContext } from "@context";
import axios from "axios";

const Dashboard = () => {
  const { user } = useContext(AuthContext);
  const [boardId, setBoardId] = useState(null);
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openMediaForm, setOpenMediaForm] = useState(false);
  const [mediaType, setMediaType] = useState(null);
  const [allMedia, setAllMedia] = useState([]);

  const getLocalISODate = () => {
    const now = new Date();
    const offset = now.getTimezoneOffset() * 60000;
    const localISOTime = new Date(now.getTime() - offset)
      .toISOString()
      .slice(0, 10);
    return localISOTime;
  };

  useEffect(() => {
    const currentDate = getLocalISODate();
    console.log("THE DATE", currentDate);
    if (user) {
      const userId = user._id;
      axios
        .get(
          `http://localhost:5005/users/${userId}/boards?start=${currentDate}`
        )
        .then((res) => {
          setAllMedia(res.data[0].boardContent);
          setBoardId(res.data[0]._id);
        });
    }
  }, [user]);

  useEffect(() => {
    if (!boardId && user) {
      axios
        .post(`http://localhost:5005/boards`, {
          userId: user._id,
          boardContent: allMedia,
        })
        .then((res) => {
          console.log(res);
        });
    }
    if (boardId && user) {
      axios
        .patch(`http://localhost:5005/boards/${boardId}`, allMedia)
        .then((res) => {
          console.log(res);
        });
    }
  }, [allMedia]);

  return (
    <>
      <h2>{user ? `Hello, ${user.name}!` : "Hello!"}</h2>

      <div className="dashboard-container">
        <button onClick={() => setOpenPopUp(!openPopUp)}>+</button>
        {openPopUp && (
          <PopUpButtons
            setMediaType={setMediaType}
            setOpenMediaForm={setOpenMediaForm}
            setOpenPopUp={setOpenPopUp}
          />
        )}
        {openMediaForm && (
          <MediaForm
            mediaType={mediaType}
            setAllMedia={setAllMedia}
            setOpenPopUp={setOpenPopUp}
            setOpenMediaForm={setOpenMediaForm}
          />
        )}
        {allMedia &&
          allMedia.map((media, index) => {
            //replace with decent key - media._id
            return (
              <div key={index}>
                <MediaItem media={media} />
              </div>
            );
          })}
      </div>
    </>
  );
};

export default Dashboard;
