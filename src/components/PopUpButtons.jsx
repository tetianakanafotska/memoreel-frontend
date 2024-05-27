import React from "react";
import Button from "./Button";

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
      >
        add image
      </button>
      <button
        onClick={() => {
          setAssetType("text");
          setOpenMediaForm(true);
          setOpenPopUp(false);
        }}
      >
        add text
      </button>
      <button
        onClick={() => {
          setAssetType("youtubeURL");
          setOpenMediaForm(true);
          setOpenPopUp(false);
        }}
      >
        add Youtube video
      </button>
      <button
        onClick={() => {
          setAssetType("camImage");
          setOpenMediaForm(true);
          setOpenPopUp(false);
        }}
      >
        take selfie
      </button>
      <button
        onClick={() => {
          setAssetType("audio");
          setOpenMediaForm(true);
          setOpenPopUp(false);
        }}
      >
        add audio
      </button>
    </div>
  );
}
