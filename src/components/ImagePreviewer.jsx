import React from "react";
import boardStyles from "./styles/Board.module.sass";

function ImagePreviewer({ url }) {
  return url ? (
    <div className={boardStyles.board_item_polaroid}>
      <img src={url} alt="my_image" />
    </div>
  ) : null;
}

export default ImagePreviewer;
