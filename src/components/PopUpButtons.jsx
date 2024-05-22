import React from "react";
import Button from "./Button";

export default function PopUpButtons({ createNote }) {
  return (
    <div>
      <Button label="add image" />
      <Button onClick={createNote} label="add text" />
      <Button label="add music" />
      <Button label="add video" />
    </div>
  );
}
