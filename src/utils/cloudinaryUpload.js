import { postData } from "./api/genericAPI";

export const uploadImageToCloudinary = async (imgFile) => {
  const cloudName = "dscbgjlw3";
  const unsignedUploadPreset = "browser_uploads";
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const data = new FormData();

  data.append("file", imgFile);
  data.append("upload_preset", unsignedUploadPreset);

  try {
    const response = await postData(url, data);
    return response;
  } catch (err) {
    return err.response;
  }
};
