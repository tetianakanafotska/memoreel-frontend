import React, { useState, useEffect } from "react";
import ReactPlayer from "react-player/youtube";

function MediaItem({ asset, handleDeleteAsset, handleEditAsset }) {
  const [isEditing, setIsEditing] = useState(false);
  const [editedContent, setEditedContent] = useState(asset.content);

  const handleSaveEdit = () => {
    handleEditAsset(asset._id, editedContent);
    setIsEditing(false);
  };

  const renderContent = () => {
    switch (asset.type) {
      case "text":
        return isEditing ? (
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <p>{editedContent || asset.content}</p>
        );
      case "image":
        return isEditing ? (
          <input
            type="text"
            value={editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <img src={editedContent || asset.content} alt="Uploaded content" />
        );
      case "youtubeURL":
        return isEditing ? (
          <input
            type="text"
            value={editedContent || editedContent}
            onChange={(e) => setEditedContent(e.target.value)}
          />
        ) : (
          <ReactPlayer url={asset.content} controls />
        );
      default:
        return null;
    }
  };

  const renderButtons = () => {
    return isEditing ? (
      <div className="edit-mode-buttons">
        <button onClick={handleSaveEdit}>Save</button>
        <button onClick={() => setIsEditing(false)}>Cancel</button>
        <button onClick={() => handleDeleteAsset(asset._id)}>Delete</button>
      </div>
    ) : (
      <button onClick={() => setIsEditing(true)}>Edit</button>
    );
  };

  return (
    <div>
      {renderContent()}
      {renderButtons()}
    </div>
  );
}

export default MediaItem;
