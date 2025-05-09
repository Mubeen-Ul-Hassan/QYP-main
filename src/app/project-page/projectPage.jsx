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
import { useTranslation } from "react-i18next";

const ProjectPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const router = useRouter();
  const { completeProjectGet } = ApiFile;
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
    const api = `${completeProjectGet}/${lastId}`;
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
      <BreadCrumbs breadName={t("projectHead")} />

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
                <Row className="g-4">
                  {data?.map((item, index) => (
                    <Col key={index} xs={12} sm={6} md={3} lg={3} xl={3}>
                      <div
                        onClick={() => {
                          HanldeDetail(item);
                        }}
                        className="mainCard cursor-pointer"
                      >
                        <h5 className="capitalize medium-font line-clamp-2 mb-2 text-[1.2rem]">
                          {item?.title}
                        </h5>
                        <img
                          className="h-[16rem] w-[100%] object-cover rounded-[10px]"
                          src={item?.images[0]}
                          alt=""
                        />
                        <div className="overlay">
                          {/* <span className="text-white regular-font text-[1rem] capitalize">
                            {item?.title}
                          </span> */}
                          <div className="btnGal">{t("gallery")}</div>
                        </div>
                      </div>
                      <div className="px-[16px]">
                        <p className="color-1 mt-2 line-clamp-2 regular-font text-[1rem]">
                          {item?.short_description}
                        </p>
                      </div>
                    </Col>
                  ))}
                  <section className="flex items-center justify-center mt-4">
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
                  </section>
                </Row>
              </>
            ) : (
              "Not Found Project"
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default ProjectPage;
