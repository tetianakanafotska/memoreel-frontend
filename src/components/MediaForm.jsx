import React, { useState } from "react";

function MediaForm({ mediaType, setAllMedia, setOpenPopUp, setOpenMediaForm }) {
  const [newMedia, setNewMedia] = useState({
    _id: "",
    type: "",
    content: "",
  });
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
  };

  return (
    <div>
      {mediaType === "text" && (
        <input type="text" onChange={handleOnChange} value={newMedia.content} />
      )}
      {mediaType === "image" && <input type="file" />}
      {mediaType === "videoURL" && (
        <input type="text" onChange={handleOnChange} value={newMedia.content} />
      )}
      <button onClick={handleAddMedia}>Add</button>
    </div>
  );
}

export default MediaForm;
