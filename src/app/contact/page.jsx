/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import React, { useEffect, useState } from "react";
import { Col, Container, Row, Spinner } from "react-bootstrap";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { LiaPhoneVolumeSolid } from "react-icons/lia";
import { RiMapPinLine } from "react-icons/ri";
import Select from "react-select";

import { MdOutlineMail } from "react-icons/md";
import PhoneInput from "react-phone-input-2";
import ApiFile from "@/components/ApiFunction/ApiFile";

import debounce from "debounce";
import { message } from "antd";
import useApiClient from "@/components/ApiFunction/useApiClient";
import { useTranslation } from "react-i18next";
const Page = () => {
  const { t } = useTranslation();
  const { contactAPi } = ApiFile;
  const { postData, header1 } = useApiClient();
  const [messagePlaceholder, setMessagePlaceholder] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const initialValues = {
    name: "",
    email: "",
    phoneNumber: "",
    message: "",
    contactReason: "",
  };
  const contactOptions = [
    { value: "services", label: "Contact us for services" },
    { value: "goods", label: "Contact us about goods/products" },
  ];
  const validationSchema = Yup.object({
    name: Yup.string().required("Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phoneNumber: Yup.string()
      .matches(/^[0-9]+$/, "Phone number must be numeric")
      .required("Phone number is required"),
    message: Yup.string().required("Message is required"),
    contactReason: Yup.string().required("Please select a reason for contact"),
  });

  const handleSubmit = debounce((values, resetForm) => {
    setIsLoading(true);
    const api = contactAPi;
    const apiData = {
      name: values?.name,
      email: values?.email,
      msg: values?.message,
      phone: values?.phoneNumber,
      reason: values?.contactReason,
    };
    postData(api, apiData, header1)
      .then((res) => {
        if (res?.success) {
          message.success("Message Successfully Sent");
          resetForm();
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setIsLoading(false);
        message.error(error?.response?.data?.message);
      });
  }, 300);
  const [isExpanded, setIsExpanded] = useState(false);
  return (
    <>
      <BreadCrumbs breadName={t("footerTitle3")} />

      <Container fluid="xxl" className="mb-[4rem]">
        <section className="border_19 rounded-[6px]">
          <div className="mb-4">
            <h4 className="color-0 bebas-regular-font capitalize text-[3rem]">
              {t("contactPageTitle")}
            </h4>

            <section>
              <Row className="g-3">
                <Col md={12}>
                  <div className="flex flex-col gap-3 shadow2 py-[20px] px-[10px] h-[100%]">
                    <p
                      className={`color-0  regular-font text-[1rem] cursor-pointer ${
                        !isExpanded ? "max-[558px]:line-clamp-2" : ""
                      } max-[558px]:text-justify`}
                    >
                      {t("contactPageDes")}
                    </p>
                    <div className="hidden max-[558px]:block">
                      <button
                        className="colo-0 medium-font mt-2 self-start"
                        onClick={() => setIsExpanded(!isExpanded)}
                      >
                        {isExpanded ? "See Less" : "See More"}
                      </button>
                    </div>
                  </div>
                </Col>
              </Row>
            </section>

            <Row className="g-3 mt-4">
              <Col md={12} lg={4} xl={4}>
                <Row className="g-3 mb-5">
                  <Col
                    className="cursor-pointer"
                    xs={12}
                    sm={6}
                    md={6}
                    lg={12}
                    xl={12}
                  >
                    <div className="flex gap-3 shadow2 py-[20px] px-[10px] h-[100%]">
                      <LiaPhoneVolumeSolid className="text-[1.8rem]" />
                      <div className="flex flex-col">
                        <h4 className="semiBold-font text-[0.9rem]  color-0 ">
                          {t("phoneText")}
                        </h4>
                        <h4 className="medium-font text-[0.8rem] primary-color mt-2">
                          +358 44 747 48 18
                        </h4>
                      </div>
                    </div>
                  </Col>
                  <Col
                    className="cursor-pointer"
                    xs={12}
                    sm={6}
                    md={6}
                    lg={12}
                    xl={12}
                  >
                    <div className="flex gap-3 shadow2 py-[20px] px-[10px] h-[100%]">
                      <RiMapPinLine className="text-[1.8rem]" />
                      <div className="flex flex-col">
                        <h4 className="semiBold-font text-[0.9rem] color-0 ">
                          {t("addressText")}
                        </h4>
                        <h4 className="medium-font text-[0.8rem] primary-color mt-2">
                          Pahnakuja 1 21420 Lieto
                        </h4>
                      </div>
                    </div>
                  </Col>
                  <Col
                    className="cursor-pointer"
                    xs={12}
                    sm={6}
                    md={6}
                    lg={12}
                    xl={12}
                  >
                    <div className="flex gap-3 shadow2 py-[20px] px-[10px] h-[100%]">
                      <MdOutlineMail className="text-[1.8rem]" />
                      <div className="flex flex-col">
                        <h4 className="semiBold-font text-[0.9rem] color-0 ">
                          {t("mailText")}
                        </h4>
                        <h4 className="medium-font text-[0.8rem] primary-color mt-2">
                          kup.volkan@qyp.fi
                        </h4>
                      </div>
                    </div>
                  </Col>
                  <Col
                    className="cursor-pointer"
                    xs={12}
                    sm={6}
                    md={6}
                    lg={12}
                    xl={12}
                  >
                    <div className="flex gap-3 shadow2 py-[20px] px-[10px] h-[100%]">
                      <MdOutlineMail className="text-[1.8rem]" />
                      <div className="flex flex-col">
                        <h4 className="semiBold-font text-[0.9rem] color-0 ">
                          {t("mailText2")}
                        </h4>
                        <h4 className="medium-font text-[0.8rem] primary-color mt-2">
                          info@qyp.fi
                        </h4>
                      </div>
                    </div>
                  </Col>
                </Row>
              </Col>
              <Col md={12} lg={8} xl={8}>
                <Formik
                  initialValues={initialValues}
                  validationSchema={validationSchema}
                  onSubmit={(values, { resetForm }) =>
                    handleSubmit(values, resetForm)
                  }
                >
                  {({ setFieldValue, values }) => {
                    useEffect(() => {
                      if (values.contactReason === "services") {
                        setMessagePlaceholder(
                          "Tell us more about the requirements or details of your project. Thank you for considering our services. We look forward to working with you to realize your project."
                        );
                      } else if (values.contactReason === "goods") {
                        setMessagePlaceholder(
                          "Indicate which material you are interested in, Required Quantity, Additional information or Special requests. Thank you for choosing our quality products. We look forward to serving you with the best tools and materials tailored to your needs."
                        );
                      } else {
                        setMessagePlaceholder("");
                      }
                    }, [values.contactReason]);

                    return (
                      <Form>
                        <div className="mb-3 custom_control">
                          <Field
                            name="name"
                            placeholder="Name*"
                            className="form-control borderCus"
                            type="text"
                          />
                          <ErrorMessage
                            name="name"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="mb-3 custom_control">
                          <Field
                            className="form-control borderCus"
                            placeholder="Email*"
                            name="email"
                            type="email"
                          />
                          <ErrorMessage
                            name="email"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="mb-3 custom_control">
                          <Select
                            id="contactReason"
                            options={contactOptions}
                            className="borderCus rounded-[6px]"
                            onChange={(option) =>
                              setFieldValue("contactReason", option?.value)
                            }
                            placeholder="Select reason"
                          />
                          <ErrorMessage
                            name="contactReason"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="mb-3 custom_control">
                          <PhoneInput
                            country={"fi"}
                            value={values.phoneNumber}
                            onChange={(value) =>
                              setFieldValue("phoneNumber", value)
                            }
                            inputClass="borderCus w-[100%] phon_inp"
                          />
                          <ErrorMessage
                            name="phoneNumber"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <div className="mb-3 custom_control">
                          <Field
                            className="form-control borderCus"
                            placeholder={messagePlaceholder}
                            name="message"
                            as="textarea"
                            rows={6}
                          />
                          <ErrorMessage
                            name="message"
                            component="div"
                            className="text-danger"
                          />
                        </div>

                        <button
                          type="submit"
                          className="primary-bg w-100 text-white text-[1rem] bold-font py-[10px] rounded-[10px] mt-3"
                          disabled={isLoading}
                        >
                          {isLoading ? (
                            <>
                              <Spinner size="sm" />
                            </>
                          ) : (
                            <>{t("sendText")}</>
                          )}
                        </button>
                      </Form>
                    );
                  }}
                </Formik>
              </Col>
            </Row>
          </div>
        </section>
      </Container>
    </>
  );
};

export default Page;
