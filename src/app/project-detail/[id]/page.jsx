"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import { useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import debounce from "debounce";
import { message, Skeleton } from "antd";
import { Gallery, Item } from "react-photoswipe-gallery";
import "photoswipe/dist/photoswipe.css";

// Swiper imports
import { Swiper, SwiperSlide } from "swiper/react";
import { Autoplay, Navigation, Zoom } from "swiper";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/zoom";

// Local imports
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import { selectService } from "@/components/Redux/Slices/serviceSlice";

const ProjectDetailsPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const { projectGetbyID } = ApiFile;
  const { getData, header1 } = useApiClient();
  const [data, setData] = useState(null);
  const serviceGet = useSelector(selectService);
  const [isLoading, setIsLoading] = useState(false);

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

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8 max-w-6xl">
      <div className="bg-white overflow-hidden">
        <div className="p-6 md:p-8">
          {/* Gallery Section */}
          <div className="mb-10">
            <Gallery>
              <div className="grid grid-cols-2 gap-4">
                {/* Main Swiper Gallery */}
                <Swiper
                  spaceBetween={10}
                  navigation
                  autoplay={{ delay: 4000 }}
                  modules={[Autoplay, Navigation, Zoom]}
                  className="w-full rounded-lg mb-4"
                  zoom={true}
                >
                  {data?.images?.map((image, index) => (
                    <SwiperSlide key={index}>
                      <div className="swiper-zoom-container">
                        <Item
                          original={image}
                          thumbnail={image}
                          width={1200}
                          height={800}
                        >
                          {({ ref, open }) => (
                            <img
                              ref={ref}
                              onClick={open}
                              src={image || "/placeholder.svg"}
                              alt={`${data?.title || "Project"} - Image ${
                                index + 1
                              }`}
                              className="h-[400px] w-full object-contain cursor-pointer rounded-lg"
                            />
                          )}
                        </Item>
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Thumbnail Grid */}
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 gap-2 mt-2">
                  {data?.images?.map((image, index) => (
                    <Item
                      key={`thumb-${index}`}
                      original={image}
                      thumbnail={image}
                      width={1200}
                      height={800}
                    >
                      {({ ref, open }) => (
                        <div className="aspect-square overflow-hidden rounded-md border border-gray-200 hover:border-gray-400 transition-all cursor-pointer">
                          <img
                            ref={ref}
                            onClick={open}
                            src={image || "/placeholder.svg"}
                            alt={`Thumbnail ${index + 1}`}
                            className="h-full w-full object-cover"
                          />
                        </div>
                      )}
                    </Item>
                  ))}
                </div>
              </div>
            </Gallery>
          </div>

          {/* Project Title */}
          <div className="pb-2">
            <h1 className="text-3xl md:text-4xl font-bold text-black text-left capitalize">
              {data?.title || "Project Details"}
            </h1>
          </div>

          {/* Content Sections */}
          <div className="grid md:grid-cols-1 gap-8">
            {/* Short Description Section */}
            <div className="border-b-2 py-8 border-gray-300">
              <p className="text-gray-950 leading-relaxed">
                {data?.short_description ||
                  "No short description available for this project."}
              </p>
            </div>

            {/* Description Section */}
            <div className="">
              <h2 className="text-2xl font-bold mb-4 text-black">
                About the Project
              </h2>
              <p className="text-gray-950 leading-relaxed">
                {data?.description ||
                  "No description available for this project."}
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProjectDetailsPage;
