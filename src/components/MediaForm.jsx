import React, { useState } from "react";
import loadingGif from "../assets/images/loading.gif";
import uploadService from "../services/file-upload.service";
import WebcamCapture from "./WebcamCapture";
import assetsService from "../services/assets.service";
import boardsService from "../services/boards.service";

function MediaForm({
  assetType,
  setAllAssets,
  setOpenPopUp,
  setOpenMediaForm,
  boardId,
  userId,
}) {
  const [newAsset, setNewAsset] = useState({
    type: assetType,
    content: "",
    userId: userId,
    boardId: boardId,
  });

  const [loading, setLoading] = useState(false);
  const [touched, setTouched] = useState(false);

  const validateContent = (item) => {
    if (!item.trim()) {
      return false;
    } else if (assetType === "youtubeURL") {
      const youtubeUrlRegex =
        /^(http(s)??\:\/\/)?(www\.)?((youtube\.com\/watch\?v=)|(youtu.be\/))([a-zA-Z0-9\-_])+$/;
      return youtubeUrlRegex.test(item);
    } else return true;
  };

  const uploadImage = async (file) => {
    try {
      setLoading(true);
      const imageUrl = await uploadService.uploadImage(file);
      console.log("imageUrl", imageUrl);
      setNewAsset((prevAsset) => ({ ...prevAsset, content: imageUrl }));
      setLoading(false);
      return imageUrl;
    } catch (error) {
      console.error(error);
      setLoading(false);
    }
  };

  const handleAddAsset = async () => {
    try {
      if (!boardId) {
        const boardResp = await boardsService.post({
          userId: userId,
        });
        const newBoardId = boardResp.data._id;
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
      setNewAsset({
        type: "",
        content: "",
        userId: "",
        boardId: "",
      });
      setOpenPopUp(false);
      setOpenMediaForm(false);
    } catch (error) {
      console.error("Error adding asset:", error);
    }
  };

  const handleAddImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      uploadImage(file);
    }
  };

  const handleOnChange = (e) => {
    setNewAsset((prevAsset) => ({
      ...prevAsset,
      content: e.target.value,
    }));
    setTouched(true);
  };

  return (
    <div>
      {assetType === "text" && (
        <input type="text" onChange={handleOnChange} value={newAsset.content} />
      )}
      {assetType === "image" && (
        <input type="file" accept="image/*" onChange={handleAddImage} />
      )}
      {assetType === "youtubeURL" && (
        <input type="text" onChange={handleOnChange} value={newAsset.content} />
      )}
      {assetType === "camImage" && (
        <WebcamCapture
          uploadImage={uploadImage}
          loading={loading}
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
            onClick={handleAddAsset}
            disabled={!validateContent(newAsset.content)}
          >
            Add
          </button>
          <button onClick={() => setOpenMediaForm(false)}>Cancel</button>
          {touched && !validateContent(newAsset.content) && (
            <p>Invalid content</p>
          )}
        </div>
      )}
    </div>
  );
}

export default MediaForm;
