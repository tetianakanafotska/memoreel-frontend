import React, { useState } from "react";
import Button from "../components/Button";
import PopUpButtons from "../components/PopUpButtons";
import MediaForm from "../components/MediaForm";
import MediaItem from "../components/MediaItem";

const Dashboard = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openMediaForm, setOpenMediaForm] = useState(false);
  const [mediaType, setMediaType] = useState(null);

  const [allMedia, setAllMedia] = useState([]);
  return (
    <div className="dashboard-container">
      <Button onClick={() => setOpenPopUp(!openPopUp)} label="+" />
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
      {allMedia.map((media) => {
        console.log(allMedia);
        return (
          <div key={media._id}>
            <MediaItem media={media} />
          </div>
        );
      })}
    </div>
  );
};

export default Dashboard;
