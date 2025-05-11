/* eslint-disable react/no-unescaped-entities */
"use client";
import {
  aboutimg,
  Demoimg1,
  Demoimg2,
  Demoimg3,
  Demoimg4,
  Font1,
  Font2,
  Font3,
  HomeAboutImg,
  HomeImg,
  LeftGradient,
  RightGradient,
  TitleIcon,
} from "@/components/assets/icons/icon";
import Image from "next/image";
import React, { useRef } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsArrowLeft, BsArrowRight } from "react-icons/bs";
import Slider from "react-slick";
import { FaQuoteRight } from "react-icons/fa6";
import Link from "next/link";
import Blog from "@/components/Blog/Blog";
import ProjectPage from "../project-page/projectPage";
import { useTranslation } from "react-i18next";
import { BiSolidRightArrow } from "react-icons/bi";

const Page = () => {
  const { t } = useTranslation();
  const honestDAta = [
    {
      price: "350+",
      service: "Service providers",
    },
    {
      price: "246+",
      service: "Orders served",
    },
    {
      price: "400+",
      service: "5 stars received",
    },
    {
      price: "367+",
      service: "friendly shop",
    },
  ];

  const sliderRef = useRef(null);

  // Array of creative services
  const services = [
    {
      id: 1,
      name: "Johan Martin",
      image: Demoimg1,
      jobStatus: "CEO Founder",
      description:
        "Suspendisse potenti. Suspendisse potenti. Phasellussedan arcu. Donec commodo lobortis purus quis dictum. Sedijabui aliquamtinl ante tortor, vel dapibus mi temporsit amet. andi pretium.",
    },
    {
      id: 2,
      name: "Angel Kolenia",
      image: Demoimg2,
      jobStatus: "CEO Founder",
      description:
        "Fusce congue nibh nec ligula accumsan, sed consectetur tellus placerat. Curabitur gravida velit at tristique imperdiet. In pellentesque orci metus, eucongue sapien commodo eget.",
    },
    {
      id: 3,
      name: "Dorjonia Koken",
      image: Demoimg3,
      jobStatus: "Founder",

      description:
        " Maecenas dignissim posuere velit nec scelerisque. Crasvel volutpat augue, sit amet commodo ipsum. Nuncultricies sit amet massa mattis porttitor Mauris purusunc ultricies enim.",
    },
    {
      id: 4,
      name: "Rabhber",
      image: Demoimg4,
      jobStatus: "CEO Founder",
      description:
        "Fusce congue nibh nec ligula accumsan, sed consectetur tellus placerat. Curabitur gravida velit at tristique imperdiet. In pellentesque orci metus, eucongue sapien commodo eget.",
    },
    {
      id: 5,
      name: "Jhon ",
      image: Demoimg2,
      jobStatus: "Founder",
      description:
        "Fusce congue nibh nec ligula accumsan, sed consectetur tellus placerat. Curabitur gravida velit at tristique imperdiet. In pellentesque orci metus, eucongue sapien commodo eget.",
    },
  ];

  const settings = {
    dots: false,
    infinite: false,
    speed: 500,
    slidesToShow: 3,
    slidesToScroll: 1,
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

  return (
    <>
      <Container fluid="xxl" className="mt-[5rem] mb-[4rem]">
        <section className="mb-5 mt-5">
          <div className=" h-[100%] grid">
            <div className="flex">
              <div className="w-2/4 max-md:hidden border-2 border-black p-5">
                <Image
                  src={HomeAboutImg}
                  className="object-contain h-[38rem]"
                  alt=""
                />
              </div>
              <div className="w-2/4 max-md:w-[100%]">
                <section className=" px-[40px]">
                  <div className="relative border-2 border-black">
                    <Image
                      className="h-[5rem] w-[24rem]"
                      src={aboutimg}
                      alt=""
                    />
                    <h5 className="absolute inset-0 uppercase left-[2.5rem] flex items-center w-fit justify-center color-1 regular-font text-[1.2rem]">
                      {t("aboutUsPageTitle")}
                    </h5>
                  </div>
                  <h4 className="color-1 bold-font text-[2rem] mt-2">
                    {t("aboutUsPageHead")}
                  </h4>
                  <p className="regular-font color-4 text-[0.8rem] mt-2 mb-3 leading-6">
                    {t("aboutUsPageDes1")}
                  </p>
                  <p className="regular-font color-4 text-[0.8rem] mb-3 leading-6">
                    {t("aboutUsPageDes2")}
                  </p>
                  <p className="regular-font color-4 text-[0.8rem] mb-3 leading-6">
                    {t("aboutUsPageDes3")}
                  </p>
                  <div className="flex flex-wrap gap-6 mt-3">
                    <div className="flex gap-4 items-center">
                      <BiSolidRightArrow className="color-4 text-[1.2rem]" />
                      <h4 className="color-1 text-[1.2rem] semiBold-font">
                        {t("aboutUsKey1")}
                      </h4>
                    </div>
                    <div className="flex gap-4 items-center">
                      <BiSolidRightArrow className="color-4 text-[1.2rem]" />
                      <h4 className="color-1 text-[1.2rem] semiBold-font">
                        {t("aboutUsKey2")}
                      </h4>
                    </div>
                    <div className="flex gap-4 items-center">
                      <BiSolidRightArrow className="color-4 text-[1.2rem]" />
                      <h4 className="color-1 text-[1.2rem] semiBold-font">
                        {t("aboutUsKey3")}
                      </h4>
                    </div>
                    <div className="flex gap-4 items-center">
                      <BiSolidRightArrow className="color-4 text-[1.2rem]" />
                      <h4 className="color-1 text-[1.2rem] semiBold-font">
                        {t("aboutUsKey4")}
                      </h4>
                    </div>
                  </div>
                </section>
              </div>
            </div>
          </div>
        </section>

        {/* Be honest section start */}
        {/* <div className="flex mb-4">
          <div className="flex flex-col relative">
            <h5 className="primary-color text-[1rem] semiBold-font mb-2">
              Be honest
            </h5>
            <h5 className="bebas-regular-font text-[1.7rem] mt-2 color-0">
              Trust agency
            </h5>
          </div>
        </div> */}

        {/*  */}
        {/* <Row className="g-4">
          {honestDAta?.map((item, index) => (
            <Col xs={12} sm={6} md={4} lg={4} xl={3} key={index}>
              <div className="shadow3 rounded-[10px] px-[15px] w-100 h-[100%] text-center cursor-pointer  py-[40px] w-fit">
                <h4 className="primary-color bebas-regular-font text-[1.8rem]">
                  {item?.price}
                </h4>
                <h5 className="color-0 text-[1.3rem] bebas-regular-font mt-2">
                  {item?.service}
                </h5>
              </div>
            </Col>
          ))}
        </Row> */}

        {/* testimonial section start */}

        {/* project page start */}

        <ProjectPage />
      </Container>
      {/* <section className="sec-bg mb-5 py-[4rem]">
        <Container fluid="xxl">
          <div className="flex mb-4 justify-center">
            <div className="flex flex-col relative items-center">
              <h5 className="bebas-regular-font text-[1.7rem] mt-2 color-0">
                our Client Say About Us
              </h5>
            </div>
          </div>
          <section className="relative">
            <div className="flex absolute bottom-[-3rem] right-[50%] space-x-3">
              <button
                className=" iconDiv00 primary-bg p-2 cursor-pointer text-white"
                onClick={() => sliderRef.current.slickPrev()}
              >
                <BsArrowLeft />
              </button>
              <button
                className=" iconDiv00 p-2 cursor-pointer primary-bg text-white"
                onClick={() => sliderRef.current.slickNext()}
              >
                <BsArrowRight />
              </button>
            </div>
            <Slider className="sliderCus" ref={sliderRef} {...settings}>
              {services.map((service, index) => (
                <section key={index}>
                  <div className="bg-white rounded-[10px] h-[100%] px-[10px] py-[20px] mr-[10px]">
                    <div className="flex justify-between">
                      <div className="flex gap-2 items-center">
                        <div className="relative flex items-center">
                          <Image
                            className="h-[60px] w-[60px] rounded-[6px]"
                            src={service?.image}
                            alt=""
                          />
                          <div className="text-white ml-[-15px] rounded-[50%] primary-bg w-[30px] h-[30px] flex items-center justify-center">
                            <FaQuoteLeft />
                          </div>
                        </div>
                        <div>
                          <h4 className="color-0 text-[1rem] bold-font">
                            {service?.name}
                          </h4>
                          <h4 className="color-7 text-[0.6rem] mt-2 regular-font">
                            {service?.jobStatus}
                          </h4>
                        </div>
                      </div>
                      <div className="color-21 text-[2rem]">
                        <FaQuoteRight />
                      </div>
                    </div>
                    <p className="color-4 medium-font mt-2 text-[0.8rem]">
                      {service?.description}
                    </p>
                  </div>
                </section>
              ))}
            </Slider>
          </section>
        </Container>
      </section> */}
      {/* choose us section start */}
    </>
  );
};

export default Page;
