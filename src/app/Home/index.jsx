"use client";
import React, { useState } from "react";
import Banner from "./Banner";
import { Col, Container, Row } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import {
  AppleStoreIcon,
  company2,
  company3,
  company4,
  company5,
  company6,
  company7,
  company8,
  company9,
  Demoimg1,
  Demoimg4,
  HomeImg,
  Phoneimg,
  PlayStoreIcon,
  TitleIcon,
} from "@/components/assets/icons/icon";
import HomeAbout from "./HomeAbout";
import HomeService from "./HomeService";
import ByHere from "./ByHere";
import LatesProject from "./LatesProject";
import FAQ from "./FAQ";
import Marquee from "react-fast-marquee";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();
  return (
    <>
      {/* home banner */}
      <Banner />

      {/* <HomeAbout /> */}

      <HomeService />
      <ByHere />
      <LatesProject />
      {/* <FAQ /> */}

      <div className="w-full flex items-center justify-center">
        <h1 className="text-[2rem] semiBold-font w-fit">{t("marqueeTitle")}</h1>
      </div>

      <Container>
        <Row>
          <Marquee
            gradient={true}
            autoFill={true}
            pauseOnHover
            className="flex justify-center items-center"
          >
            <Col className="px-4">
              <Image
                src={company2}
                width={200}
                height={60}
                alt="company 1"
              ></Image>
            </Col>
            <Col className="px-4">
              <Image
                src={company4}
                width={200}
                height={60}
                alt="company 2"
              ></Image>
            </Col>
            <Col className="px-4">
              <Image
                src={company3}
                width={200}
                height={60}
                alt="company 3"
              ></Image>
            </Col>
            <Col className="px-4">
              <Image
                src={company5}
                width={200}
                height={60}
                alt="company 4"
              ></Image>
            </Col>
            <Col className="px-4">
              <Image
                src={company6}
                width={200}
                height={60}
                alt="company 4"
              ></Image>
            </Col>
            <Col className="px-4">
              <Image
                src={company7}
                width={200}
                height={60}
                alt="company 4"
              ></Image>
            </Col>
            <Col className="px-4">
              <Image
                src={company8}
                width={200}
                height={60}
                alt="company 4"
              ></Image>
            </Col>
            <Col className="px-4">
              <Image
                src={company9}
                width={200}
                height={60}
                alt="company 4"
              ></Image>
            </Col>
          </Marquee>
        </Row>
      </Container>
    </>
  );
};

export default Page;
