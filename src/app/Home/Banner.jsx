"use client";
import { BannerImg } from "@/components/assets/icons/icon";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const Banner = () => {
  const { t } = useTranslation();
  return (
    <>
      <section className="bg-5 h-[30rem]">
        <Container className="h-100">
          <div className="max-w-[1540px] h-[100%] grid mx-auto lg:px-[7rem]">
            <div className="flex">
              <div className="w-2/4 max-md:w-[100%] flex justify-center items-center">
                <section className="flex items-center justify-center px-[10px]">
                  <div>
                    <h4 className="bebas-regular-font max-w-[30rem] text-[3rem]  capitalize color-1 text-left leading-[3.5rem]">
                      {t("bannerHead")}
                    </h4>
                    <p className="color-4 mt-3 max-w-[30rem]  text-[1rem] medium-font">
                      {t("bannersbHead")}
                    </p>
                    <Link
                      href={"/servicess"}
                      className="rounded-[10px] mt-3 text-[1.1rem] gap-2 flex items-center cursor-pointer primary-bg py-[10px] px-[20px] text-white text-center w-fit medium-font"
                    >
                      {t("getStarted")}
                      <IoArrowForwardCircleOutline />
                    </Link>
                  </div>
                </section>
              </div>
              <div className="w-2/4 max-md:hidden">
                <Image
                  src={BannerImg}
                  className="object-contain h-[30rem] w-[100%]"
                  alt=""
                />
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  );
};

export default Banner;
