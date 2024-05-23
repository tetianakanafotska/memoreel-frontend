import React, { useEffect, useState } from "react";
import PopUpButtons from "../components/PopUpButtons";
import MediaForm from "../components/MediaForm";
import MediaItem from "../components/MediaItem";
import axios from "axios";

const Dashboard = () => {
  const [openPopUp, setOpenPopUp] = useState(false);
  const [openMediaForm, setOpenMediaForm] = useState(false);
  const [mediaType, setMediaType] = useState(null);

  const [allMedia, setAllMedia] = useState([]);
  const [currentBoard, setCurrentBoard] = useState({
    boardContent: [allMedia],
  });

  // useEffect(() => {
  //   const currentDate = new Date().toISOString().slice(0, 10);
  //   axios
  //     .get(`http://localhost:5005/boards?date=${currentDate}`)
  //     .then((res) => {
  //       console.log(res.data);
  //     });
  // }, [allMedia]);

  useEffect(() => {
    if (currentBoard.boardContent.length === 0) {
      axios
        .post("http://localhost:5005/boards", { boardContent: allMedia })
        .then((resp) => {
          console.log(resp);
        });
    }
  }, [allMedia]);

  useEffect(() => {
    axios
      .patch("http://localhost:5005/boards", { boardContent: allMedia })
      .then((resp) => {
        console.log(resp);
      });
  }, [allMedia]);

  return (
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
          allMedia={allMedia}
        />
      )}
      {currentBoard.boardContent.map((media) => {
        console.log(currentBoard.boardContent);
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
