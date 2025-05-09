/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable no-unused-vars */
/* eslint-disable semi */
/* eslint-disable multiline-ternary */
/* eslint-disable comma-dangle */
/* eslint-disable prefer-template */
"use client";
import imageCompression from "browser-image-compression";
import toast from "react-hot-toast";

import ApiFile from "./ApiFile";
import useApiClient from "./useApiClient";

export const uploadFile = async (file, general = false) => {
  const { postData, header2 } = useApiClient();
  const { imageUpload, docUpload } = ApiFile;
  try {
    const check = isValidFileType(file);
    if (!check && !general) {
      toast.error(
        "!Invalid file type. Please upload a valid image file. you can only select the jpg, jpeg, png, svg"
      );
      return;
    }
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile = general
      ? file
      : await imageCompression(file, options);
    const formData = new FormData();
    formData.append("image", compressedFile);
    const response = await postData(imageUpload, formData, header2);

    return response;
  } catch (error) {
    console.error("Error uploading file:", error?.response);
    throw error;
  }
};
export const uploadDocFile = async (file) => {
  const { postData, header2 } = useApiClient();
  const { imageUpload, docUpload } = ApiFile;
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await postData(docUpload, formData, header2);

    return response;
  } catch (error) {
    console.error("Error uploading file:", error?.response);
    throw error;
  }
};
export const uploadVideo = async (file) => {
  const { postData, header2 } = useApiClient();
  const { imageUpload, docUpload } = ApiFile;
  try {
    const check = isValidFileType(file, ["mpeg", "avi", "mov", "mp4"]);
    if (!check) {
      toast.error(
        "!Invalid file type. Please upload a valid image file. you can only select the mpeg, avi, mov, mp4"
      );
      return;
    }
    const formData = new FormData();
    formData.append("video", file);
    const response = await postData("video/api", formData, header2);

    return response;
  } catch (error) {
    console.error("Error uploading file:", error?.response);
    throw error;
  }
};
export const uploadCertificate = async (file, token) => {
  const { postData, header2 } = useApiClient();
  const { imageUpload, docUpload } = ApiFile;
  try {
    const check = isValidFileType(file);
    if (!check) {
      toast.error(
        "!Invalid file type. Please upload a valid image file. you can only select the jpg, jpeg, png, svg"
      );
      return;
    }
    const options = {
      maxSizeMB: 1,
      maxWidthOrHeight: 1920,
      useWebWorker: true,
    };
    const compressedFile = await imageCompression(file, options);
    const formData = new FormData();
    formData.append("image", compressedFile);
    const response = await postData(docUpload, formData, header2);

    return response;
  } catch (error) {
    console.error("Error uploading file:", error?.response);
    throw error;
  }
};
