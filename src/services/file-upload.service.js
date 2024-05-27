import axios from "axios";

const cloudName = import.meta.env.VITE_CLOUDINARY_CLOUD_NAME;
const uploadPreset = import.meta.env.VITE_CLOUDINARY_UPLOAD_PRESET;

const uploadImage = async (imgUrl) => {
  try {
    const imageData = new FormData();
    if (typeof imgUrl === "string") {
      const response = await fetch(imgUrl);
      const blob = await response.blob();
      imageData.append("file", blob, "webcam_image.jpg");
    } else {
      imageData.append("file", imgUrl);
    }
    imageData.append("upload_preset", uploadPreset);
    const res = await axios.post(
      `https://api.cloudinary.com/v1_1/${cloudName}/image/upload`,
      imageData
    );
    return res.data;
  } catch (error) {
    console.error(error);
    throw error;
  }
};

export default {
  uploadImage,
};
