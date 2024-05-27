import React from "react";
import Button from "./Button";
import styles from './styles/PopUpButtons.module.sass';

export default function PopUpButtons({
  setAssetType,
  setOpenMediaForm,
  setOpenPopUp,
}) {
  return (
    <div>
      <button
        onClick={() => {
          setAssetType("image");
          setOpenMediaForm(true);
          setOpenPopUp(false);
        }}
        className={styles.popUpBtn}
      >
        add image
      </button>
      <button
        onClick={() => {
          setAssetType("text");
          setOpenMediaForm(true);
          setOpenPopUp(false);
        }}
        className={styles.popUpBtn}
      >
        add text
      </button>
      <button
        onClick={() => {
          setAssetType("youtubeURL");
          setOpenMediaForm(true);
          setOpenPopUp(false);
        }}
        className={styles.popUpBtn}
      >
        add Youtube video
      </button>
      <button
        onClick={() => {
          setAssetType("camImage");
          setOpenMediaForm(true);
          setOpenPopUp(false);
        }}
        className={styles.popUpBtn}
      >
        take selfie
      </button>
    </div>
  );
}
