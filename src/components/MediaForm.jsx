import React, { useState } from "react";
import axios from "axios";
import loadingGif from "../assets/images/loading.gif";

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
  const [imageUrl, setImageUrl] = useState("");

  const handleAddAsset = async () => {
    try {
      if (!boardId) {
        const boardResp = await axios.post("http://localhost:5005/boards", {
          userId: userId,
        });
        console.log("A new board created with id:", boardResp.data._id);
        const newBoardId = boardResp.data._id;
        const assetResp = await axios.post("http://localhost:5005/assets", {
          ...newAsset,
          boardId: newBoardId,
        });

        const createdAsset = assetResp.data;
        setAllAssets((prevAssets) => [...prevAssets, createdAsset]);
      } else {
        const response = await axios.post(
          "http://localhost:5005/assets",
          newAsset
        );
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
      console.log("Error adding asset:", error);
    }
  };

  const handleOnChange = (e) => {
    setNewAsset((prevAsset) => ({
      ...prevAsset,
      content: e.target.value,
    }));
    console.log("this is what is added to the newAsset", {
      type: assetType,
      userId: userId,
      boardId: boardId,
      content: e.target.value,
    });
  };

  const handleImageChange = (e) => {
    e.preventDefault();
    const uploadData = new FormData();
    uploadData.append("imageUrl", e.target.files[0]);
    setLoading(true);
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5005/boards/upload",
          uploadData
        );
        console.log(response.data.fileUrl);
        const fileUrl = response.data.fileUrl;
        setImageUrl(fileUrl);
        setNewAsset((prevAsset) => ({ ...prevAsset, content: fileUrl }));
        setLoading(false);
      } catch (error) {
        console.log(error);
        setLoading(false);
      }
    };
    fetchData();
  };

  return (
    <div>
      {assetType === "text" && (
        <input type="text" onChange={handleOnChange} value={newAsset.content} />
      )}
      {assetType === "image" && (
        <input type="file" onChange={handleImageChange} />
      )}
      {assetType === "youtubeURL" && (
        <input type="text" onChange={handleOnChange} value={newAsset.content} />
      )}
      {loading ? (
        <img
          src={loadingGif}
          alt="Loading..."
          style={{ width: "30px", height: "30px" }}
        />
      ) : (
        <button onClick={handleAddAsset}>Add</button>
      )}
    </div>
  );
}

export default MediaForm;
