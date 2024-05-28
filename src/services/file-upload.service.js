import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5005",
});

const uploadFile = async (file) => {
  try {
    const fileData = new FormData();
    // If the file is a string (URL), fetch it and convert to blob
    if (typeof file === "string") {
      const response = await fetch(file);
      const blob = await response.blob();
      fileData.append("file", blob, "webcam_image.jpg");
      // If the file is a blob, append it with a specific name
    } else if (file instanceof Blob) {
      fileData.append("file", file, "audio_recording.webm");
      // Otherwise, append the file as it is (uploaded file from input)
    } else {
      fileData.append("file", file);
    }
    console.log("filedata", fileData);

    const res = await api.post("/upload", fileData);
    return res.data.fileUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  uploadFile,
};
