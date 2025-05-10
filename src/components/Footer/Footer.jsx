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

import { FaFacebookSquare } from "react-icons/fa";
import { FaInstagram } from "react-icons/fa";
import { FaTiktok } from "react-icons/fa";
import { FaPinterest } from "react-icons/fa";

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
    <footer className="bg-0 w-full body-font">
      <div className="flex justify-center items-center mx-auto px-5 pt-12 pb-12">
        <div className="w-full px-4 sm:px-0 sm:w-72 flex-shrink-0 md:mx-0 sm:text-center md:text-left">
          <a className="">
            <Image
              className="h-[7rem] w-[14rem] object-contain"
              src={Logo}
              alt=""
            />
          </a>
          <p className="color-4 light-font text-[0.8rem]">{t("footerData")}</p>
          <div className="flex gap-6 text-xl mt-3 *:cursor-pointer">
            <FaFacebookSquare className="hover:scale-110" />
            <FaInstagram className="hover:scale-110" />
            <FaTiktok className="hover:scale-110" />
            <FaPinterest className="hover:scale-110" />
          </div>
        </div>
        <div className="h-full flex justify-center flex-wrap md:pl-20 md:mt-0 mt-50 md:text-left sm:text-center">
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <div className="flex flex-col">
              <h2 className="text-[1.1rem] semiBold-font w-fit pb-2">
                {t("footerTitle1")}
              </h2>
              <Link
                href={"/aboutUs"}
                className="color-4 cursor-pointer text-[0.8rem] regular-font w-fit mb-2 hover:text-black"
              >
                {t("footerTitle2")}
              </Link>
              <Link
                href={"/contact"}
                className="color-4 cursor-pointer text-[0.8rem] regular-font w-fit mb-2 hover:text-black"
              >
                {t("footerTitle3")}
              </Link>
              <Link
                href={"/"}
                className="color-4 text-[0.8rem] regular-font w-fit mb-2 hover:text-black"
              >
                {t("footerTitle4")}
              </Link>

              <Link
                href={"/courses"}
                className="color-4 cursor-pointer text-[0.8rem] regular-font w-fit mb-2 hover:text-black"
              >
                Education
                {/* {t("footerTitle5")} */}
              </Link>
            </div>
          </div>
          <div className="lg:w-1/3 md:w-1/2 w-full px-4 flex flex-col">
            <h2 className="text-[1.1rem] semiBold-font w-fit pb-2">
              {t("itemProduct")}
            </h2>
            <Link
              href={`/category-instruments/all`}
              className="color-4 text-[0.8rem] regular-font w-fit mb-2 hover:text-black"
            >
              {t("itemAll")}
            </Link>
            {data?.length > 0 &&
              data.slice(0, 4).map((item, index) => (
                <Link
                  key={index}
                  href={`/category-instruments/${item._id}`}
                  className="color-4 text-[0.8rem] regular-font w-fit mb-2 hover:text-black"
                >
                  {item?.name}
                </Link>
              ))}
          </div>
          <div className="lg:w-1/3 md:w-1/2 w-full px-4">
            <h2 className="text-[1.1rem] semiBold-font w-fit pb-2">
              {t("itemContact")}
            </h2>
            <div className="flex cursor-pointer flex-col">
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
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
