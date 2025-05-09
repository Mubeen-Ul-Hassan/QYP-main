"use client";
import { ForgetImg } from "@/components/assets/icons/icon";
import Image from "next/image";
import React, { useState } from "react"; // Import useState
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { encryptData } from "@/components/ApiFunction/encrypted";
import ApiFile from "@/components/ApiFunction/ApiFile";
import useApiClient from "@/components/ApiFunction/useApiClient";
import { message, Skeleton } from "antd";
import { useRouter } from "next/navigation";
import { setData } from "@/components/Redux/Slices/SignUpData";
import { useDispatch } from "react-redux";
import { setOtherData } from "@/components/Redux/Slices/otherData";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();
  const { forgetEmail } = ApiFile;
  const { postData, header3 } = useApiClient();
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
  });

  const handleSubmit = (values) => {
    setIsLoading(true);
    const api = forgetEmail;
    const apiData = {
      email: values?.email,
    };
    const newData = encryptData(values);
    postData(api, apiData, header3)
      .then((res) => {
        if (res?.success) {
          const response = encryptData(res);
          message.success(res?.message);
          dispatch(setData(newData));
          dispatch(setOtherData(response));
          router.push("/auth/forget-verification");
        }

        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        setIsLoading(false);
      });
  };

  return (
    <>
      <div className="max-w-[1540px] grid mx-auto overflow-hidden">
        <div className="flex">
          <div className="w-2/4 max-md:hidden relative overlaycus">
            <Image
              src={ForgetImg}
              className="vh-100 xl:object-contain min-[1540px]:object-cover max-xl:object-cover object-bottom"
              alt=""
            />
            <div className="absolute inset-0 flex flex-col justify-center items-center text-white">
              <div>
                <h4 className="bebas-regular-font text-[3rem] text-left leading-[3rem]">
                  Best Helping Hands <br /> for you
                </h4>
                <h5 className="bebas-regular-font text-[1.1rem] text-left leading-[2rem]">
                  With Our On-Demand Services App <br />
                  We Give Better Services To You.
                </h5>
              </div>
            </div>
          </div>

          <div className="w-2/4 max-md:w-[100%]">
            <Container className="flex items-center justify-center vh-100 overflow-y-auto">
              <section className="w-full sm:w-[70%] vh-100">
                <div className="mb-[3rem] mt-[3rem]">
                  <h4 className="semiBold-font text-[1.4rem] color-1">
                    {t("getStarted")}
                  </h4>
                  <h5 className="medium-font mt-2 text-[0.8rem] color-1">
                    {t("forgetDes")}
                  </h5>
                </div>

                {/* Formik form starts here */}
                <Formik
                  initialValues={{ email: "" }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ handleChange, handleBlur }) => (
                    <Form>
                      <div className="mb-3 custom_control">
                        <label
                          htmlFor="email"
                          className="form-label color-1 regular-font text-[1rem] mb-1"
                        >
                          {t("formEmail")}
                        </label>
                        <Field
                          type="email"
                          placeholder={t("formEmail")}
                          id="email"
                          name="email"
                          className="form-control borderCus"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <Button
                        disabled={isLoading}
                        type="submit"
                        className="btn w-[100%] rounded-[10px] h-[3rem] primary-bg medium-font mt-2 text-[1rem] border border-primary-bg primBnt"
                      >
                        {isLoading ? (
                          <>
                            <Spinner size="sm" />
                          </>
                        ) : (
                          <>{t("forgetBtn")}</>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
                {/* Formik form ends here */}
              </section>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
