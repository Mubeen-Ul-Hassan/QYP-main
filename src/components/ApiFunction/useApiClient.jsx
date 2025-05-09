/* eslint-disable no-unused-vars */
"use client"; // Ensures this is a client-side utility

import axios from "axios";
import { decryptData } from "./encrypted";
import { useSelector } from "react-redux";
import { selectUser } from "../Redux/Slices/AuthSlice";
import { SelectsignUpData } from "../Redux/Slices/SignUpData";
import { SelectOtherData } from "../Redux/Slices/otherData";

// Define your API functions in this file
const useApiClient = () => {
  // Use useSelector to fetch data from Redux
  const data = useSelector(selectUser);
  const userData = decryptData(data);
  const currentLanguage = useSelector((state) => state.language.language);

  const signUpData = useSelector(SelectsignUpData);

  const decrypData = decryptData(signUpData);

  const dataOther = useSelector(SelectOtherData);

  const decrypOtherData = decryptData(dataOther);

  const token = decrypData?.token || userData?.token;

  // API URLs and keys
  
  // const baseURL = "https://qyp-backend.onrender.com/";
  const baseURL = "https://api.qyp.fi/";
  const baseUrlImage = "";
  const GoogleApiKey = process.env.GoogleApiKey;

  // Define headers
  const header1 = {
    "Content-Type": "application/json",
    "x-auth-token": token,
    "Accept-Language": currentLanguage,
  };

  const header2 = {
    "Content-Type": "multipart/form-data",
    "x-auth-token": token,
    "Accept-Language": currentLanguage,
  };

  const header3 = { "Accept-Language": currentLanguage };

  // Create axios instance
  const axiosInstance = axios.create({
    baseURL,
  });

  // API Functions
  const getData = async (endpoint, headers = {}) => {
    try {
      const response = await axiosInstance.get(endpoint, {
        headers: {
          ...headers,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in GET request:", error);
      throw error;
    }
  };

  const postData = async (endpoint, apiData, headers = {}) => {
    try {
      const response = await axiosInstance.post(endpoint, apiData, {
        headers: {
          ...headers,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in POST request:", error);
      throw error;
    }
  };

  const deleteData = async (endpoint, headers = {}) => {
    try {
      const response = await axiosInstance.delete(endpoint, {
        headers: {
          ...headers,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in DELETE request:", error);
      throw error;
    }
  };

  const putData = async (endpoint, apiData, headers = {}) => {
    try {
      const response = await axiosInstance.put(endpoint, apiData, {
        headers: {
          ...headers,
        },
      });
      return response.data;
    } catch (error) {
      console.error("Error in PUT request:", error);
      throw error;
    }
  };

  return {
    getData,
    postData,
    deleteData,
    putData,
    header1,
    header2,
    header3,
    GoogleApiKey,
    userData,
    baseURL,
    baseUrlImage,
    data,
    signUpData,
    decrypOtherData,
  };
};

export default useApiClient;
