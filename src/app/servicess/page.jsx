/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import {
  Image1,
  serviceimg,
  FloorGrinding,
  ConcretePolishing,
  Grinding,
  Painicon,
  IndoorIcon,
  NailCutting,
  Patching,
  Chipping,
  DiomandDriling,
  Grooving,
  DiomantCutting,
  Leveling,
} from "@/components/assets/icons/icon";
import debounce from "debounce";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { message, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
const Page = () => {
  const { t } = useTranslation();
  const { serviceGet } = ApiFile;
  const { getData, header1 } = useApiClient();
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [serviceData, setServiceData] = useState([]);
  const [lastId, setLastId] = useState(1);
  const [serviceLoading, setServiceLoading] = useState(false);
  const [noMoreServices, setNoMoreServices] = useState(false);
  const HandleService = debounce(() => {
    setIsLoading(true);
    if (lastId === 1) {
      setServiceLoading(true);
    }
    const api = `${serviceGet}/${lastId}`;
    getData(api, header1)
      .then((res) => {
        if (res?.success && res?.services?.length > 0) {
          if (lastId === 1) {
            setServiceData(res?.services);
          } else {
            setServiceData((prevData) => prevData?.concat(res?.services));
          }
          setLastId(lastId + 1);
          setNoMoreServices(false);
        } else {
          // message.error("Services not found");
          setNoMoreServices(true);
        }
        setIsLoading(false);
        setServiceLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.mes);
        setIsLoading(false);
        setServiceLoading(false);
        setLastId(1);
        setServiceData([]);
        setNoMoreServices(false);
      });
  }, 300);

  useEffect(() => {
    HandleService();
  }, []);

  const HanldeDetail = (item) => {
    router.push(`/service-detail/${item?._id}`);
  };

  return (
    <>
      <Container fluid="xxl" className="mt-[5rem] mb-[4rem]">
        {serviceLoading ? (
          <>
            <Skeleton active />
          </>
        ) : (
          <>
            <section className="mt-4">
              <Row className="g-5">
                {serviceData?.length > 0 ? (
                  <>
                    {serviceData?.map((item, index) => (
                      <Col
                        onClick={() => {
                          HanldeDetail(item);
                        }}
                        key={index}
                        xl={4}
                      >
                        <div className="bg-white cursor-pointer h-100 relative shadow0 px-[1.2rem] py-[4rem] flex items-center justify-center flex-col">
                          <img
                            src={item?.image}
                            className="h-78rem] w-[7rem] mb-5 object-contain"
                            alt=""
                          />
                          <h4 className="color-0 w-100 line-clamp-2  text-center capitalize mb-5 text-[1.3rem] bold-font border_6 pb-3">
                            {item?.title}
                          </h4>
                          <h5 className="color-4 w-100 line-clamp-2  leading-9 text-center regular-font text-[1.2rem]">
                            {item?.description}
                          </h5>
                          <div
                            onClick={() => {
                              HanldeDetail(item);
                            }}
                            className="primary-bg  rounded-[10px] px-[35px] cursor-pointer absolute bottom-[-1.8rem] py-[17px] text-white medium-font"
                          >
                            {t("seeProject")}
                          </div>
                        </div>
                      </Col>
                    ))}
                  </>
                ) : (
                  <>
                    <h5 className="regular-font color-1 text-[1rem] text-center mt-3">
                      {t("serviceNotFound")}
                    </h5>
                  </>
                )}
              </Row>
              <section className="flex flex-col items-center justify-center mt-[6rem]">
                {/* {!noMoreServices && (
                  <div
                    onClick={HandleService}
                    className="flex items-center cursor-pointer justify-center py-[10px] px-[20px] text-white w-fit rounded-[10px] h-[3rem] primary-bg medium-font text-[1rem] border border-primary-bg primBnt"
                  >
                    {isLoading ? (
                      <>
                        <Spinner size="sm" />
                      </>
                    ) : (
                      <>{t("seeMore")}</>
                    )}
                  </div>
                )} */}

                {noMoreServices && (
                  <Link
                    href={"/contact"}
                    className="flex items-center cursor-pointer justify-center py-[10px] px-[20px] text-white w-fit rounded-[10px] h-[3rem] primary-bg medium-font text-[1rem] border border-primary-bg primBnt mt-4"
                  >
                    {t("serviceContact")}
                  </Link>
                )}
              </section>
            </section>
            <section className="mt-5">
              <Row>
                <Col xl={6}>
                  <div className="flex items-center justify-center flex-col">
                    <div className="relative">
                      <Image
                        className="h-[4rem] w-[24rem]"
                        src={serviceimg}
                        alt=""
                      />
                      <h5 className="absolute inset-0 uppercase flex items-center justify-center color-1 regular-font text-[1.2rem]">
                        {t("servicePageTitle")}
                      </h5>
                    </div>
                    <h4 className="color-1 max-w-[20rem] bold-font text-[2rem] mt-2">
                      {t("servicePagesbTitle")}
                    </h4>
                  </div>
                </Col>
                <Col xl={6}>
                  <p className="color-4 text-[0.8rem] medium-font">
                    {t("servicePageDes")}
                  </p>
                </Col>
              </Row>
            </section>
          </>
        )}
      </Container>
    </>
  );
};

export default Page;
