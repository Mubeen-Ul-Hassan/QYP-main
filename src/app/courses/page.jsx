/* eslint-disable react/no-unescaped-entities */
"use client";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { BsPatchCheck } from "react-icons/bs";
import {
  FaTools,
  FaHandsHelping,
  FaBriefcase,
  FaCertificate,
  FaRegFileAlt,
  FaHammer,
  FaLevelUpAlt,
  FaCut,
  FaDrill,
  FaToolbox,
  FaWrench,
} from "react-icons/fa";

import { HiBadgeCheck } from "react-icons/hi";
import { RiPaintBrushLine } from "react-icons/ri";
import { GiShinyStone, GiAirplaneArrival } from "react-icons/gi";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { EducationImg } from "@/components/assets/icons/icon";
import { useTranslation } from "react-i18next";
const Page = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const programData = [
    {
      id: 1,
      title: "Comprehensive Training",
      description:
        "Learn from industry experts through detailed modules covering everything from concrete grinding to epoxy removal.",
      icon: <FaTools />, // Example icon
    },
    {
      id: 2,
      title: "Hands-On Experience",
      description:
        "Get practical experience with cutting-edge tools and techniques used in real-world projects.",
      icon: <FaHandsHelping />, // Example icon
    },
    {
      id: 3,
      title: "Career Opportunities",
      description:
        "Upon completing the program, stand out with an opportunity to intern with QYp, gaining invaluable field experience.",
      icon: <FaBriefcase />, // Example icon
    },
    {
      id: 4,
      title: "Certification",
      description:
        "Earn a professional certification that validates your expertise and boosts your career prospects.",
      icon: <HiBadgeCheck />, // Example icon
    },
  ];

  const program = [
    {
      id: 1,
      title: "Concrete Grinding",
      description:
        "Master surface preparation techniques to achieve smooth and level finishes.",
    },
    {
      id: 2,
      title: "Surface Leveling",
      description:
        "Learn how to restore uneven or sloped concrete surfaces to perfection.",
    },
    {
      id: 3,
      title: "Diamond Concrete Cutting",
      description:
        "Gain expertise in precise, dust-free cutting for various applications.",
    },
    {
      id: 4,
      title: "Diamond Core Drilling",
      description:
        "Discover how to create smooth, accurate holes in tough materials.",
    },
    {
      id: 5,
      title: "Concrete Chipping",
      description:
        "Learn how to remove damaged or excess concrete efficiently.",
    },
    {
      id: 6,
      title: "Concrete Patching",
      description:
        "Perfect your skills in repairing cracks and holes for a seamless finish.",
    },
    {
      id: 7,
      title: "Paint/Epoxy Removal",
      description:
        "Explore advanced techniques for stripping coatings without damaging surfaces.",
    },
    {
      id: 8,
      title: "Concrete Polishing",
      description:
        "Achieve sleek, polished finishes that enhance durability and aesthetics.",
    },
    {
      id: 9,
      title: "Indoor Air Sealing",
      description:
        "Understand sealing techniques to improve energy efficiency and comfort.",
    },
  ];

  const programHighlights = [
    {
      id: 1,
      title: t("duration0"),
      description: t("durationdes0"),
    },
    {
      id: 2,
      title: t("eligibility"),
      description: t("eligibilityDes"),
    },
    {
      id: 3,
      title: t("locationtet"),
      description: t("locationtetDes"),
    },
    {
      id: 4,
      title: t("internshp0"),
      description: t("internshp0Des"),
    },
  ];

  //   handle navigate
  const handleForm = (item) => {
    // Ensure you pass the item title in the URL
    router.push(`courcesForm?title=${item?.title}`);
  };
  return (
    <>
      <BreadCrumbs breadName={"Courses"} />
      <Container fluid="xxl" className="mb-5 relative">
        <Row>
          <Col xs={12} sm={12} md={6} lg={6} xl={6}>
            <h4 className="semiBold-font color-1 text-[1.2rem]">
              {t("learnHead0")}
            </h4>
            <p className="regular-font color-4 mt-2">{t("learnsbHead0")}</p>
          </Col>
          <Col
            className="flex justify-center align-center"
            xs={12}
            sm={12}
            md={6}
            lg={6}
            xl={6}
          >
            <Image src={EducationImg} alt={EducationImg} />
          </Col>
        </Row>
        <section className="mt-5">
          <h5 className="text-center bold-font text-[1.2rem]">
            {t("joinHead0")}
          </h5>
          <h5 className="text-center mt-2 color-4 regular-font">
            {t("joinsbHead0")}
          </h5>

          <Row className="g-3 mt-5">
            {programData?.map((item, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
                <section className="shadowC cursor-pointer h-100 rounded-[10px] py-[13px] px-[15px] transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="border_8 rounded-[10px] m-auto mb-3 w-fit py-[10px] px-[10px]">
                    <span className="color-1 text-[2rem]">{item?.icon}</span>
                  </div>
                  <h4 className="semiBold-font color-1 text-[1.2rem] text-center">
                    {item?.title}
                  </h4>
                  <h4 className="regular-font text-[0.8rem] color-4 mt-2">
                    {item?.description}
                  </h4>
                </section>
              </Col>
            ))}
          </Row>
        </section>
        <section className="mt-5">
          <h5 className="text-center bold-font text-[1.2rem]">
            {t("courceHead0")}
          </h5>
          <h5 className="text-center mt-2 color-4 regular-font">
            {t("courcesbHead0")}
          </h5>

          <Row className="g-4 mt-5">
            {program?.map((item, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
                <section className="shadowC cursor-pointer h-100 rounded-[10px] py-[13px] px-[15px] transform transition-transform duration-500 hover:scale-105 hover:shadow-xl hover:-translate-y-3 hover:bg-gradient-to-t">
                  <h4 className="semiBold-font color-1 text-[1.2rem] text-center">
                    {item?.title}
                  </h4>
                  <h4 className="regular-font text-[0.8rem] color-4 mt-2">
                    {item?.description}
                  </h4>
                  <div
                    onClick={(e) => {
                      e.stopPropagation();
                      handleForm(item);
                    }}
                    className="primary-bg mt-3 text-white text-center regular-font rounded-[6px] py-[5px] text-[1rem]"
                  >
                    {t("applytext")}
                  </div>
                </section>
              </Col>
            ))}
          </Row>
        </section>
        <section className="mt-5">
          <h5 className="bold-font text-[1.2rem]"> {t("programtext0")}</h5>
          <ul className="mt-3">
            {programHighlights?.map((item, index) => (
              <div key={index} className="flex items-baseline mb-2 gap-2">
                <h4 className="semiBold-font color-0">{item?.title}</h4>:
                <li className="color-4 regular-font text-[0.9rem]">
                  {item?.description}
                </li>
              </div>
            ))}
          </ul>
        </section>
        <section className="mt-5">
          <h5 className="bold-font text-[1.2rem]">{t("futuretet")}</h5>
          <p className="color-4 regular-font text-[0.9rem]">
            {t("futuretetDes")}
          </p>
        </section>
        {/* apply section */}
      </Container>
    </>
  );
};

export default Page;
