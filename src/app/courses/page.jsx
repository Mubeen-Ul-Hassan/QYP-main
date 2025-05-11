/* eslint-disable react/no-unescaped-entities */
"use client";
import React from "react";
import { Col, Container, Row } from "react-bootstrap";
import { motion } from "framer-motion";
import { VscTools } from "react-icons/vsc";
import { HiOutlineCheckBadge } from "react-icons/hi2";
import { useRouter } from "next/navigation";
import Image from "next/image";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { LiaHandsHelpingSolid } from "react-icons/lia";
import { LiaChalkboardTeacherSolid } from "react-icons/lia";
import { BsBriefcase } from "react-icons/bs";
const Page = () => {
  const { t } = useTranslation();
  const router = useRouter();
  const programData = [
    {
      id: 1,
      title: "Upskilling",
      description:
        "Learn from industry experts through detailed modules covering everything from concrete grinding to epoxy removal.",
      icon: <VscTools />, // Example icon
    },
    {
      id: 2,
      title: "Hands-On Experience",
      description:
        "Get practical experience with cutting-edge tools and techniques used in real-world projects.",
      icon: <LiaHandsHelpingSolid />, // Example icon
    },
    {
      id: 3,
      title: "Career Opportunities",
      description:
        "Upon completing the program, stand out with an opportunity to intern with QYp, gaining invaluable field experience.",
      icon: <BsBriefcase />, // Example icon
    },
    {
      id: 4,
      title: "Certification",
      description:
        "Earn a professional certification that validates your expertise and boosts your career prospects.",
      icon: <HiOutlineCheckBadge />, // Example icon
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
      title: "Concrete Cutting",
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative bg-gradient-to-r from-black to-gray-800 text-white py-24 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-100">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-cover bg-center"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-2xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t("learnHead0")}
            </motion.h1>
            <motion.p
              className="text-base md:text-xl opacity-90 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {t("learnsbHead0")}
            </motion.p>
          </div>
        </div>
      </motion.section>
      <Container fluid="xxl" className="mb-5 relative">
        <section className="mt-5">
          <h5 className="text-2xl md:text-4xl text-center bold-font">
            {t("joinHead0")}
          </h5>
          <h5 className="text-base md:text-xl text-center mt-2 color-4 regular-font">
            {t("joinsbHead0")}
          </h5>
          {/* Program Section */}
          <Row className="g-3 mt-5">
            {programData?.map((item, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
                <section className="shadow cursor-pointer h-72 rounded-[10px] py-[13px] px-[15px] transform transition-transform duration-300 hover:scale-105 hover:shadow-lg">
                  <div className="mx-auto my-4 w-fit py-[10px] px-[10px]">
                    <span className="color-1 text-[4rem]">{item?.icon}</span>
                  </div>
                  <h4 className="semiBold-font color-1 text-[1.2rem] text-center border-b border-gray-200 pb-3 mb-4">
                    {item?.title}
                  </h4>
                  <h4 className="regular-font text-[0.8rem] color-4 mt-2 text-gray-600 text-center mb-12">
                    {item?.description}
                  </h4>
                </section>
              </Col>
            ))}
          </Row>
          {/* Program Section End */}
        </section>
        <section className="mt-5">
          <h5 className="text-3xl md:text-4xl text-center bold-font">
            {t("courceHead0")}
          </h5>
          <h5 className="text-center mt-2 color-4 regular-font">
            {t("courcesbHead0")}
          </h5>

          <Row className="g-3 mt-5">
            {program?.map((item, index) => (
              <Col key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
                <section className="shadow cursor-pointer h-80 rounded-[10px] py-[13px] px-[15px] transform transition-transform duration-500 hover:scale-105 hover:shadow-xl hover:-translate-y-3 hover:bg-gradient-to-r flex flex-col justify-evenly">
                  <div className="mx-auto my-4 w-fit py-[10px] px-[10px]">
                    <span className="color-1 text-[4rem]">
                      <LiaChalkboardTeacherSolid />
                    </span>
                  </div>
                  <h4 className="semiBold-font color-1 text-[1.2rem] text-center border-b border-gray-200 pb-3 mb-4">
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
          <h5 className="semiBold-font color-1 text-[1.2rem]">
            {" "}
            {t("programtext0")}
          </h5>
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
      </Container>

      <section className="py-16 bg-black text-white px-4">
        <h5 className="text-2xl md:text-4xl font-bold mb-6 text-center">
          {t("futuretet")}
        </h5>
        <p className="text-base md:text-xl opacity-90 mb-8 max-w-2xl mx-auto text-center">
          {t("futuretetDes")}
        </p>
      </section>
    </>
  );
};

export default Page;
