"use client";
import { BannerImg } from "@/components/assets/icons/icon";
import Image from "next/image";
import Link from "next/link";
import { Container } from "react-bootstrap";
import { useTranslation } from "react-i18next";
import { IoArrowForwardCircleOutline } from "react-icons/io5";

const Banner = () => {
  const { t } = useTranslation();

  return (
    <section className="bg-5 min-h-[30rem] py-12 relative overflow-hidden">
      <Container className="relative z-10">
        <div className="max-w-[1540px] mx-auto lg:px-[5rem]">
          <div className="flex flex-col md:flex-row items-center gap-8">
            {/* Content Column */}
            <div className="w-full md:w-1/2 order-2 md:order-1">
              <div className="p-6 md:p-8 backdrop-blur-sm bg-white/5 rounded-2xl border border-white/10">
                <h2 className="bebas-regular-font text-[2.5rem] md:text-[3.5rem] capitalize color-1 leading-tight">
                  {t("bannerHead")}
                </h2>

                <p className="color-4 my-6 text-[1.1rem] medium-font max-w-[30rem]">
                  {t("bannersbHead")}
                </p>

                <Link
                  href="/servicess"
                  className="rounded-[10px] mt-6 text-[1.1rem] gap-3 flex items-center cursor-pointer primary-bg py-[12px] px-[24px] text-white text-center w-fit medium-font hover:shadow-lg transition-all duration-300"
                >
                  {t("getStarted")}
                  <IoArrowForwardCircleOutline className="text-[1.3rem]" />
                </Link>
              </div>
            </div>

            {/* Image Column */}
            <div className="w-full md:w-1/2 order-1 md:order-2 flex justify-center items-center">
              <div className="relative">
                <div className="absolute -inset-4 rounded-full primary-bg opacity-10 blur-xl"></div>
                <Image
                  src={BannerImg || "/placeholder.svg"}
                  className="object-contain h-[25rem] md:h-[30rem] w-auto relative z-10 drop-shadow-2xl"
                  alt={t("bannerHead")}
                />
              </div>
            </div>
          </div>
        </div>
      </Container>

      {/* Background Elements */}
      <div className="absolute top-0 right-0 w-1/2 h-full bg-gradient-to-l from-primary-bg/20 to-transparent -z-10 max-md:hidden"></div>
      <div className="absolute bottom-0 left-0 w-full h-1/3 bg-gradient-to-t from-primary-bg/10 to-transparent -z-10"></div>
    </section>
  );
};

export default Banner;
