import React from "react";
import Button from "./Button";

export default function PopUpButtons({
  setMediaType,
  setOpenMediaForm,
  setOpenPopUp,
}) {
  return (
    <div>
      <button
        onClick={() => {
          setMediaType("image");
          setOpenMediaForm(true);
          setOpenPopUp(false);
        }}
        label="add image"
      >
        add image
      </button>
      <button
        onClick={() => {
          setMediaType("text");
          setOpenMediaForm(true);
          setOpenPopUp(false);
        }}
      >
        add text
      </button>
      <button
        onClick={() => {
          setMediaType("videoURL");
          setOpenMediaForm(true);
          setOpenPopUp(false);
        }}
      >
        add Youtube video
      </button>
    </div>
  );
}
