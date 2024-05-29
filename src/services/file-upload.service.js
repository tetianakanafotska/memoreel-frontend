import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.SERVER_URL || "http://localhost:5005",
});

const uploadFile = async (file) => {
  try {
    const fileData = new FormData();
    if (typeof file === "string") {
      const response = await fetch(file);
      const blob = await response.blob();
      fileData.append("file", blob, "webcam_image.jpg");
    } else if (file instanceof Blob) {
      fileData.append("file", file, "audio_recording.webm");
    } else {
      fileData.append("file", file);
    }
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
