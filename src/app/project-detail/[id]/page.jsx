/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import { selectblog } from "@/components/Redux/Slices/blogSlice";
import debounce from "debounce";
import { Autoplay, Navigation, Zoom } from "swiper";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css/zoom";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import ImageLightbox from "react-image-lightbox";
import "react-image-lightbox/style.css";
import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { message, Skeleton } from "antd";
import { selectService } from "@/components/Redux/Slices/serviceSlice";
import { useTranslation } from "react-i18next";
const page = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { projectGetbyID } = ApiFile;
  const { getData, header1 } = useApiClient();
  const [data, setData] = useState("");
  const serviceGet = useSelector(selectService);
  const [isLoading, setIsLoading] = useState([]);

  const [isOpen, setIsOpen] = useState(false);
  const [photoIndex, setPhotoIndex] = useState(0);

  const handleImageClick = (image) => {
    setSelectedImage(image);
    setIsOpen(true);
  };

  const HandleBlog = debounce(() => {
    setIsLoading(true);
    const api = `${projectGetbyID}/${id}`;
    getData(api, header1)
      .then((res) => {
        if (res?.success) {
          setData(res?.project);
        } else {
          message.error("No More projects Found");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        setIsLoading(false);
      });
  }, 300);

  useEffect(() => {
    if (!serviceGet?.title) {
      HandleBlog();
    }
  }, [serviceGet]);

  useEffect(() => {
    if (serviceGet) {
      setData(serviceGet);
    }
  }, [serviceGet]);

  return (
    <>
      <BreadCrumbs breadName={t("projectDEtail")} />

      <Container className="mb-5" fluid="xxl">
        {isLoading ? (
          <>
            <div>
              <Skeleton />
            </div>
          </>
        ) : (
          <>
            <div className="p-6 bg-gray-100 rounded-2xl shadow-lg space-y-6">
              <h1 className="text-[2rem] w-100 semiBold-font mb-3 text-center capitalize">
                {data?.title}
              </h1>
              <Swiper
                spaceBetween={10}
                navigation
                autoplay={{ delay: 4000 }}
                modules={[Autoplay, Navigation, Zoom]}
                className="w-full max-w-lg customSlide00"
                zoom={true}
              >
                {data?.images?.map((image, index) => (
                  <SwiperSlide key={index}>
                    <div className="swiper-zoom-container">
                      <img
                        src={image}
                        className="h-[25rem] rounded-[10px] w-full object-contain cursor-pointer"
                        alt={`slide-${index}`}
                        onClick={() => {
                          setPhotoIndex(index);
                          setIsOpen(true);
                        }}
                      />
                    </div>
                  </SwiperSlide>
                ))}
              </Swiper>

              {isOpen && (
                <ImageLightbox
                  mainSrc={data?.images[photoIndex]}
                  nextSrc={data?.images[(photoIndex + 1) % data.images.length]}
                  prevSrc={
                    data?.images[
                      (photoIndex + data.images.length - 1) % data.images.length
                    ]
                  }
                  onCloseRequest={() => setIsOpen(false)}
                  onMovePrevRequest={() =>
                    setPhotoIndex(
                      (photoIndex + data.images.length - 1) % data.images.length
                    )
                  }
                  onMoveNextRequest={() =>
                    setPhotoIndex((photoIndex + 1) % data.images.length)
                  }
                />
              )}

              <section className="mt-6">
                {/* Description Section */}
                <div className="mb-5">
                  <h4 className="text-[1.8rem] font-semibold mb-4 text-gray-800">
                    Description
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-700 text-[1rem] leading-relaxed">
                      {data?.description ||
                        "No description available for this project."}
                    </p>
                  </div>
                </div>

                {/* Short Description Section */}
                <div>
                  <h4 className="text-[1.8rem] font-semibold mb-4 text-gray-800">
                    Short Description
                  </h4>
                  <div className="bg-gray-50 p-4 rounded-lg shadow-sm">
                    <p className="text-gray-700 text-[1rem] leading-relaxed">
                      {data?.short_description ||
                        "No short description available for this project."}
                    </p>
                  </div>
                </div>
              </section>
            </div>
          </>
        )}
      </Container>
    </>
  );
};

export default page;
