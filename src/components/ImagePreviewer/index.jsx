import React from "react";
import { Polaroid } from '@components/MediaItem';


function ImagePreviewer({ url }) {
  return url ? (
    <Polaroid>
      <img src={url} alt="my_image" />
    </Polaroid>
  ) : null;
}

export default ImagePreviewer;
