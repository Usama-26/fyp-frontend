import { postData } from "./api/genericAPI";

export const uploadFilesToCloudinary = async (files) => {
  const cloudName = "dscbgjlw3";
  const unsignedUploadPreset = "browser_uploads";
  const url = `https://api.cloudinary.com/v1_1/${cloudName}/upload`;

  const data = new FormData();

  // files.forEach((file, index) => {
  // });
  data.append(`${files.name}`, files);

  data.append("upload_preset", unsignedUploadPreset);

  try {
    const response = await postData(url, data);
    return response;
  } catch (err) {
    return err.response;
  }
};
