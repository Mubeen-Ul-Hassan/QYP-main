"use client";

import { useEffect, useState } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { message, Skeleton } from "antd";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";
import debounce from "debounce";
import { motion } from "framer-motion";
import { ArrowRight, Eye } from "lucide-react";

import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import { selectService } from "@/components/Redux/Slices/serviceSlice";

const LatestProjects = () => {
  const { t } = useTranslation();
  const { projectGet } = ApiFile;
  const { getData, header1 } = useApiClient();
  const [isLoading, setIsLoading] = useState(true);
  const [data, setData] = useState([]);
  const [lastId, setLastId] = useState(1);
  const router = useRouter();
  const dispatch = useDispatch();

  const handleProject = debounce(() => {
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
    handleProject();
  }, []);

  const handleDetail = (item) => {
    router.push(`/project-detail/${item?._id}`);
    dispatch(selectService(item));
  };

  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-16 bg-gradient-to-b from-gray-50 to-white">
      <Container fluid="xxl">
        <div className="text-center mb-12">
          <motion.h2
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="text-3xl md:text-4xl font-bold text-gray-900 mb-4"
          >
            {t("latesProjectTitle")}
          </motion.h2>
          <motion.p
            initial="hidden"
            animate="visible"
            variants={fadeInUp}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="max-w-2xl mx-auto text-gray-600"
          >
            {"Discover our most recent work and innovative solutions" ||
              t("projectsSubtitle")}
          </motion.p>
        </div>

        <Row className="g-4">
          {isLoading ? (
            <>
              {[...Array(4)].map((_, index) => (
                <Col xs={12} sm={6} md={4} lg={3} key={index}>
                  <div className="bg-white rounded-xl shadow-sm overflow-hidden h-full">
                    <div className="aspect-[4/3]">
                      <Skeleton.Image className="w-full h-full" active />
                    </div>
                    <div className="p-4">
                      <Skeleton active paragraph={{ rows: 2 }} />
                    </div>
                  </div>
                </Col>
              ))}
            </>
          ) : (
            <>
              {data &&
                data.length > 0 &&
                data.map((item, index) => (
                  <Col
                    key={index}
                    xs={12}
                    sm={6}
                    md={4}
                    lg={3}
                    className="mx-5"
                  >
                    <motion.div
                      initial="hidden"
                      animate="visible"
                      variants={fadeInUp}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      className="bg-white rounded-xl shadow-sm overflow-hidden w-80 h-full transform transition-all duration-300 hover:shadow-md hover:-translate-y-1"
                    >
                      <div
                        className="relative aspect-[4/3] overflow-hidden cursor-pointer"
                        onClick={() => handleDetail(item)}
                      >
                        {/* eslint-disable @next/next/no-img-element */}
                        <img
                          src={item?.images[0] || "/placeholder.svg"}
                          alt={item?.title || "Project image"}
                          className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                        />
                        <div className="absolute inset-0 bg-black bg-opacity-0 hover:bg-opacity-30 transition-all duration-300 flex items-center justify-center opacity-0 hover:opacity-100">
                          <div className="bg-white p-2 rounded-full">
                            <Eye className="h-5 w-5 text-blue-600" />
                          </div>
                        </div>
                      </div>
                      <div className="p-5">
                        <div className="mb-2">
                          {item?.category && (
                            <span className="text-xs font-medium text-blue-600 bg-blue-50 px-2 py-1 rounded-full">
                              {item.category}
                            </span>
                          )}
                        </div>
                        <h3
                          className="font-semibold text-gray-900 mb-2 line-clamp-2 hover:text-blue-600 transition-colors cursor-pointer"
                          onClick={() => handleDetail(item)}
                        >
                          {item?.title}
                        </h3>
                        <div className="flex justify-between items-center mt-3">
                          <button
                            onClick={() => handleDetail(item)}
                            className="text-black text-sm font-medium flex items-center hover:underline"
                          >
                            {"Details" || t("viewDetails")}
                            <ArrowRight className="ml-1 h-4 w-4" />
                          </button>
                          <div className="text-xs font-medium text-gray-500 bg-gray-100 px-2 py-1 rounded-full">
                            {"Gallery" || t("gallery")}
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  </Col>
                ))}
            </>
          )}
        </Row>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={fadeInUp}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="flex justify-center mt-12"
        >
          <Link
            href="/all-project"
            className="group relative inline-flex items-center justify-center px-8 py-3 bg-black text-white font-medium rounded-lg overflow-hidden shadow-lg hover:bg-blue-700 transition-all duration-300"
          >
            <span className="relative z-10 flex items-center">
              {t("latesProjectBtn")}
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </span>
          </Link>
        </motion.div>
      </Container>
    </section>
  );
};

export default LatestProjects;
