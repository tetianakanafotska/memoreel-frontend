import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import boardStyles from "./styles/Board.module.sass";
import { Pen, XLg, Trash, CheckLg } from "react-bootstrap-icons";
import dashboardStyles from "@pages/styles/Dashboard.module.sass";
import MediaForm from "./MediaForm";
import classNames from "classnames";

function MediaItem({ asset, editAsset, deleteAsset, enableEditing }) {
  const [isEditing, setIsEditing] = useState(false);
  const [assetContent, setAssetContent] = useState(asset.content);

  const saveEdit = (newContent) => {
    editAsset(asset._id, newContent);
    setIsEditing(false);
    setAssetContent(newContent);
  };

  const renderContent = () => {
    switch (asset.type) {
      case "text":
        return (
          <div className={boardStyles.board_item_note}>
            <div>
              <p>{assetContent}</p>
            </div>
          </div>
        );
      case "image":
        return (
          <div className={boardStyles.board_item_image}>
            <img src={assetContent} alt="Uploaded content" />
          </div>
        );
      case "youtubeURL":
        return (
          <div className={boardStyles.board_item_video}>
            <ReactPlayer url={assetContent} controls />
          </div>
        );
      case "camImage":
        return (
          <div className={boardStyles.board_item_polaroid}>
            <img
              src={assetContent}
              alt="Uploaded content"
              style={{ width: "400px" }}
            />
          </div>
        );
      case "audio":
        return (
          <div className={boardStyles.board_item_audio}>
            <p>Voice note</p>
            <audio controls src={assetContent} />
          </div>
        );
      default:
        return null;
    }
  };

  return (
    <div className={boardStyles.board_item}>
      {isEditing ? (
        <MediaForm
          assetType={asset.type}
          assetContent={assetContent}
          saveEdit={saveEdit}
          setIsEditing={setIsEditing}
          isEditing={isEditing}
          assetId={asset._id}
          deleteAsset={deleteAsset}
        />
      ) : (
        <div className={boardStyles.board_item_body}>{renderContent()}</div>
      )}
      {enableEditing && (
        <div className={boardStyles.editButtons}>
          <button
            onClick={() => {
              setIsEditing((prev) => !prev);
            }}
          >
            <Pen size={16} />
          </button>
        </div>
      )}
    </div>
  );
}

export default MediaItem;
