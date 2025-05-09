"use client";
import {
  CloseEye,
  GoogleIcon,
  SignUpimage,
  OpenEye,
} from "@/components/assets/icons/icon";
import Image from "next/image";
import React, { useState } from "react"; // Import useState
import { Button, Container, Spinner } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import PhoneInput from "react-phone-input-2";
// Import the CSS for phone input
import "react-phone-input-2/lib/style.css";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { encryptData } from "@/components/ApiFunction/encrypted";
import ApiFile from "../../../components/ApiFunction/ApiFile";
import { message } from "antd";
import debounce from "debounce";
import { useDispatch } from "react-redux";
import { setData } from "@/components/Redux/Slices/SignUpData";
import useApiClient from "@/components/ApiFunction/useApiClient";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();
  const { postData, header3 } = useApiClient();
  const dispatch = useDispatch();
  const { getData } = useApiClient();
  const [isLoading, setIsLoading] = useState(false);
  // api end points
  const { emailCheck, phoneCheck, sendOTP } = ApiFile;

  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showPasswordConfirm, setShowPasswordConfirm] = useState(false);

  // Validation schema for the form
  const validationSchema = Yup.object().shape({
    firstName: Yup.string().required("First name is required"),
    lastName: Yup.string().required("Last name is required"),
    phoneNumber: Yup.string().required("Phone number is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    password: Yup.string()
      .required("Password is required")
      .matches(
        /^(?=.*[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})/,
        "Password must contain 1 number, 1 special character, 1 uppercase letter, and be at least 8 characters long"
      ),
    confirmPassword: Yup.string()
      .oneOf([Yup.ref("password"), null], "Passwords must match")
      .required("Confirm Password is required"),
  });

  // phon number check api start

  const HandlePhoneCheck = debounce((phoneNumber, setFieldValue) => {
    const api = phoneCheck;
    const apiData = {
      phone: phoneNumber,
    };
    postData(api, apiData, header3)
      .then((res) => {
        if (res?.success) {
        } else {
          message.error(res?.message);
          setFieldValue("phoneNumber", "");
        }
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        setFieldValue("phoneNumber", "");
      });
  }, 300);

  // handle email check

  const HandleEmailCheck = debounce((email, setFieldValue) => {
    const api = emailCheck;
    const apiData = {
      email: email,
    };
    postData(api, apiData, header3)
      .then((res) => {
        if (res?.success) {
        } else {
          message.error(res?.message);
          setFieldValue("email", "");
        }
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        setFieldValue("email", "");
      });
  }, 300);

  // phon number check api ended

  const handleSubmit = (values) => {
    const newData = encryptData(values);
    setIsLoading(true);
    // send otp code
    const api = sendOTP;
    const apiData = {
      email: values?.email,
    };
    postData(api, apiData, header3)
      .then((res) => {
        if (res?.success) {
          setIsLoading(false);
          message.success(res?.message);
          dispatch(setData(newData));
          router.push("/auth/verification");
        } else {
          message.error(res?.message);
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
              src={SignUpimage}
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
            <Container className="flex items-center justify-center vh-100 overflow-y-auto h-[80vh] mb-5">
              <section className="w-full sm:w-[70%] vh-100">
                <div className="mb-[3rem] mt-[3rem]">
                  <h4 className="semiBold-font text-[1.4rem] color-1">
                    {t("signup")}
                  </h4>
                  <h5 className="medium-font mt-2 text-[0.8rem] color-1">
                    {t("signupDes")}
                  </h5>
                </div>

                {/* Formik form starts here */}
                <Formik
                  initialValues={{
                    firstName: "",
                    lastName: "",
                    phoneNumber: "",
                    email: "",
                    password: "",
                    confirmPassword: "",
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ setFieldValue, handleChange, handleBlur, values }) => (
                    <Form>
                      <div className="mb-3 custom_control">
                        <label
                          htmlFor="firstName"
                          className="form-label color-1 regular-font text-[1rem] mb-1"
                        >
                          {t("firstname")}
                        </label>
                        <Field
                          type="text"
                          placeholder={t("firstname")}
                          id="firstName"
                          name="firstName"
                          className="form-control borderCus"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage
                          name="firstName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="mb-3 custom_control">
                        <label
                          htmlFor="lastName"
                          className="form-label color-1 regular-font text-[1rem] mb-1"
                        >
                          {t("lastname")}
                        </label>
                        <Field
                          type="text"
                          placeholder={t("lastname")}
                          id="lastName"
                          name="lastName"
                          className="form-control borderCus"
                          onChange={handleChange}
                          onBlur={handleBlur}
                        />
                        <ErrorMessage
                          name="lastName"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <div className="mb-3 custom_control">
                        <label
                          htmlFor="phoneNumber"
                          className="form-label color-1 regular-font text-[1rem] mb-1"
                        >
                          {t("phonenumber")}
                        </label>
                        <PhoneInput
                          country={"pk"}
                          value={values.phoneNumber}
                          onChange={(value) =>
                            setFieldValue("phoneNumber", value)
                          }
                          onBlur={(e) => {
                            handleBlur(e);
                            HandlePhoneCheck(values.phoneNumber, setFieldValue);
                          }}
                          inputClass="borderCus w-[100%] phon_inp"
                        />
                        <ErrorMessage
                          name="phoneNumber"
                          component="div"
                          className="text-danger"
                        />
                      </div>

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
                          onBlur={(e) => {
                            handleBlur(e);
                            HandleEmailCheck(values.email, setFieldValue);
                          }}
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

                      <div className="mb-2 custom_control">
                        <label
                          htmlFor="password"
                          className="form-label color-1 regular-font text-[1rem] mb-1"
                        >
                          {t("formPassC")}
                        </label>
                        <div className="relative">
                          <Field
                            type={showPasswordConfirm ? "text" : "password"}
                            placeholder="********"
                            id="confirmPassword"
                            name="confirmPassword"
                            className="form-control borderCus"
                            onChange={handleChange}
                            onBlur={handleBlur}
                          />
                          <button
                            type="button"
                            onClick={() =>
                              setShowPasswordConfirm(!showPasswordConfirm)
                            }
                            className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 w-[1rem]"
                          >
                            {showPasswordConfirm ? (
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
                          name="confirmPassword"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      <Button
                        type="submit"
                        disabled={isLoading}
                        className="btn w-[100%] rounded-[10px] h-[3rem] primary-bg medium-font mt-2 text-[1rem] border border-primary-bg primBnt"
                      >
                        {isLoading ? (
                          <>
                            <Spinner size="sm" />
                          </>
                        ) : (
                          <>{t("signup")}</>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
                {/* Formik form ends here */}

                <h4 className="mt-4 text-center text-[1rem] semiBold-font color-3">
               
                  {t("alredyacc")}
                  <Link
                    href={"/auth/login"}
                    className="primary-color cursor-pointer ms-2"
                  >
                  {t("signIntext")}
                  </Link>
                </h4>
              </section>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
