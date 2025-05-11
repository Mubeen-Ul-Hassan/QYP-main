"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import { Skeleton } from "antd";
import { message } from "antd";
import debounce from "debounce";
import Image from "next/image";
import Link from "next/link";

import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import {
  serviceimg,
  FloorGrinding,
  ConcretePolishing,
  Grinding,
  Painicon,
  IndoorIcon,
  NailCutting,
  Patching,
  DiomandDriling,
} from "@/components/assets/icons/icon";

const ServicesPage = () => {
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

  // Animation variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
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

  const fadeIn = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  };

  return (
    <>
      {/* Hero Section */}
      <motion.section
        initial="hidden"
        animate="visible"
        variants={fadeIn}
        className="relative bg-gradient-to-r from-black to-gray-800 text-white py-24 overflow-hidden"
      >
        <div className="absolute inset-0 opacity-100">
          <div className="absolute inset-0 bg-[url('/placeholder.svg?height=500&width=1000')] bg-cover bg-center"></div>
        </div>
        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <motion.h1
              className="text-4xl md:text-5xl font-bold mb-6"
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.5 }}
            >
              {t("servicePageTitle")}
            </motion.h1>
            <motion.p
              className="text-lg md:text-xl opacity-90 mb-8"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
            >
              {t("servicePageDes")}
            </motion.p>
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.6, duration: 0.5 }}
            >
              <Link
                href="/contact"
                className="inline-block bg-white text-gray-900 font-medium py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300"
              >
                {t("serviceContact")}
              </Link>
            </motion.div>
          </div>
        </div>
        {/* <div className="absolute bottom-0 left-0 w-full h-16 bg-gradient-to-t from-white to-transparent"></div> */}
      </motion.section>

      {/* Services Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <motion.div
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, margin: "-100px" }}
            variants={fadeIn}
            className="text-center mb-16"
          >
            <div className="relative inline-block">
              <Image
                className="h-[4rem] w-[24rem]"
                src={serviceimg || "/placeholder.svg"}
                alt=""
              />
              <h5 className="absolute inset-0 uppercase flex items-center justify-center text-gray-800 font-medium text-xl">
                {t("servicePageTitle")}
              </h5>
            </div>
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mt-6 max-w-2xl mx-auto">
              {t("servicePagesbTitle")}
            </h2>
          </motion.div>

          {serviceLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {[1, 2, 3, 4, 5, 6].map((item) => (
                <div
                  key={item}
                  className="bg-white rounded-xl shadow-lg p-6 h-[350px]"
                >
                  <Skeleton active paragraph={{ rows: 6 }} />
                </div>
              ))}
            </div>
          ) : (
            <>
              {serviceData?.length > 0 ? (
                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  whileInView="visible"
                  viewport={{ once: true, margin: "-100px" }}
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8"
                >
                  {serviceData?.map((item, index) => (
                    <motion.div
                      key={index}
                      variants={itemVariants}
                      whileHover={{
                        y: -10,
                        transition: { duration: 0.3 },
                      }}
                      className="group"
                    >
                      <div
                        onClick={() => HanldeDetail(item)}
                        className="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 h-full relative p-8 flex flex-col items-center cursor-pointer"
                      >
                        <div className="mb-6 transform group-hover:scale-110 transition-transform duration-300">
                          <img
                            src={item?.image || "/placeholder.svg"}
                            className="h-[7rem] w-[7rem] object-contain"
                            alt={item?.title || "Service"}
                          />
                        </div>
                        <h3 className="text-xl font-bold text-gray-900 mb-4 text-center capitalize line-clamp-2 pb-3 border-b border-gray-200">
                          {item?.title}
                        </h3>
                        <p className="text-gray-600 text-center mb-12 line-clamp-2">
                          {item?.description}
                        </p>
                        <div className="absolute -bottom-3 left-0 right-0 flex justify-center pb-6">
                          <span className="bg-gradient-to-r from-black to-gray-950 text-white font-medium py-3 px-6 rounded-lg transform group-hover:scale-105 transition-transform duration-300">
                            {t("seeProject")}
                          </span>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </motion.div>
              ) : (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.5 }}
                  className="text-center py-12"
                >
                  <h5 className="text-gray-500 text-lg">
                    {t("serviceNotFound")}
                  </h5>
                </motion.div>
              )}
            </>
          )}

          {/* Load More / Contact Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="mt-16 text-center"
          >
            {!noMoreServices && serviceData.length > 0 && (
              <button
                onClick={HandleService}
                disabled={isLoading}
                className="bg-black hover:bg-white text-white font-medium py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-300 disabled:opacity-70"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center">
                    <svg
                      className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    {t("loading")}
                  </span>
                ) : (
                  t("seeMore")
                )}
              </button>
            )}

            {noMoreServices && (
              <Link
                href="/contact"
                className="inline-block bg-black text-white font-medium py-3 px-8 rounded-lg hover:shadow-lg transition-all duration-300 mt-4"
              >
                {t("serviceContact")}
              </Link>
            )}
          </motion.div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="text-center mb-16"
          >
            <h2 className="text-3xl font-bold text-gray-900 mb-4">
              {t("ourExpertise")}
            </h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              {t("expertiseDescription")}
            </p>
          </motion.div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
            className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6"
          >
            {[
              { icon: FloorGrinding, name: "Floor Grinding" },
              { icon: ConcretePolishing, name: "Concrete Polishing" },
              { icon: Grinding, name: "Grinding" },
              { icon: Painicon, name: "Paint Removal" },
              { icon: IndoorIcon, name: "Indoor Services" },
              { icon: NailCutting, name: "Nail Cutting" },
              { icon: Patching, name: "Patching" },
              { icon: DiomandDriling, name: "Diamond Drilling" },
            ].map((service, index) => (
              <motion.div
                key={index}
                variants={itemVariants}
                className="bg-white rounded-xl shadow-md p-6 text-center hover:shadow-lg transition-all duration-300"
              >
                <div className="flex justify-center mb-4">
                  <Image
                    src={service.icon || "/placeholder.svg"}
                    alt={service.name}
                    className="h-16 w-16 object-contain"
                  />
                </div>
                <h3 className="text-gray-900 font-medium">{service.name}</h3>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* CTA Section */}
      <motion.section
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.8 }}
        className="py-20 bg-black text-white"
      >
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            {t("readyToStart")}
          </h2>
          <p className="text-xl opacity-90 mb-8 max-w-2xl mx-auto">
            {t("ctaDescription")}
          </p>
          <Link
            href="/contact"
            className="inline-block bg-white text-gray-900 font-medium py-3 px-8 rounded-lg hover:bg-gray-100 transition-colors duration-300"
          >
            {t("getInTouch")}
          </Link>
        </div>
      </motion.section>
    </>
  );
};

export default ServicesPage;
