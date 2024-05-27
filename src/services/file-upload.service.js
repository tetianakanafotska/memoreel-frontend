import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5005",
});

const uploadImage = async (file) => {
  try {
    const imageData = new FormData();
    //if imgUrl === "string" - it is from webcam, otherwise uploaded file from input
    if (typeof file === "string") {
      const response = await fetch(file);
      const blob = await response.blob();
      imageData.append("file", blob, "webcam_image.jpg");
    } else {
      imageData.append("file", file);
    }
    const res = await api.post("/upload", imageData);
    return res.data.imgUrl;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  uploadImage,
};
