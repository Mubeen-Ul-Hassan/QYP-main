"use client";
import { aboutimg, HomeAboutImg } from "@/components/assets/icons/icon";
import Image from "next/image";
import React from "react";
import { Container } from "react-bootstrap";
import { FaCheck } from "react-icons/fa";

const HomeAbout = () => {
  return (
    <>
      {/* <Container fluid="xxl" className="mb-5"> */}
      <section className="mb-5 mt-5">
        <div className=" h-[100%] grid">
          <div className="flex">
            <div className="w-2/4 max-md:hidden">
              <Image
                src={HomeAboutImg}
                className=" object-contain h-[30rem] w-[100%]"
                alt=""
              />
            </div>
            <div className="w-2/4 max-md:w-[100%]">
              <section className=" px-[40px]">
                <div className="relative">
                  <Image className="h-[5rem] w-[24rem]" src={aboutimg} alt="" />
                  <h5 className="absolute inset-0 uppercase left-[2.5rem] flex items-center w-fit justify-center color-1 regular-font text-[1.2rem]">
                    About our Company
                  </h5>
                </div>
                <h4 className="color-1 bold-font text-[2rem] mt-2">
                  Always dedicated and <br /> devoted
                </h4>
                <p className="regular-font color-4 text-[0.8rem] leading-6">
                  Slogan creation for your concrete company is crucial for the
                  overall branding. And branding in today’s world can’t be
                  ignored, We hope that the above Concrete Slogans. Don’t forget
                  to share it on social media and related building communities.
                </p>
                <div className="flex flex-wrap gap-6 mt-3">
                  <div className="flex gap-4 items-center">
                    <FaCheck className="color-4 text-[1.2rem]" />
                    <h4 className="color-1 text-[1.2rem] semiBold-font">
                      Excellent work
                    </h4>
                  </div>
                  <div className="flex gap-4 items-center">
                    <FaCheck className="color-4 text-[1.2rem]" />
                    <h4 className="color-1 text-[1.2rem] semiBold-font">
                    Modern & up to date
                    </h4>
                  </div>
                  <div className="flex gap-4 items-center">
                    <FaCheck className="color-4 text-[1.2rem]" />
                    <h4 className="color-1 text-[1.2rem] semiBold-font">
                    Grade #1 materials
                    </h4>
                  </div>
                  <div className="flex gap-4 items-center">
                    <FaCheck className="color-4 text-[1.2rem]" />
                    <h4 className="color-1 text-[1.2rem] semiBold-font">
                    Structures with long life
                    </h4>
                  </div>
                </div>
              </section>
            </div>
          </div>
        </div>
      </section>
      {/* </Container> */}
    </>
  );
};

export default HomeAbout;
