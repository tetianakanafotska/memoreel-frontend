import React, { useRef, useState } from "react";
import Webcam from "react-webcam";
import ImagePreviewer from "./ImagePreviewer";
import boardStyles from "./styles/Board.module.sass";

function WebcamCapture({ uploadImage, loading, setLoading }) {
  const camRef = useRef();
  const [previewURL, setPreviewURL] = useState("");

  const captureAndUpload = async () => {
    const dataUrl = camRef.current.getScreenshot();
    if (dataUrl) {
      try {
        setLoading(true);
        const imageDetails = await uploadImage(dataUrl);
        console.log("imagedetails", imageDetails);
        setPreviewURL(imageDetails.url);
        setLoading(false);
      } catch (error) {
        console.error(error);
        setLoading(false);
      }
    }
  };

  return (
    <div className="main">
      <article className="media_box">
        <div className={boardStyles.boardPolaroid}>
          <Webcam
            ref={camRef}
            videoConstraints={{
              width: 500,
              height: 500,
              facingMode: "user",
              aspectRatio: 9 / 16,
            }}
            screenshotFormat="image/jpeg"
          />
          <button
            disabled={loading}
            onClick={captureAndUpload}
            className="capture_btn"
          >
            Snap
          </button>
          <ImagePreviewer
            url={previewURL}
            deleteImage={() => {
              setPreviewURL("");
            }}
          />
        </div>
      </article>
    </div>
  );
}

export default WebcamCapture;
