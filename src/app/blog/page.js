/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import {
  Demoimg1,
  Demoimg2,
  Demoimg4,
  Demoimg5,
  Demoimg6,
  HomeImg,
} from "@/components/assets/icons/icon";
import Blog from "@/components/Blog/Blog";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import debounce from "debounce";
import React, { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { message, Skeleton } from "antd";
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import { useTranslation } from "react-i18next";
const Page = () => {
  const { getData, header1 } = useApiClient();
  const [isLoading, setIsLoading] = useState([]);
  const { t } = useTranslation();
  const { blogGet } = ApiFile;
  const [data, setData] = useState("");
  const [blogData, setBlogData] = useState([]);
  const [lastId, setLastId] = useState(1);
  const [pagiLoading, setPagiLoading] = useState(false);

  const HandleBlog = debounce(() => {
    if (lastId === 1) {
      setIsLoading(true);
    }
    setPagiLoading(true);
    const api = `${blogGet}/${lastId}`;
    getData(api, header1)
      .then((res) => {
        if (res?.success && res?.blogs?.length > 0) {
          if (lastId === 1) {
            setBlogData(res?.blogs);
          } else {
            setBlogData((prevData) => prevData?.concat(res?.blogs));
          }
          setLastId(lastId + 1);
        } else {
          message.error("No More Blogs Found");
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
    HandleBlog();
  }, []);

  return (
    <>
      <BreadCrumbs breadName={"blog"} />
      <Container fluid="xxl" className="mt-[5rem] mb-[2rem]">
        <Blog blogData={blogData} isLoading={isLoading} />

        <section className="flex items-center justify-center mt-4">
          <div
            onClick={HandleBlog}
            className="flex items-center cursor-pointer justify-center py-[10px] px-[20px] text-white w-fit rounded-[10px] h-[3rem] primary-bg medium-font text-[1rem] border border-primary-bg primBnt"
          >
            {pagiLoading ? (
              <>
                <Spinner size="sm" />
              </>
            ) : (
             <>
             {t("seeMore")}
             </>
            )}
          </div>
        </section>
      </Container>
    </>
  );
};

export default Page;
