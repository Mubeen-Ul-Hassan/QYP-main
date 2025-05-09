/* eslint-disable @next/next/no-img-element */
"use client";
import Image from "next/image";
import React from "react";
import { Demoimg15 } from "../assets/icons/icon";
import { BsArrowRight, BsCalendar4Week } from "react-icons/bs";
import Link from "next/link";
import { Col, Row } from "react-bootstrap";
import { message, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { setBlogData } from "../Redux/Slices/blogSlice";
const Blog = ({ blogData, isLoading }) => {
  const dispatch = useDispatch();
  const router = useRouter();
  const HanldeDetail = (item) => {
    router.push(`/blog-detail/${item?._id}`);
    dispatch(setBlogData(item));
  };
  return (
    <>
      <Row className="g-4">
        {isLoading ? (
          <>
            {[...Array(4)].map((_, index) => (
              <Col xs={12} sm={6} md={4} lg={3} xl={3} key={index}>
                <div className="shadow1 border_7 h-[250px] rounded-t-[6px]">
                  <Skeleton active className="skelton_main" />
                </div>
              </Col>
            ))}
          </>
        ) : (
          <>
            {blogData &&
              blogData?.map((item, index) => (
                <Col xs={12} sm={12} md={6} lg={4} xl={4} key={index}>
                  <div
                    onClick={() => {
                      HanldeDetail(item);
                    }}
                    className="shadow1 cursor-pointer"
                  >
                    <img
                      className="h-[250px] w-100 object-cover"
                      src={item?.images[0]}
                      alt=""
                    />
                    <div className="py-[20px] px-[15px]">
                      <div className="primary-color text-[1rem] flex items-center medium-font">
                        <BsCalendar4Week />
                        <h5 className="ml-2">{item?.date}</h5>
                      </div>
                      <h4 className="color-0 bold-font text-[1.2rem] mt-2">
                        {item?.title}
                      </h4>
                      <Link
                        className="primary-color bold-font text-[1rem] flex items-center mt-2"
                        href={"/"}
                      >
                        <>
                          Read more
                          <div className="primary-color borderPrime rounded-[50%] p-[3px] ml-3">
                            <BsArrowRight />
                          </div>
                        </>
                      </Link>
                    </div>
                  </div>
                </Col>
              ))}
          </>
        )}
      </Row>
    </>
  );
};

export default Blog;
