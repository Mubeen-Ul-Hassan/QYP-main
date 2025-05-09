/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import React, { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { Input } from "reactstrap";
import { useDispatch, useSelector } from "react-redux";
import { setLanguage } from "../Redux/Slices/languageSlice";

const Language = () => {
  const { i18n } = useTranslation();
  const dispatch = useDispatch();
  const userLanguage = useSelector((state) => state.language.language);

  const handleChangeLanguage = (lan) => {
    i18n.changeLanguage(lan);
    dispatch(setLanguage(lan));
    // window.location.reload()
  };

  useEffect(() => {
    handleChangeLanguage(userLanguage);
  }, [userLanguage]);

  return (
    <div className="d-flex gap-1 align-items-center max_w custom_control">
      <Input
        type="select"
        className="border-0"
        style={{ minWidth: "5.5rem" }}
        onChange={(e) => {
          handleChangeLanguage(e.target.value);
          window.location.reload();
        }}
        value={userLanguage}
      >
        <option
          value="fi"
          className={`p-1 text-dark ${userLanguage === "fi" && "active"}`}
        >
          Finnish
        </option>
        <option
          value="sv"
          className={`p-1 text-dark ${userLanguage === "sv" && "active"}`}
        >
          Swedish
        </option>
        <option
          value="en"
          className={`p-1 text-dark ${userLanguage === "en" && "active"}`}
        >
          English
        </option>
      </Input>
    </div>
  );
};

export default Language;
