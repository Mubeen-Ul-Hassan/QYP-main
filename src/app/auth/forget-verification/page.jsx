"use client";
import { VerificationImg } from "@/components/assets/icons/icon";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { Button, Container, Spinner } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import VerificationInput from "react-verification-input";
import { useRouter } from "next/navigation";
import ApiFile from "@/components/ApiFunction/ApiFile";
import { setData } from "@/components/Redux/Slices/SignUpData";
import { useDispatch, useSelector } from "react-redux";
import { decryptData, encryptData } from "@/components/ApiFunction/encrypted";
import { message } from "antd";
import debounce from "debounce";
import useApiClient from "@/components/ApiFunction/useApiClient";
import { setUser } from "@/components/Redux/Slices/AuthSlice";
import { setOtherData } from "@/components/Redux/Slices/otherData";
import { useTranslation } from "react-i18next";

const Page = () => {
  const { t } = useTranslation();
  const { forgetEmail, forgetOTP, signUp } = ApiFile;
  const { postData, header3, signUpData, decrypOtherData } = useApiClient();
  const [otp, setOtp] = useState("");
  const [seconds, setSeconds] = useState(30);
  const [resendAvailable, setResendAvailable] = useState(false);
  const [otpLoading, setOtpLoading] = useState(false);

  const dispatch = useDispatch();
  const router = useRouter();
  let dataDey = "";
  if (signUpData) {
    dataDey = decryptData(signUpData);
  }
  // Validation schema for the form

  const initialValues = {
    otp: "",
  };

  const validationSchema = Yup.object().shape({
    otp: Yup.string()
      .length(5, "OTP must be 5 characters")
      .required("OTP is required"),
  });

  const handleOtpChange = (value) => {
    setOtp(value);
  };

  useEffect(() => {
    let timer;
    if (seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    } else {
      setResendAvailable(true);
    }

    return () => clearInterval(timer);
  }, [seconds]);

  const handleResendCode = () => {
    setSeconds(30);
    setResendAvailable(false);
    HandleResendOTP();
    setOtp("");
  };

  // re sent OTP code

  const HandleResendOTP = debounce(() => {
    const api = forgetEmail;
    const apiData = {
      email: dataDey?.email,
    };
    postData(api, apiData, header3)
      .then((res) => {
        if (res?.success) {
          const response = encryptData(res);
          dispatch(setOtherData(response));
          message.success(res?.message);
          setOtp("");
        }
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
      });
  }, 300);

  // handle submit
  const handleSubmit = debounce((values) => {
    setOtpLoading(true);
    const api = forgetOTP;
    const apiData = {
      token: decrypOtherData?.token,
      code: values?.otp,
    };
    postData(api, apiData, header3)
      .then((res) => {
        setOtpLoading(false);
        if (res?.success) {
          message.success(res?.message);
          router.push("/auth/password-update");
          setOtp("");
        } else {
          setOtp("");
        }
      })
      .catch((error) => {
        console.log(error);
        setOtpLoading(false);
        message.error(error?.response?.data?.message);
      });
  }, 300);

  return (
    <>
      <div className="max-w-[1540px] grid mx-auto overflow-hidden">
        <div className="flex">
          <div className="w-2/4 max-md:hidden relative overlaycus">
            <Image
              src={VerificationImg}
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
                  {t("verifyTitle")}
                  </h4>
                  <h5 className="medium-font mt-2 text-[0.8rem] color-1">
                  {t("verifyDes")}
                  </h5>
                </div>

                {/* Formik form starts here */}
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ setFieldValue, handleChange, handleBlur, values }) => (
                    <Form>
                      <VerificationInput
                        classNames={{
                          container: "container",
                          character: "character",
                          characterInactive: "character--inactive",
                          characterSelected: "character--selected",
                          characterFilled: "character--filled",
                        }}
                        length={5}
                        onChange={(value) => {
                          handleOtpChange(value);
                          setFieldValue("otp", value);
                        }}
                        placeholder="-"
                      />
                      <ErrorMessage
                        name="otp"
                        component="div"
                        className="text-danger mt-2"
                      />

                      <Button
                        disabled={otp?.length < 5 || otpLoading}
                        type="submit"
                        className="btn w-[100%] rounded-[10px] mt-4 h-[3rem] primary-bg medium-font text-[1rem] border border-primary-bg primBnt"
                      >
                        {otpLoading ? (
                          <>
                            <Spinner size="sm" />
                          </>
                        ) : (
                          <>
                          {t("continueText")}
                          </>
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
                {/* Formik form ends here */}

                {!resendAvailable ? (
                  <h4 className="mt-4 text-center text-[1rem] semiBold-font color-3">
                   {t("resentBtn")} in
                    <span className="primary-color cursor-pointer ms-2">
                      0:{seconds < 10 ? `0${seconds}` : seconds}
                    </span>
                  </h4>
                ) : (
                  <h4 className="mt-4 text-center flex items-center justify-center text-[1rem] semiBold-font color-3">
                    {t("getCodebtn")}
                    <div
                      className="primary-color cursor-pointer ms-2"
                      onClick={handleResendCode} // Reset timer on click
                    >
                     {t("resentBtn")}
                    </div>
                  </h4>
                )}
              </section>
            </Container>
          </div>
        </div>
      </div>
    </>
  );
};

export default Page;
