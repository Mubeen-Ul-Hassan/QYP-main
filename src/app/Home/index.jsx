"use client";
import React, { useState } from "react";
import Banner from "./Banner";
import { Col, Container, Row } from "react-bootstrap";
import { BsArrowRight } from "react-icons/bs";
import Image from "next/image";
import {
  AppleStoreIcon,
  company1,
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
const Page = () => {
  return (
    <>
      {/* home banner */}
      <Banner />

      {/* <HomeAbout /> */}

      <HomeService />
      <ByHere />
      <LatesProject />
      {/* <FAQ /> */}

      <Container fluid="xxl" className="mb-5">
        <Row className="g-3">
          <Col className="flex items-center justify-center" xs={6} sm={4} md={4} lg={3} xl={3}>
            <Image
              className="h-[7rem] w-[7rem] object-contain"
              src={company9}
              alt=""
            />
          </Col>

          <Col className="flex items-center justify-center" xs={6} sm={4} md={4} lg={3} xl={3}>
            <Image
              className="h-[7rem] w-[7rem] object-contain"
              src={company3}
              alt=""
            />
          </Col>
          <Col className="flex items-center justify-center" xs={6} sm={4} md={4} lg={3} xl={3}>
            <Image
              className="h-[7rem] w-[7rem] object-contain"
              src={company4}
              alt=""
            />
          </Col>
          <Col className="flex items-center justify-center" xs={6} sm={4} md={4} lg={3} xl={3}>
            <Image
              className="h-[7rem] w-[7rem] object-contain"
              src={company2}
              alt=""
            />
          </Col>
          <Col className="flex items-center justify-center" xs={6} sm={4} md={4} lg={3} xl={3}>
            <Image
              className="h-[7rem] w-[7rem] object-contain"
              src={company5}
              alt=""
            />
          </Col>
          <Col className="flex items-center justify-center" xs={6} sm={4} md={4} lg={3} xl={3}>
            <Image
              className="h-[7rem] w-[7rem] object-contain"
              src={company6}
              alt=""
            />
          </Col>
          <Col className="flex items-center justify-center" xs={6} sm={4} md={4} lg={3} xl={3}>
            <Image
              className="h-[7rem] w-[7rem] object-contain"
              src={company7}
              alt=""
            />
          </Col>
          <Col className="flex items-center justify-center" xs={6} sm={4} md={4} lg={3} xl={3}>
            <Image
              className="h-[7rem] w-[7rem] object-contain"
              src={company8}
              alt=""
            />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Page;
