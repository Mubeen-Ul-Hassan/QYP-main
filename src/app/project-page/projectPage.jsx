/* eslint-disable @next/next/no-img-element */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react-hooks/rules-of-hooks */
"use client";
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import { selectService } from "@/components/Redux/Slices/serviceSlice";
import debounce from "debounce";
import { useParams, useRouter } from "next/navigation";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import { useEffect, useState } from "react";
import { Container, Spinner } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { message, Skeleton } from "antd";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { FaArrowDown } from "react-icons/fa6";
import { BsArrowRight } from "react-icons/bs";

const ProjectPage = () => {
  const { t } = useTranslation();
  const { id } = useParams();
  const router = useRouter();
  const dispatch = useDispatch();
  const { completeProjectGet } = ApiFile;
  const { getData, header1 } = useApiClient();
  const [data, setData] = useState("");
  const serviceGet = useSelector(selectService);
  const [isLoading, setIsLoading] = useState(false);
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

  // Animation variants for staggered card appearance
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const cardVariants = {
    hidden: { y: 50, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 12,
      },
    },
  };

  return (
    <>
      <Container className="mb-5" fluid="xxl">
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
              <div key={item} className="rounded-xl overflow-hidden">
                <Skeleton.Image active className="w-full h-64" />
                <div className="p-4">
                  <Skeleton active paragraph={{ rows: 2 }} />
                </div>
              </div>
            ))}
          </div>
        ) : (
          <>
            {data && data?.length > 0 ? (
              <>
                <motion.div
                  className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-x-2.5"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                >
                  {data?.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={cardVariants}
                      className="group"
                    >
                      <div
                        onClick={() => HanldeDetail(item)}
                        className="relative w-full overflow-hidden rounded-t-xl bg-0 border-2 border-black shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer h-4/5 flex flex-col"
                      >
                        <div className="relative overflow-hidden">
                          <div className="h-80 w-full overflow-hidden">
                            <img
                              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
                              src={item?.images[0] || "/placeholder.svg"}
                              alt={item?.title || "Project image"}
                            />
                          </div>
                          <div className="absolute inset-0 bg-gradient-to-t from-black/70 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex flex-col justify-end p-4">
                            <motion.div
                              initial={{ y: 20, opacity: 0 }}
                              whileHover={{ y: 0, opacity: 1 }}
                              transition={{ duration: 0.3 }}
                              className="text-white text-center"
                            >
                              <button className="bg-white/20 backdrop-blur-sm text-white px-6 py-2 rounded-full border border-white/30 hover:bg-white/30 transition-colors duration-300">
                                {t("gallery")}
                              </button>
                            </motion.div>
                          </div>
                        </div>

                        <div className="p-4 flex-grow flex flex-col">
                          <h3 className="text-xl font-medium line-clamp-2 mb-2 group-hover:text-primary-bg transition-colors duration-300">
                            {item?.title}
                          </h3>
                          <p className="text-gray-600 line-clamp-2 text-sm flex-grow">
                            {item?.short_description}
                          </p>
                          <div className="flex gap-2 items-center mt-3 bg-primary-bg transform origin-left">
                            <h1>{"Show Gallery"}</h1>
                            <BsArrowRight className="text-xl font-medium group-hover:translate-x-4 transition-all duration-300" />
                          </div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>

                <motion.div
                  className="flex justify-center mt-10"
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.5 }}
                >
                  <button
                    onClick={HandleService}
                    className=" relative overflow-hidden group px-3 py-3 rounded-full text-white font-medium border-2 hover:shadow-2xl shadow-xl border-black bg-0"
                    disabled={pagiLoading}
                  >
                    <span className="relative z-10 flex items-center justify-center gap-2 hover:text-white text-black">
                      {pagiLoading ? (
                        <Spinner size="sm" />
                      ) : (
                        <FaArrowDown className="group-hover:scale-150 transition-all duration-300" />
                      )}
                    </span>
                    <span className="absolute inset-0 bg-white/20 transform scale-x-0 group-hover:scale-x-100 transition-transform origin-left duration-300"></span>
                  </button>
                </motion.div>
              </>
            ) : (
              <div className="text-center py-16 text-gray-500">
                {t("notFoundProject") || "Not Found Project"}
              </div>
            )}
          </>
        )}
      </Container>
    </>
  );
};

export default ProjectPage;
