import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import ImagePreviewer from "./ImagePreviewer";
import boardStyles from "./styles/Board.module.sass";
import dashboardStyles from "@pages/Dashboard/index.module.sass";
import { Camera } from "react-bootstrap-icons";

function WebcamCapture({ handleUploadFile, loading, setLoading }) {
  const camRef = useRef();
  const [previewURL, setPreviewURL] = useState("");
  const [photoTaken, setPhotoTaken] = useState(false);

  const captureAndUpload = async () => {
    const dataUrl = camRef.current.getScreenshot();
    if (dataUrl) {
      try {
        setLoading(true);
        const imageURL = await handleUploadFile(dataUrl);
        setPreviewURL(imageURL);
        setPhotoTaken(true);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="main">
      <div className={dashboardStyles.editButtons_photoContainer}>
        {photoTaken ? (
          <ImagePreviewer
            url={previewURL}
            deleteImage={() => {
              setPreviewURL("");
              setPhotoTaken(false);
            }}
          />
        ) : (
          <>
            <div className={boardStyles.board_item_polaroid}>
              <Webcam
                ref={camRef}
                videoConstraints={{
                  width: 400,
                  height: 400,
                  facingMode: "user",
                  aspectRatio: 1 / 1,
                }}
                screenshotFormat="image/jpeg"
              />
            </div>
          </>
        )}

        {photoTaken ? (
          <button
            className={dashboardStyles.editButtons_webcamBtn}
            onClick={() => {
              setPreviewURL("");
              setPhotoTaken(false);
            }}
          >
            <Camera size="30" className="me-2" /> Retake
          </button>
        ) : (
          <button
            disabled={loading}
            onClick={captureAndUpload}
            className={dashboardStyles.editButtons_webcamBtn}
          >
            <Camera size="30" className="me-2" /> Snap!
          </button>
        )}
      </div>
    </div>
  );
}

export default WebcamCapture;
