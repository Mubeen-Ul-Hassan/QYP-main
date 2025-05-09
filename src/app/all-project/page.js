/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import { Image1 } from "@/components/assets/icons/icon";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import debounce from "debounce";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { message, Skeleton } from "antd";
import { useDispatch } from "react-redux";
import { selectService } from "@/components/Redux/Slices/serviceSlice";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
const Page = () => {
  const { t } = useTranslation();
  const { projectGet } = ApiFile;
  const { getData, header1 } = useApiClient();
  const [isLoading, setIsLoading] = useState([]);
  const [data, setData] = useState("");
  const [lastId, setLastId] = useState(1);
  const [pagiLoading, setPagiLoading] = useState(false);

  const HandleProject = debounce(() => {
    if (lastId === 1) {
      setIsLoading(true);
    }
    setPagiLoading(true);
    const api = `${projectGet}/all/${lastId}`;
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
          message.error("No More Projects Found");
        }
        setIsLoading(false);
        setPagiLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        setIsLoading(false);
        setPagiLoading(false);
      });
  }, 300);

  useEffect(() => {
    HandleProject();
  }, []);

  const dispatch = useDispatch();
  const router = useRouter();
  const HanldeDetail = (item) => {
    router.push(`/project-detail/${item?._id}`);
    dispatch(selectService(item));
  };
  return (
    <>
      <BreadCrumbs breadName={"Project"} />
      <Container fluid="xxl" className="mt-0">
        <h4 className="color-1 bold-font text-[2rem] capitalize mt-2">
          All Projects
        </h4>
        <Row className="g-4 mt-4">
          {isLoading ? (
            <>
              <Skeleton active />
              {/* {[...Array(4)].map((_, index) => (
                <Col xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                  <div className="shadow1 border_7 h-[18rem] rounded-t-[6px]">
                    <Skeleton active className="skelton_main" />
                  </div>
                </Col>
              ))} */}
            </>
          ) : (
            <>
              {data && data?.length > 0 ? (
                <>
                  {data?.map((item, index) => (
                    <Col key={index} xs={12} sm={6} md={4} lg={4} xl={4}>
                      <div
                        onClick={() => {
                          HanldeDetail(item);
                        }}
                        className="mainCard cursor-pointer"
                      >
                        <img
                          className="h-[19rem] w-[100%] object-cover rounded-[10px]"
                          src={item?.images[0]}
                          alt=""
                        />
                        <div className="overlay gap-2 items-baseline flex flex-col">
                          <span className="text-white regular-font text-[1rem] line-clamp-2 capitalize">
                            {item?.title}
                          </span>
                          <div className="w-100 flex justify-end">
                            <div className="btnGal whitespace-nowrap w-fit">
                              {t("gallery")}
                            </div>
                          </div>
                        </div>
                      </div>
                    </Col>
                  ))}
                  <section className="flex items-center justify-center mt-4">
                    <div
                      onClick={HandleProject}
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
                </>
              ) : (
                "Not Found Project"
              )}
            </>
          )}
        </Row>
        {/* <div className="mt-[6rem] flex flex-col lg:flex-row items-center justify-between gap-3">
          <div className="flex flex-col">
            <h4 className="bold-font color-1 text-[1.7rem] ">
              <span className="color-6">Building a dream</span> shouldn’t be a
              nightmare!
            </h4>
            <h5 className="color-4 text-[1rem] mt-2 regular-font">
              We have transforming the ideas and visions into winning projects.
            </h5>
          </div>
          <div className="primary-bg cursor-pointer rounded-[6px] py-[10px] px-[20px] text-[0.8rem] medium-font w-fit text-white">
            Free Consultation
          </div>
        </div> */}
      </Container>
    </>
  );
};

export default Page;
