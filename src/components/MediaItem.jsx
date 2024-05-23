import React from "react";
import ReactPlayer from "react-player/youtube";

function MediaItem({ media }) {
  return (
    <div>
      {media.type === "text" && media.content}
      {media.type === "videoURL" && (
        <ReactPlayer url={media.content} controls />
      )}
    </div>
  );
}

export default MediaItem;
