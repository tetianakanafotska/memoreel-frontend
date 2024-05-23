import React from "react";
import Button from "./Button";

export default function PopUpButtons({
  setMediaType,
  setOpenMediaForm,
  setOpenPopUp,
}) {
  return (
    <div>
      <Button
        onClick={() => {
          setMediaType("image");
          setOpenMediaForm(true);
          setOpenPopUp(false);
        }}
        label="add image"
      />
      <Button
        onClick={() => {
          setMediaType("text");
          setOpenMediaForm(true);
          setOpenPopUp(false);
        }}
        label="add text"
      />
      <Button
        onClick={() => {
          setMediaType("videoURL");
          setOpenMediaForm(true);
          setOpenPopUp(false);
        }}
        label="add Youtube video"
      />
    </div>
  );
}
