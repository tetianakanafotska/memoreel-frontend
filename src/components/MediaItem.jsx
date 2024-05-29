import React, { useState } from "react";
import ReactPlayer from "react-player/youtube";
import boardStyles from "./styles/Board.module.sass";
import { Pen, XLg, Trash, CheckLg } from "react-bootstrap-icons";
import MediaForm from "./MediaForm";

function MediaItem({ asset, editAsset, deleteAsset, enableEditing }) {
  const [isEditing, setIsEditing] = useState(false);
  //for rerendering mediaitem if edited
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
        return <audio controls src={assetContent} />;
      default:
        return null;
    }
  };

  const renderButtons = () => {
    return (
      <div className={boardStyles.editButtons_container}>
        <button
          onClick={() => setIsEditing((prev) => !prev)}
          className={boardStyles.editButtons_button}
        >
          {!isEditing ? <XLg size="20" /> : <Pen />}
        </button>

        {isEditing && (
          <>
            <button
              onClick={() => saveEdit(assetContent)}
              className={boardStyles.editButtons_button}
            >
              <CheckLg size="20" />
            </button>
            <button
              onClick={() => deleteAsset(asset._id)}
              className={boardStyles.editButtons_button}
            >
              <Trash />
            </button>
          </>
        )}
      </div>
    );
  };

  return (
    <div className={boardStyles.board_item}>
      {isEditing ? (
        <MediaForm
          assetType={asset.type}
          initialContent={assetContent}
          saveEdit={saveEdit}
          setIsEditing={setIsEditing}
          assetId={asset._id}
          deleteAsset={deleteAsset}
        />
      ) : (
        <div className={boardStyles.board_item_body}>{renderContent()}</div>
      )}
      {enableEditing && (
        <div className={boardStyles.board_item_buttons}>{renderButtons()}</div>
      )}
    </div>
  );
}

export default MediaItem;
