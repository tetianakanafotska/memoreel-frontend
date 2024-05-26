import React, { useState, useRef } from "react";
import axios from "axios";
import loadingGif from "../assets/images/loading.gif";
import Webcam from "react-webcam";
import { Cloudinary } from "@cloudinary/url-gen";
import { Effect } from "@cloudinary/url-gen/actions/effect";

let cloudName = "ddhj0f2kr";
const cld = new Cloudinary({
  cloud: {
    cloudName,
  },
});
// function applyFilter(filter, image) {
//   // this will be used to apply filters
// }
// const filters = [
//   // strings representing a filter
// ];
function ImagePreviewer({ url, deleteImage }) {
  return url ? (
    <div className="img_box">
      <img src={url} alt="my_image" />
      <p>{url}</p>
      <button className="close_btn" onClick={deleteImage}>
        Delete
      </button>
    </div>
  ) : null;
}
// function FilterItem({ imgId, setPrevURL, filterName }) {
//   //this will be used to apply a filter
// }

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

  const constraints = {
    width: 500,
    height: 500,
    facingMode: "user",
    aspectRatio: 9 / 16,
  };
  const camRef = useRef();
  // const [loading, setLoading] = useState(false);
  const [id, setId] = useState("");
  const [prevURL, setPrevURL] = useState("");
  const captureAndUpload = async () => {
    // get screenshot

    const data = camRef.current.getScreenshot();
    console.log(camRef);
    // upload to cloudinary and get public_id
    try {
      setLoading(true);
      const imageData = new FormData();
      imageData.append("file", data);

      // Add your upload preset here
      imageData.append("upload_preset", "wxnflc5v");
      const res = await axios.post(
        ` https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
        imageData
      );
      const imageDetails = res.data;
      setId(imageDetails.public_id);
      setPrevURL(imageDetails.url);
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
    //set publicID
  };
  const deleteImage = () => {
    setPrevURL("");
    setId("");
  };
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
      {assetType === "selfie" && (
        <section className="main">
          <article className="media_box">
            <Webcam
              ref={camRef}
              videoConstraints={constraints}
              screenshotFormat="image/jpeg"
            />
            {/* this button will be used to capture the image*/}
            <button
              disabled={loading}
              onClick={captureAndUpload}
              className="capture_btn"
            >
              SNAP
            </button>
            <ImagePreviewer url={prevURL} deleteImage={deleteImage} />
          </article>
        </section>
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
