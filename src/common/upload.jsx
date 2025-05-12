import axios from "axios";

export const uploadImages = async (images) => {
  let imageUrls = [];

  try {
    const formData = new FormData();
    images.forEach((img) => {
      formData.append("images", img);
    });

    const { data } = await axios.post(
      import.meta.env.VITE_SERVER_DOMAIN + "/upload",
      formData,
      {
        headers: { "Content-Type": "multipart/form-data" },
      }
    );

    imageUrls = data.imageUrls;
  } catch (error) {
    console.error("Image Upload Error:", error);
  }

  return imageUrls;
};
