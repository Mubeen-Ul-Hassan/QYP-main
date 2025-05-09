/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import { selectblog } from "@/components/Redux/Slices/blogSlice";
import debounce from "debounce";
import { Autoplay, Navigation } from "swiper";
import { useParams, useRouter } from "next/navigation";
import { Swiper, SwiperSlide } from "swiper/react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { useSelector } from "react-redux";
import { message, Skeleton } from "antd";
import { selectService } from "@/components/Redux/Slices/serviceSlice";
import Link from "next/link";
import { useTranslation } from "react-i18next";

const page = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const router = useRouter();
  const { projectGet } = ApiFile;
  const { getData, header1 } = useApiClient();
  const [data, setData] = useState("");
  const serviceGet = useSelector(selectService);
  const [isLoading, setIsLoading] = useState([]);
  const [lastId, setLastId] = useState(1);
  const [pagiLoading, setPagiLoading] = useState(false);

  const HandleService = debounce(() => {
    if (lastId === 1) {
      setIsLoading(true);
    }
    setPagiLoading(true);
    const api = `${projectGet}/${id}/${lastId}`;
    getData(api, header1)
      .then((res) => {
        if (res?.success && res?.projects?.length > 0) {
          if (lastId === 1) {
            setData(res?.projects);
          } else {
            setData((prevData) => prevData?.concat(res?.projects));
          }
          setLastId(lastId + 1);
        } else {
          message.error("No More projects Found");
        }
        setIsLoading(false);
        setPagiLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        setIsLoading(false);
        setPagiLoading(false);
        setLastId(1);
      });
  }, 300);

  useEffect(() => {
    if (!serviceGet?.title) {
      HandleService();
    }
  }, [serviceGet]);

  useEffect(() => {
    if (serviceGet) {
      setData(serviceGet);
    }
  }, [serviceGet]);

  const HanldeDetail = (item) => {
    router.push(`/project-detail/${item?._id}`);
    dispatch(selectService(item));
  };

  return (
    <>
      <BreadCrumbs breadName={t("serviceDetail")} />

      <Container className="mb-5" fluid="xxl">
        {isLoading ? (
          <>
            <div>
              <Skeleton />
            </div>
          </>
        ) : (
          <>
            {data && data?.length > 0 ? (
              <>
                <section>
                  <Row className="mb-3 g-4">
                    <Col md={4}>
                      <div className="bg-white rounded-[10px] relative shadow0 px-[1.2rem] py-[4rem] flex items-center justify-center flex-col">
                        <div>
                          <img
                            className="w-100 h-[8rem] object-contain"
                            src={data?.[0]?.service?.image}
                            alt=""
                          />
                        </div>
                        <h4 className="color-0 mt-4 capitalize mb-1 text-[1.1rem] semiBold-font">
                          {data?.[0]?.service?.title}
                        </h4>
                      </div>
                    </Col>
                    <Col lg={8}>
                      <h5 className="color-0 mt-2  capitalize mb-1 text-[1.1rem] semiBold-font">
                        Short Description
                      </h5>
                      <h4 className="color-4 leading-7 line-clamp-7 mt-2 regular-font text-[1rem] break-words whitespace-pre-line">
                        {data?.[0]?.service?.short_description}
                      </h4>
                    </Col>
                    <Col xl={12}>
                      <h5 className="color-0 mt-5 capitalize mb-1 text-[1.1rem] semiBold-font">
                        Description
                      </h5>
                      <h4 className="color-4 leading-7 regular-font text-[1rem] break-words whitespace-pre-line">
                        {data?.[0]?.service?.description}
                      </h4>
                    </Col>
                  </Row>
                </section>
                <h4 className="color-0 mt-4 mb-4 bold-font first-letter:uppercase text-[1.7rem]">
                  Projects
                </h4>
                <Row className="g-5">
                  {data?.map((item, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={4} xl={4}>
                      <div
                        onClick={() => {
                          HanldeDetail(item);
                        }}
                        className="mainCard border_7 cursor-pointer"
                      >
                        <img
                          className="h-[19rem] w-[100%] object-cover rounded-[10px]"
                          src={item?.images[0]}
                          alt=""
                        />
                        <div className="overlay">
                          <span className="text-white regular-font text-[1rem] capitalize">
                            {item?.title}
                          </span>
                          <div className="btnGal whitespace-nowrap">
                            {" "}
                            {t("gallery")}
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                  <section className="flex gap-4 items-center justify-center mt-4">
                    <div
                      onClick={HandleService}
                      className="flex items-center cursor-pointer justify-center py-[10px] px-[20px] text-white w-fit rounded-[10px] h-[3rem] primary-bg medium-font text-[1rem] border border-primary-bg primBnt"
                    >
                      {pagiLoading ? (
                        <>
                          <Spinner size="sm" />
                        </>
                      ) : (
                        <>{t("seeMore")}</>
                      )}
                    </div>
                    <Link
                      href={"/contact"}
                      onClick={HandleService}
                      className="flex items-center cursor-pointer justify-center py-[10px] px-[20px] text-white w-fit rounded-[10px] h-[3rem] primary-bg medium-font text-[1rem] border border-primary-bg primBnt"
                    >
                      {t("footerTitle3")}
                    </Link>
                  </section>
                </Row>
              </>
            ) : (
              <>
                <section className="flex items-center justify-center flex-col gap-3">
                  Not Found Project
                  <Link
                    href={"/contact"}
                    onClick={HandleService}
                    className="flex items-center cursor-pointer justify-center py-[10px] px-[20px] text-white w-fit rounded-[10px] h-[3rem] primary-bg medium-font text-[1rem] border border-primary-bg primBnt"
                  >
                    Contact Us
                  </Link>
                </section>
              </>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default page;
