"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import Slider from "react-slick";
import { message, Skeleton } from "antd";
import debounce from "debounce";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import { HomeBg, serviceimg } from "@/components/assets/icons/icon";

const HomeService = () => {
  const { t } = useTranslation();
  const { serviceGet } = ApiFile;
  const router = useRouter();
  const { getData, header1 } = useApiClient();
  const sliderRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [serviceData, setServiceData] = useState([]);

  const PreviousArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        type="button"
        className="absolute left-4 bottom-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-gray-100"
        onClick={onClick}
        aria-label="Previous slide"
      >
        <FaArrowLeft className="text-gray-700" />
      </button>
    );
  };

  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        type="button"
        className="absolute right-4 bottom-1/2 z-10 flex h-10 w-10 items-center justify-center rounded-full bg-white shadow-md transition-all hover:bg-gray-100"
        onClick={onClick}
        aria-label="Next slide"
      >
        <FaArrowRight className="text-gray-700" />
      </button>
    );
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
    prevArrow: <PreviousArrow />,
    nextArrow: <NextArrow />,
    responsive: [
      {
        breakpoint: 1200,
        settings: {
          slidesToShow: 2,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
        },
      },
    ],
  };

  const HandleService = debounce(() => {
    setIsLoading(true);
    const api = `${serviceGet}/1`;
    getData(api, header1)
      .then((res) => {
        if (res?.success && res?.services?.length > 0) {
          setServiceData(res?.services);
        } else {
          setServiceData([]);
          message.error("Services Not found");
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
      });
  }, 300);

  useEffect(() => {
    HandleService();
  }, []);

  const HanldeDetail = (item) => {
    router.push(`/service-detail/${item?._id}`);
  };

  const handleServiceNavi = () => {
    router.push(`/servicess`);
  };

  if (isLoading) {
    return (
      <div className="container mx-auto px-4 py-12">
        <Skeleton active paragraph={{ rows: 10 }} />
      </div>
    );
  }

  return (
    <div className="bg-white">
      {/* Services Header Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="text-center mb-12">
          <div className="relative inline-block mb-4">
            <Image
              className="h-16 w-96"
              src={serviceimg || "/placeholder.svg"}
              alt=""
            />
            <h5 className="absolute inset-0 flex items-center justify-center text-lg font-medium uppercase tracking-wide text-black">
              {t("servicesTitle")}
            </h5>
          </div>
          <h2 className="text-4xl font-bold text-black mb-4">
            {t("servicesHead")}
          </h2>
          <div className="w-24 h-1 bg-black mx-auto"></div>
        </div>
      </section>

      {/* Services Slider Section */}
      {serviceData?.length > 0 && (
        <section className="bg-gray-50 py-16">
          <div className="container mx-auto px-4">
            <div className="flex justify-end items-center mb-8">
              {/* <h3 className="text-xl font-bold text-gray-800">
                {t("Our Services")}
              </h3> */}
              <Link
                href="/servicess"
                className="text-black font-medium transition-colors flex items-center gap-2"
              >
                {t("seeMore")}
                <FaArrowRight className="text-sm" />
              </Link>
            </div>

            <div className="relative px-4">
              <Slider
                ref={sliderRef}
                {...settings}
                className="service-slider -mx-4"
              >
                {serviceData.map((item, index) => (
                  <div key={index} className="px-4">
                    <div
                      onClick={() => HanldeDetail(item)}
                      className="bg-white rounded-xl overflow-hidden shadow-md transition-all duration-300 h-80 cursor-pointer"
                    >
                      <div className="p-6 h-full flex flex-col">
                        <div className="mb-4 flex justify-center">
                          <div className="w-20 h-20 rounded-full bg-white flex items-center justify-center mb-2 transform group-hover:scale-110 transition-transform duration-300">
                            <img
                              src={item?.image || "/placeholder.svg"}
                              className="h-full w-full object-contain"
                              alt={item?.title || "Service"}
                            />
                          </div>
                        </div>

                        <h4 className="text-xl font-bold text-gray-800 text-center mb-1 capitalize  transition-colors">
                          {item?.title}
                        </h4>

                        {/* <div className="w-16 h-0.5 bg-black mx-auto mb-4"></div> */}

                        <p className="text-sm text-black text-center h-2 mb-2 line-clamp-3 flex-grow">
                          {item?.description}
                        </p>

                        <div className="mt-auto text-center">
                          <span className="inline-block px-4 py-2 rounded-lg bg-black text-white font-medium text-sm group-hover:bg-white group-hover:text-black transition-all duration-300">
                            {t("readMore")}
                          </span>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </Slider>
            </div>
          </div>
        </section>
      )}

      {/* Call to Action Section */}
      <section className="container mx-auto px-4 py-16">
        <div className="bg-white rounded-2xl shadow-lg p-8 flex flex-col lg:flex-row items-center justify-between gap-8">
          <div className="max-w-2xl">
            <h3 className="text-3xl font-bold text-gray-800 mb-4">
              {t("homeServiceTitle")}
            </h3>
            <p className="text-gray-600 text-lg mb-6">{t("homeServiceDes")}</p>
          </div>
          <Link
            href="/servicess"
            className="bg-black hover:bg-emerald-700 text-white font-medium py-3 px-8 rounded-lg transition-colors duration-300 whitespace-nowrap text-center"
          >
            {t("homeServicebtn")}
          </Link>
        </div>
      </section>

      {/* Banner Section */}
      <section className="relative mt-16 mb-16">
        <div className="relative h-[400px] w-full">
          <Image
            src={HomeBg || "/placeholder.svg"}
            alt="Services background"
            fill
            className="object-cover brightness-75"
          />
          <div className="absolute inset-0 bg-emerald-900/30"></div>
          <div className="absolute inset-0 flex flex-col items-center justify-center px-4">
            <h3 className="text-white text-3xl md:text-4xl font-bold text-center max-w-2xl mb-8">
              {t("homeServicesbDes")}
            </h3>
            <Link
              href="/category-instruments/all"
              className="bg-white hover:bg-gray-100 text-black font-medium py-3 px-8 rounded-lg transition-colors duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              {t("getStarted")}
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomeService;
