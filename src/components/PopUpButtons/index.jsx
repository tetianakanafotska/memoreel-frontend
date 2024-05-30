import React from "react";
import styles from "./PopUpButtons.module.sass";
import { ImageFill, Youtube, Camera, Stickies } from "react-bootstrap-icons";

export default function PopUpButtons({ setAssetType, setOpenMediaForm }) {
  return (
    <>
      <button
        onClick={() => {
          setAssetType("image");
          setOpenMediaForm((prev) => (prev ? false : true));
        }}
        className={styles.popUpButton_assetTypeButton}
      >
        <ImageFill size="30" />
        <span>add image</span>
      </button>
      <button
        onClick={() => {
          setAssetType("text");
          setOpenMediaForm((prev) => (prev ? false : true));
        }}
        className={styles.popUpButton_assetTypeButton}
      >
        <Stickies size="30" />
        <span>add text</span>
      </button>
      <button
        onClick={() => {
          setAssetType("youtubeURL");
          setOpenMediaForm((prev) => (prev ? false : true));
        }}
        className={styles.popUpButton_assetTypeButton}
      >
        <Youtube size="30" />
        <span>add Youtube video</span>
      </button>
      <button
        onClick={() => {
          setAssetType("camImage");
          setOpenMediaForm((prev) => (prev ? false : true));
        }}
        className={styles.popUpButton_assetTypeButton}
      >
        <Camera size="30" />
        <span>take selfie</span>
      </button>
      <button
        onClick={() => {
          setAssetType("audio");
          setOpenMediaForm(true);
        }}
      >
        add audio
      </button>
    </>
  );
}

