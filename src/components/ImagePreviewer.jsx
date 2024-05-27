import React from "react";

function ImagePreviewer({ url, deleteImage }) {
  return url ? (
    <div className="img_box">
      <img src={url} alt="my_image" />
      <button className="close_btn" onClick={deleteImage}>
        Retake
      </button>
    </div>
  ) : null;
}

export default ImagePreviewer;
