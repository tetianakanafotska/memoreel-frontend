import React, { useState } from "react";
import axios from "axios";
import loadingGif from "../assets/images/loading.gif"; // Corrected path
import fileUploadService from "../services/file-upload.service";

function MediaForm({ mediaType, setAllMedia, setOpenPopUp, setOpenMediaForm }) {
  const [newMedia, setNewMedia] = useState({
    _id: "",
    type: "",
    content: "",
  });

  const [imageUrl, setImageUrl] = useState("");
  const [loading, setLoading] = useState(false); // Add loading state///////////////////////////////////

  console.log(imageUrl, "setsState");
  const handleAddMedia = () => {
    setAllMedia((prevMedia) => [...prevMedia, newMedia]);
    setNewMedia({
      _id: "",
      type: "",
      content: "",
    });
    setOpenPopUp(false);
    setOpenMediaForm(false);
  };
  const handleOnChange = (e) => {
    setNewMedia({ _id: Date.now(), type: mediaType, content: e.target.value });
    console.log(newMedia);
  };
  const handleImageChange = (e) => {
    e.preventDefault();
    console.log(e.target.files[0]);
    // setImageUrl(e.target.value);
    // setImageUrl(e.target.files[0]);
    console.log(imageUrl);
    const uploadData = new FormData();

    // imageUrl => this name has to be the same as in the model since we pass
    // req.body to .create() method when creating a new movie in '/api/movies' POST route
    uploadData.append("imageUrl", e.target.files[0]);

    console.log(e.target.files[0]);
    console.log(uploadData, "uploaded data");
    setLoading(true); /////////////////////////////////////////////////////
    const fetchData = async () => {
      try {
        const response = await axios.post(
          "http://localhost:5005/boards/upload",
          uploadData
        );
        console.log(response.data.fileUrl);

        const fileUrl = response.data.fileUrl;
        setImageUrl(fileUrl);
        setNewMedia({
          _id: Date.now(),
          type: mediaType,
          content: fileUrl,
        });

        console.log(newMedia);
        setLoading(false); /////////////////////////////////////////////////////
      } catch (error) {
        console.log(error);
        setLoading(false); //
      }
    };
    fetchData();

    // axios
    //   .post("http://localhost:5005/boards/upload", uploadData)
    //   .then((response) => {
    //     // Update imageUrl state and chain setNewMedia with the promise returned by setImageUrl
    //     setImageUrl(response.data.fileUrl);
    //     setNewMedia({
    //       _id: Date.now(),
    //       type: mediaType,
    //       content: imageUrl,
    //     });
    //   })
    //   .catch((err) => console.log("Error while uploading the file: ", err));
  };

  return (
    <div>
      {mediaType === "text" && (
        <input type="text" onChange={handleOnChange} value={newMedia.content} />
      )}
      {mediaType === "image" && (
        <input type="file" onChange={(e) => handleImageChange(e)} />
      )}
      {mediaType === "videoURL" && (
        <input type="text" onChange={handleOnChange} value={newMedia.content} />
      )}
      {loading ? (
        <img
          src={loadingGif}
          alt="Loading..."
          style={{ width: "30px", height: "30px" }}
        /> ////////////////////////////////////////
      ) : (
        <button onClick={handleAddMedia}>Add</button>
      )}
    </div>
  );
}

export default MediaForm;
