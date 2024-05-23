import React from "react";

function MediaItem({ media }) {
  return (
    <div>
      {media.type === "text" && media.content}
      {media.type === "videoURL" && media.content}
      {media.type === "image" && (
        <img src={media.content} alt="Uploaded content" />
      )}
    </div>
  );
}

export default MediaItem;
