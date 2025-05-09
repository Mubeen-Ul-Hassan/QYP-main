/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import {
  ConcretePolishing,
  CuttingIcon,
  Demoimg1,
  Demoimg2,
  Demoimg3,
  Demoimg4,
  FloorGrinding,
  Grinding,
  GrindingIcon,
  HomeBg,
  serviceimg,
  SpikingIcon,
} from "@/components/assets/icons/icon";
import debounce from "debounce";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import {
  FaArrowLeft,
  FaArrowRight,
  FaQuoteLeft,
  FaQuoteRight,
} from "react-icons/fa";
import { message, Skeleton } from "antd";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";

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
        className={className}
        style={{ ...style, display: "block", bottom: "7rem", zIndex: 1 }}
        onClick={onClick}
      >
        <FaArrowLeft /> {/* Left arrow icon */}
      </button>
    );
  };

  // Custom next button component
  const NextArrow = (props) => {
    const { className, style, onClick } = props;
    return (
      <button
        type="button"
        className={className}
        style={{ ...style, display: "block", bottom: "7rem", zIndex: 1 }}
        onClick={onClick}
      >
        <FaArrowRight /> {/* Right arrow icon */}
      </button>
    );
  };

  const settings = {
    dots: false,
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

  return (
    <>
      {isLoading ? (
        <>
          <Skeleton />
        </>
      ) : (
        <>
          <Container fluid="xxl" className="mb-5 mt-5">
            <div className="flex items-center justify-center flex-col">
              <div className="relative">
                <Image className="h-[4rem] w-[24rem]" src={serviceimg} alt="" />
                <h5 className="absolute inset-0 uppercase flex items-center justify-center color-1 regular-font text-[1.2rem]">
                  {t("servicesTitle")}
                </h5>
              </div>
              <h4 className="color-1 bold-font text-[2rem] mt-2">
                {t("servicesHead")}
              </h4>
            </div>
          </Container>
          {serviceData?.length > 0 ? (
            <>
              <section className="bg-0 mb-5 py-[20px]">
                <Container fluid="xxl" className="mb-5 relative">
                  <section className="sec-bg mb-5 py-[4rem]">
                    <Container fluid="xxl">
                      <section className="relative slider-container">
                        <div className="underline">
                          <Link
                            href={"/servicess"}
                            className="mb-4 flex color-1 medium-font justify-end cursor-pointer"
                          >
                            {t("seeMore")}
                          </Link>
                        </div>
                        <Slider
                          className="sliderCus"
                          ref={sliderRef}
                          {...settings}
                        >
                          {serviceData?.length > 0 &&
                            serviceData?.map((item, index) => (
                              <div
                                onClick={(e) => {
                                  // handleServiceNavi();
                                  HanldeDetail(item);
                                  e.stopPropagation();
                                }}
                                key={index}
                              >
                                <div className="bg-white cursor-pointer h-100 mb-[4rem] mr-5 relative px-[2rem] py-[4rem] rounded-[10px] flex items-center justify-center flex-col">
                                  <img
                                    src={item?.image}
                                    className="h-[6rem] w-[6rem] mb-3 object-contain"
                                    alt=""
                                  />
                                  <h4 className="color-0 line-clamp-2 text-center w-100 capitalize mb-4 text-[1.3rem] bold-font border_6 pb-3">
                                    {item?.title}
                                  </h4>
                                  <h5 className="color-4 w-100 line-clamp-2 leading-9 text-center regular-font text-[1.2rem]">
                                    {item?.description}
                                  </h5>

                                  {/* <div
                                    onClick={(e) => {
                                      e.stopPropagation();
                                      HanldeDetail(item);
                                    }}
                                    className="primary-bg rounded-[10px] px-[35px] cursor-pointer absolute bottom-[-1.8rem] py-[17px] text-white medium-font"
                                  >
                                    {t("readMore")}
                                  </div> */}
                                </div>
                              </div>
                            ))}
                        </Slider>
                      </section>
                    </Container>
                  </section>

                  <div className="mt-[6rem] flex flex-col lg:flex-row items-center  gap-4">
                    <div className="flex flex-col">
                      <h4 className="bold-font color-1 text-[1.7rem]">
                        {t("homeServiceTitle")}
                      </h4>
                      <h5 className="color-4 text-[1rem] mt-2 regular-font">
                        {t("homeServiceDes")}
                      </h5>
                    </div>
                    <Link
                      href={"/servicess"}
                      className="primary-bg cursor-pointer rounded-[6px] py-[10px] px-[20px] text-[0.8rem] medium-font w-fit text-white"
                    >
                      {t("homeServicebtn")}
                    </Link>
                  </div>
                </Container>
              </section>
            </>
          ) : (
            ""
          )}
          <section className="mb-5">
            <div className="relative">
              <Image className="h-[25rem] w-[100%]" src={HomeBg} alt="" />
              <Link
                href={"/category-instruments/all"}
                className="absolute inset-0 flex flex-col gap-3 items-center justify-center"
              >
                <h4 className="medium-font max-w-[26rem] text-center capitalize text-white text-[2rem]">
                  {t("homeServicesbDes")}
                </h4>
                <div className="bg-white cursor-pointer rounded-[6px] px-[30px] py-[10px] color-1 medium-font text-[1.2rem]">
                  {t("getStarted")}
                </div>
              </Link>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default HomeService;
