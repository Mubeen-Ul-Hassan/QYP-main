"use client";
/* eslint-disable @next/next/no-img-element */
import Image from "next/image";
import React, { useState, useEffect } from "react";
import Skeleton from "react-loading-skeleton";

const ImageLoader = ({ imageUrl, classes, circeltrue = false, onClick }) => {
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const img = new Image();
    img.src = imageUrl;
    img.onload = () => setLoading(false);
  }, [imageUrl]);

  return (
    <div className={classes}>
      {loading ? (
        <>
          <Skeleton circle={circeltrue} className="skelton_main" />
        </>
      ) : (
        <Image
          src={imageUrl}
          alt={""}
          loading="lazy"
          className={classes}
          onClick={onClick && (() => onClick())}
        />
      )}
    </div>
  );
};

export default ImageLoader;
