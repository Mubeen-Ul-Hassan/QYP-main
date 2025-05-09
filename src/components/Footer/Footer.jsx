/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { Logo, whiteLogo } from "../assets/icons/icon";
import { FaPhoneAlt } from "react-icons/fa";
import { MdOutlineMailOutline } from "react-icons/md";
import { FaMapMarkerAlt } from "react-icons/fa";
import Link from "next/link";
import { FaPhone } from "react-icons/fa6";
import { MdMarkEmailUnread } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";
import debounce from "debounce";
import ApiFile from "../ApiFunction/ApiFile";
import useApiClient from "../ApiFunction/useApiClient";
import { useTranslation } from "react-i18next";

const Footer = () => {
  const { t } = useTranslation();
  const { userData, getData, header1 } = useApiClient();
  const { categoryGet } = ApiFile;
  const [data, setData] = useState("");
  const HandleCategory = debounce(() => {
    const api = `${categoryGet}/1`;
    getData(api, header1)
      .then((res) => {
        if (res?.success && res?.categories?.length > 0) {
          setData(res?.categories);
        }
      })
      .catch((error) => {
        console.log(error);
      });
  }, 300);

  useEffect(() => {
    HandleCategory();
  }, []);

  return (
    <>
      <section className="bg-0 py-[3rem] px-[1.5rem]">
        <Container fluid="xxl">
          <Row className="g-3">
            <Col md={12} className="flex items-center justify-center">
              <Image
                className="h-[6rem] w-[6rem] object-contain"
                src={Logo}
                alt=""
              />
            </Col>

            <Col
              className="flex min-[768px]:justify-center"
              xs={12}
              sm={12}
              md={4}
              lg={3}
              xl={3}
            >
              <div>
                <h4 className="color-3 text-[1.1rem] semiBold-font  w-fit pb-2">
                  {t("itemAboutUs")}
                </h4>
                <p className="color-4 mt-3 light-font text-[0.8rem]">
                  {t("footerData")}
                </p>
              </div>
            </Col>
            <Col
              className="flex min-[768px]:justify-center"
              xs={12}
              sm={12}
              md={4}
              lg={3}
              xl={3}
            >
              <div>
                <h4 className="color-3 text-[1.1rem] semiBold-font  w-fit pb-2">
                  {t("footerTitle1")}
                </h4>
                <div className="mt-3 flex flex-col">
                  <Link
                    href={"/aboutUs"}
                    className="color-4 cursor-pointer text-[0.8rem] regular-font w-fit mb-2"
                  >
                    {t("footerTitle2")}
                  </Link>
                  <Link
                    href={"/contact"}
                    className="color-4 cursor-pointer text-[0.8rem] regular-font w-fit mb-2"
                  >
                    {t("footerTitle3")}
                  </Link>
                  <Link
                    href={"/"}
                    className="color-4 text-[0.8rem] regular-font w-fit mb-2"
                  >
                    {t("footerTitle4")}
                  </Link>

                  <Link
                    href={"/courses"}
                    className="color-4 cursor-pointer text-[0.8rem] regular-font w-fit mb-2"
                  >
                    Education
                    {/* {t("footerTitle5")} */}
                  </Link>
                </div>
              </div>
            </Col>
            <Col
              className="flex min-[768px]:justify-center"
              xs={12}
              sm={12}
              md={4}
              lg={3}
              xl={3}
            >
              <div>
                <h4 className="color-3 text-[1.1rem] semiBold-font  w-fit pb-2">
                  {t("itemProduct")}
                </h4>
                <div className="mt-3 flex flex-col">
                  <Link
                    href={`/category-instruments/all`}
                    className="color-4 text-[0.8rem] regular-font w-fit mb-2"
                  >
                    {t("itemAll")}
                  </Link>
                  {data?.length > 0 &&
                    data.slice(0, 4).map((item, index) => (
                      <Link
                        key={index}
                        href={`/category-instruments/${item._id}`}
                        className="color-4 text-[0.8rem] regular-font w-fit mb-2"
                      >
                        {item?.name}
                      </Link>
                    ))}
                </div>
              </div>
            </Col>
            <Col
              className="flex min-[768px]:justify-center"
              xs={12}
              sm={12}
              md={4}
              lg={3}
              xl={3}
            >
              <div>
                <h4 className="color-3 text-[1.1rem] semiBold-font w-fit pb-2">
                  {t("itemContact")}
                </h4>
                <div className="flex cursor-pointer flex-col mt-3">
                  <div className="flex gap-2 mb-2 items-center">
                    <MdMarkEmailUnread className="color-1 text-[1rem]" />
                    <a
                      href="mailto:kup.volkan@qyp.fi"
                      className="color-4 text-[0.8rem] regular-font w-fit"
                    >
                      kup.volkan@qyp.fi
                    </a>
                  </div>
                  <div className="flex gap-2 mb-2 items-center">
                    <MdMarkEmailUnread className="color-1 text-[1rem]" />
                    <a
                      href="mailto:info@qyp.fi"
                      className="color-4 text-[0.8rem] regular-font w-fit"
                    >
                      info@qyp.fi
                    </a>
                  </div>
                </div>
                <div className="flex cursor-pointer mb-2 items-center gap-2">
                  <div className="flex gap-2 items-center">
                    <FaPhone className="color-1 text-[1rem]" />
                    <a
                      href="tel:+358447474818"
                      className="color-4 text-[0.8rem] regular-font w-fit"
                    >
                      +358 44 747 48 18
                    </a>
                  </div>
                </div>
                <div className="flex cursor-pointer items-center mb-2 gap-2">
                  <div className="flex gap-2 items-center">
                    <FaLocationDot className="color-1 text-[1rem]" />
                    <h5 className="color-4 text-[0.8rem] regular-font w-fit">
                      Pahnakuja 1 21420 Lieto
                    </h5>
                  </div>
                </div>
              </div>
            </Col>
          </Row>
        </Container>
      </section>
    </>
  );
};

export default Footer;
