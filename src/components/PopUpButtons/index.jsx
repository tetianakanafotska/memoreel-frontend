import React, { useState, useEffect } from "react";
import styles from "./PopUpButtons.module.sass";
import {
  ImageFill,
  Youtube,
  Camera,
  Stickies,
  Mic,
} from "react-bootstrap-icons";

export default function PopUpButtons({
  assetType,
  setAssetType,
  setOpenMediaForm,
  openMediaForm,
}) {
  const [activeButton, setActiveButton] = useState(null);

  const handleOnClick = (type) => {
    setOpenMediaForm((prev) => {
      if (prev && assetType === type) {
        return false;
      } else {
        setAssetType(type);
        return true;
      }
    });
    setActiveButton((prev) => (prev === type ? null : type));
  };

  useEffect(() => {
    if (!openMediaForm) {
      setActiveButton(null);
    }
  }, [openMediaForm]);

  return (
    <>
      <button
        onClick={() => handleOnClick("image")}
        className={`${styles.popUpButton_assetTypeButton} ${
          activeButton === "image" ? styles.active : ""
        }`}
      >
        <ImageFill size="30" />
        <span>add image</span>
      </button>
      <button
        onClick={() => handleOnClick("text")}
        className={`${styles.popUpButton_assetTypeButton} ${
          activeButton === "text" ? styles.active : ""
        }`}
      >
        <Stickies size="30" />
        <span>add text</span>
      </button>
      <button
        onClick={() => handleOnClick("youtubeURL")}
        className={`${styles.popUpButton_assetTypeButton} ${
          activeButton === "youtubeURL" ? styles.active : ""
        }`}
      >
        <Youtube size="30" />
        <span>add Youtube video</span>
      </button>
      <button
        onClick={() => handleOnClick("camImage")}
        className={`${styles.popUpButton_assetTypeButton} ${
          activeButton === "camImage" ? styles.active : ""
        }`}
      >
        <Camera size="30" />
        <span>take selfie</span>
      </button>
      <button
        onClick={() => handleOnClick("audio")}
        className={`${styles.popUpButton_assetTypeButton} ${
          activeButton === "audio" ? styles.active : ""
        }`}
      >
        <Mic size="28" />
        <span>add audio</span>
      </button>
    </>
  );
}
