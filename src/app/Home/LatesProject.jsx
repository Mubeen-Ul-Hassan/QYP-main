/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import {
  Image2,
  Image3,
  Image4,
  Image5,
  Image6,
  serviceimg,
} from "@/components/assets/icons/icon";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { message, Skeleton } from "antd";
import debounce from "debounce";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { selectService } from "@/components/Redux/Slices/serviceSlice";
const LatesProject = () => {
  const { t } = useTranslation();
  const { projectGet } = ApiFile;
  const { getData, header1 } = useApiClient();
  const [isLoading, setIsLoading] = useState([]);
  const [data, setData] = useState("");
  const [lastId, setLastId] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();
  const HandleProject = debounce(() => {
    setIsLoading(true);
    const api = `${projectGet}/all/${lastId}`;
    getData(api, header1)
      .then((res) => {
        if (res?.success) {
          setData(res?.projects);
        } else {
          message.error(res?.message);
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        setIsLoading(false);
      });
  }, 300);

  useEffect(() => {
    HandleProject();
  }, []);

  const HanldeDetail = (item) => {
    router.push(`/project-detail/${item?._id}`);
    dispatch(selectService(item));
  };

  return (
    <>
      <Container fluid="xxl" className="mb-5 relative">
        <div className="flex items-center justify-center flex-col">
          {/* <div className="relative">
            <Image className="h-[4rem] w-[24rem]" src={serviceimg} alt="" />
            <h5 className="absolute inset-0 uppercase flex items-center justify-center color-1 regular-font text-[1.2rem]">
              We Are Professional
            </h5>
          </div> */}
          <h4 className="color-1 bold-font text-[2rem] mt-2">
            {t("latesProjectTitle")}
          </h4>
        </div>
        <Row className="g-3 mt-4">
          {isLoading ? (
            <>
              {[...Array(4)].map((_, index) => (
                <Col xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                  <div className="shadow1 border_7 h-[18rem] rounded-t-[6px]">
                    <Skeleton active className="skelton_main" />
                  </div>
                </Col>
              ))}
            </>
          ) : (
            <>
              {data &&
                data?.length > 0 &&
                data?.map((item, index) => (
                  <Col key={index} xs={12} sm={6} md={4} lg={3} xl={3}>
                    <section
                      onClick={() => {
                        HanldeDetail(item);
                      }}
                      className="border_7 h-[27rem] rounded-t-[10px]"
                    >
                      <img
                        className="h-[20rem] w-100 rounded-t-[10px] object-cover cursor-pointer"
                        src={item?.images[0]}
                        alt=""
                      />
                      <div className="flex h-[7rem] items-baseline py-[12px] px-[10px] justify-between flex-col gap-2">
                        <span className="color-1 regular-font text-[0.9rem] capitalize line-clamp-2 w-100">
                          {item?.title}
                        </span>
                        <div className="w-100 flex justify-end">
                          <div className="btnGal bg-black whitespace-nowrap">
                            {t("gallery")}
                          </div>
                        </div>
                      </div>
                    </section>
                  </Col>
                ))}

              <section className="flex items-center justify-center mt-4">
                <Link
                  href={"/all-project"}
                  className="flex items-center justify-center py-[10px] px-[20px] text-white w-fit rounded-[10px] h-[3rem] primary-bg medium-font text-[1rem] border border-primary-bg primBnt"
                >
                  {t("latesProjectBtn")}
                </Link>
              </section>
            </>
          )}
        </Row>
      </Container>
    </>
  );
};

export default LatesProject;
