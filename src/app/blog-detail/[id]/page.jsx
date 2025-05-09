/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import { selectblog } from "@/components/Redux/Slices/blogSlice";
import debounce from "debounce";
import { Autoplay, Navigation } from "swiper";
import { useParams } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

import React, { useEffect, useState } from "react";
import { Container } from "react-bootstrap";
import { useSelector } from "react-redux";
import { message, Skeleton } from "antd";
const page = () => {
  const { id } = useParams();
  const { blogGetById } = ApiFile;
  const { getData, header1 } = useApiClient();
  const [blogData, setBlogData] = useState("");
  const blogGet = useSelector(selectblog);
  const [isLoading, setIsLoading] = useState([]);

  const HandleBlog = debounce(() => {
    setIsLoading(true);
    const api = `${blogGetById}/${id}`;
    getData(api, header1)
      .then((res) => {
        if (res?.success) {
          setBlogData(res?.blog);
        } else {
          message.error("No More Blogs Found");
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
    if (!blogGet?.title) {
      HandleBlog();
    }
  }, [blogGet]);

  useEffect(() => {
    if (blogGet) {
      setBlogData(blogGet);
    }
  }, [blogGet]);

  return (
    <>
      <BreadCrumbs breadName={"Blog Detail"} />

      <Container className="mb-5" fluid="xxl">
        <h1 className="text-[2rem] semiBold-font mb-3 text-center capitalize">
          {blogData?.title}
        </h1>
        <Swiper
          spaceBetween={10}
          navigation
          autoplay={{ delay: 4000 }}
          modules={[Autoplay, Navigation]}
          className="w-full max-w-lg customSlide00"
        >
          {blogData?.images?.length > 0 &&
            blogData?.images?.map((image, index) => (
              <SwiperSlide key={index}>
                <div>
                  <img
                    src={image}
                    className="h-[25rem] rounded-[10px] w-100 object-contain"
                    alt={`slide-${index}`}
                  />
                </div>
              </SwiperSlide>
            ))}
        </Swiper>

        <section className="mt-4">
          <div className="mb-3">
            <h6
              dangerouslySetInnerHTML={{
                __html: blogData?.detail,
              }}
              className="color-4 text-[0.8rem] medium-font"
            ></h6>
          </div>
          <div className="mb-3">
            <h6 className="color-4 text-[0.8rem] medium-font">
              {blogData?.shortDescription}
            </h6>
          </div>
        </section>
      </Container>
    </>
  );
};

export default page;
