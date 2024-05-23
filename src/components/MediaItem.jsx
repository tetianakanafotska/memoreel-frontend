import React from "react";

function MediaItem({ media }) {
  return (
    <div>
      {media.type === "text" && media.content}
      {media.type === "videoURL" && media.content}
    </div>
  );
}

export default MediaItem;
