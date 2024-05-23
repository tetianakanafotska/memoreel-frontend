import React from "react";
import ReactPlayer from "react-player/youtube";

function MediaItem({ media }) {
  return (
    <div>
      {media.type === "text" && media.content}
      {media.type === "image" && (
        <img src={media.content} alt="Uploaded content" />
      )}
      {media.type === "videoURL" && (
        <ReactPlayer url={media.content} controls />
      )}
    </div>
  );
}

export default MediaItem;
