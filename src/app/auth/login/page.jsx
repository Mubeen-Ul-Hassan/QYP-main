"use client";
import {
  CloseEye,
  GoogleIcon,
  LoginImg,
  OpenEye,
} from "@/components/assets/icons/icon";
import Image from "next/image";
import React, { useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import Link from "next/link";
import useApiClient from "@/components/ApiFunction/useApiClient";
import ApiFile from "@/components/ApiFunction/ApiFile";
import { useRouter } from "next/navigation";
import { message } from "antd";
import { setUser } from "@/components/Redux/Slices/AuthSlice";
import { encryptData } from "@/components/ApiFunction/encrypted";
import { useDispatch } from "react-redux";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();
  const [showPassword, setShowPassword] = useState(false);
  const { postData, header3 } = useApiClient();
  const [isLoadiing, setIsLoading] = useState(false);
  const { Login } = ApiFile;
  const dispatch = useDispatch();
  const router = useRouter();
  const validationSchema = Yup.object().shape({
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .min(6, "Password must be at least 6 characters long")
      .required("Password is required"),
  });

  const handleSubmit = (values) => {
    setIsLoading(true);
    const apiLogin = Login;
    const apiData = {
      email: values?.email,
      password: values?.password,
    };
    postData(apiLogin, apiData, header3)
      .then((res) => {
        setIsLoading(false);
        if (res?.success) {
          message.success("Login Successfully");
          const newData = encryptData(res);
          dispatch(setUser(newData));
          router.push("/");
        }
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
              src={LoginImg}
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
                    {t("logintext")}
                  </h4>
                  <h5 className="medium-font mt-2 text-[0.8rem] color-1">
                    {t("loginDes")}
                  </h5>
                </div>

                {/* Formik form starts here */}
                <Formik
                  initialValues={{ email: "", password: "" }}
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
                          placeholder="Your Email address"
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

                      <div className="mb-2 custom_control">
                        <label
                          htmlFor="password"
                          className="form-label color-1 regular-font text-[1rem] mb-1"
                        >
                          {t("formPass")}
                        </label>
                        <div className="relative">
                          <Field
                            type={showPassword ? "text" : "password"}
                            placeholder="********"
                            id="password"
                            name="password"
                            className="form-control borderCus"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <button
                            type="button"
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-[1rem]"
                          >
                            {showPassword ? (
                              <>
                                <Image className="" src={OpenEye} alt="" />
                              </>
                            ) : (
                              <>
                                <Image className="" src={CloseEye} alt="" />
                              </>
                            )}
                          </button>
                        </div>
                        <ErrorMessage
                          name="password"
                          component="div"
                          className="text-danger"
                        />
                      </div>
                      <div>
                        <Link
                          href={"/auth/forgetPassword"}
                          className="primary-color flex justify-end semiBold-font text-[1rem] text-right mb-2 cursor-pointer"
                        >
                          {t("formForget")}?
                        </Link>
                      </div>

                      <Button
                        disabled={isLoadiing}
                        type="submit"
                        className="btn w-[100%] rounded-[10px] h-[3rem] primary-bg medium-font mt-2 text-[1rem] border border-primary-bg primBnt"
                      >
                        {isLoadiing ? (
                          <>
                            <Spinner size="sm" />
                          </>
                        ) : (
                          "Sign In"
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
                {/* Formik form ends here */}

                <h4 className="mt-4 text-center text-[1rem] semiBold-font color-3">
                  {t("accountCreat")}
                  <Link
                    href={"/auth/signUp"}
                    className="primary-color cursor-pointer ms-2"
                  >
                     {t("signinBtn")}
                    
                  </Link>
                </h4>
                {/* <h4 className="mt-4 text-center text-[1rem] regular-font primary-color">
                  Continue as guest
                </h4> */}
              </section>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
