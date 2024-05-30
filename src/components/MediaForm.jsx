import React, { useState, useEffect } from "react";
import loadingGif from "../assets/images/loading.gif";
import uploadService from "../services/file-upload.service";
import assetsService from "../services/assets.service";
import boardsService from "../services/boards.service";
import WebcamCapture from "./WebcamCapture";
import AudioCapture from "./AudioRecorder";
import dashboardStyles from "@pages/styles/Dashboard.module.sass";
import { XLg, CheckLg, Trash } from "react-bootstrap-icons";

function MediaForm({
  assetType,
  assetId,
  initialContent,
  saveEdit,
  setIsEditing,
  deleteAsset,
  // Only needed for adding new assets
  setAllAssets,
  setOpenPopUp,
  setOpenMediaForm,
  boardId,
  userId,
}) {
  const [newAssetContent, setNewAssetContent] = useState(initialContent || "");
  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  useEffect(() => {
    setNewAssetContent(initialContent || "");
  }, [initialContent]);

  const validateContent = (content) => {
    if (!content.trim()) {
      return false;
    } else if (assetType === "youtubeURL") {
      const youtubeUrlRegex =
        /^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+$/;
      return youtubeUrlRegex.test(content);
    } else return true;
  };

  const handleUploadFile = async (file) => {
    try {
      setLoading(true);
      const fileUrl = await uploadService.uploadFile(file);
      setNewAssetContent(fileUrl);
      setLoading(false);
      return fileUrl;
    } catch (error) {
      console.error("Error uploading file:", error);
      setLoading(false);
    }
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      handleUploadFile(file);
    }
  };

  const handleSave = () => {
    if (saveEdit) {
      saveEdit(newAssetContent);
    } else {
      addNewAsset();
    }
  };

  const addNewAsset = async () => {
    try {
      const newAsset = {
        type: assetType,
        content: newAssetContent,
        userId: userId,
        boardId: boardId,
      };

      if (!boardId) {
        console.log("there is no board id, new board will be created");
        const boardResp = await boardsService.post({ userId });
        const newBoardId = boardResp.data._id;
        console.log("New board created, this id:", newBoardId);
        const assetResp = await assetsService.post({
          ...newAsset,
          boardId: newBoardId,
        });
        const createdAsset = assetResp.data;
        setAllAssets((prevAssets) => [...prevAssets, createdAsset]);
      } else {
        const response = await assetsService.post(newAsset);
        const createdAsset = response.data;
        setAllAssets((prevAssets) => [...prevAssets, createdAsset]);
      }

      setNewAssetContent("");
      setOpenPopUp(false);
      setOpenMediaForm(false);
    } catch (error) {
      console.error("Error adding asset:", error);
    }
  };

  return (
    <div className={dashboardStyles.dashboard_mediaForm_inputs}>
      {assetType === "text" && (
        <textarea
          type="text"
          placeholder="What's on your mind today?"
          onChange={(e) => {
            setNewAssetContent(e.target.value);
            setTouched(true);
          }}
          value={newAssetContent}
          className={dashboardStyles.editButtons_input}
        />
      )}
      {assetType === "image" && (
        <input
          type="file"
          accept="image/*"
          onChange={handleFileChange}
          className={dashboardStyles.editButtons_input}
        />
      )}
      {assetType === "youtubeURL" && (
        <input
          type="text"
          onChange={(e) => {
            setNewAssetContent(e.target.value);
            setTouched(true);
          }}
          value={newAssetContent}
          placeholder="Paste Youtube URL here"
          className={dashboardStyles.editButtons_input}
        />
      )}
      {assetType === "camImage" && (
        <WebcamCapture
          handleUploadFile={handleUploadFile}
          loading={loading}
          setLoading={setLoading}
        />
      )}
      {assetType === "audio" && (
        <AudioCapture
          handleUploadFile={handleUploadFile}
          setLoading={setLoading}
        />
      )}
      {loading ? (
        <img
          src={loadingGif}
          alt="Loading..."
          style={{ width: "30px", height: "30px" }}
        />
      ) : (
        <div>
          <button
            onClick={handleSave}
            disabled={!validateContent(newAssetContent)}
            className={dashboardStyles.editButtons_button}
          >
            <CheckLg size="20" />
          </button>
          <button
            onClick={() => setIsEditing(false)}
            className={dashboardStyles.editButtons_button}
          >
            <XLg />
          </button>
          <button
            onClick={() => deleteAsset(assetId)}
            className={dashboardStyles.editButtons_button}
          >
            <Trash />
          </button>
          {touched && !validateContent(newAssetContent) && (
            <p>Invalid content</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MediaForm;
