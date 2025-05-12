/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/no-unescaped-entities */
"use client";
import React, { Suspense, useEffect, useState } from "react";
import { Button, Col, Container, Row, Spinner } from "react-bootstrap";
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
import { useRouter } from "next/router";
import { useSearchParams } from "next/navigation";
import { uploadDocFile } from "@/components/ApiFunction/uploadFile";
import toast from "react-hot-toast";
const CourceForm = () => {
  const { t } = useTranslation();
  const { postData, header1, header2 } = useApiClient();
  const [isLoading, setIsLoading] = useState(false);
  const { createCourceApply, docUpload } = ApiFile;
  const [fileLoading, setFileLoading] = useState(false);
  const searchParams = useSearchParams();
  const urlTitle = searchParams.get("title");

  const handleSubmit = debounce((values, resetForm) => {
    setIsLoading(true);
    const api = createCourceApply;
    const apiData = {
      name: values?.name,
      email: values?.email,
      serviceName: urlTitle,
      file: values?.resume,
    };
    postData(api, apiData, header1)
      .then((res) => {
        if (res?.success) {
          message.success(res?.message);
          resetForm();
        }
        setIsLoading(false);
      })
      .catch((error) => {
        console.log(error);
        message.error(error?.response?.data?.message);
        setIsLoading(false);
      });
  }, 300);
  const handleFileChange = async (event, setFieldValue) => {
    setFileLoading(true);
    const file = event.target.files[0];

    // Validate file type
    const isValidFile =
      file && ["application/pdf", "application/msword"].includes(file.type);

    if (!isValidFile) {
      setFileLoading(false);
      toast.error("Invalid file type. Please upload a PDF or Word document.");
      return;
    }

    try {
      const formData = new FormData();
      formData.append("file", file);

      // Upload file using your API
      const response = await postData(docUpload, formData, header2);
      setFileLoading(false);
      if (response?.file) {
        // Set the file link or object to Formik's 'resume' field
        setFieldValue("resume", response?.file);
        toast.success("File uploaded successfully!");
      } else {
        toast.error("File upload failed. Please try again.");
        setFileLoading(false);
      }
    } catch (error) {
      console.error("Error uploading file:", error);
      toast.error("Error uploading file. Please try again.");
      setFileLoading(false);
    }
  };

  return (
    <>
      <Container fluid="xxl" className="mb-[4rem]">
        <section className="border_19 rounded-[6px] py-[2rem]">
          <div className="mb-4">
            <Row className="g-3 mt-4">
              <Col md={12} lg={4} xl={4}>
                <h5 className="bold-font text-[1.2rem]">How to Apply</h5>
                <ul className="mt-3">
                  <div className="flex items-baseline mb-2 gap-2">
                    <h4 className="semiBold-font color-0">Step 1</h4>:
                    <li className="color-4 regular-font text-[0.9rem]">
                      Fill out our online application form below.
                    </li>
                  </div>
                  <div className="flex items-baseline mb-2 gap-2">
                    <h4 className="semiBold-font color-0">Step 2</h4>:
                    <li className="color-4 regular-font text-[0.9rem]">
                      Submit your resume and a brief statement about your
                      interest in concrete services.
                    </li>
                  </div>
                  <div className="flex items-baseline mb-2 gap-2">
                    <h4 className="semiBold-font color-0">Step 3</h4>:
                    <li className="color-4 regular-font text-[0.9rem]">
                      Await confirmation and additional details from our team.
                    </li>
                  </div>
                </ul>
              </Col>
              <Col md={12} lg={8} xl={8}>
                <Formik
                  initialValues={{
                    name: "",
                    email: "",
                    resume: null,
                  }}
                  validationSchema={Yup.object({
                    name: Yup.string().required("Name is required"),
                    email: Yup.string()
                      .email("Invalid email address")
                      .required("Email is required"),
                    resume: Yup.mixed()
                      .required("Resume is required")
                      .test(
                        "fileExists",
                        "Resume is required",
                        (value) => !!value
                      ),
                  })}
                  onSubmit={(values, { resetForm }) =>
                    handleSubmit(values, resetForm)
                  }
                >
                  {({ setFieldValue, values }) => (
                    <Form>
                      {/* Name Field */}
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

                      {/* Email Field */}
                      <div className="mb-3 custom_control">
                        <Field
                          name="email"
                          placeholder="Email*"
                          className="form-control borderCus"
                          type="email"
                        />
                        <ErrorMessage
                          name="email"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* Resume Upload Field */}
                      <div className="mb-3 custom_control">
                        <input
                          disabled={fileLoading}
                          id="resume"
                          name="resume"
                          type="file"
                          className="form-control borderCus"
                          onChange={(event) =>
                            handleFileChange(event, setFieldValue)
                          }
                        />
                        <ErrorMessage
                          name="resume"
                          component="div"
                          className="text-danger"
                        />
                      </div>

                      {/* Submit Button */}
                      <button
                        type="submit"
                        className="primary-bg w-100 text-white text-[1rem] bold-font py-[10px] rounded-[10px] mt-3"
                        disabled={isLoading || fileLoading}
                      >
                        {isLoading ? (
                          <>
                            <Spinner size="sm" />
                          </>
                        ) : (
                          <>Submit</>
                        )}
                      </button>
                    </Form>
                  )}
                </Formik>
              </Col>
            </Row>
          </div>
        </section>
      </Container>
    </>
  );
};

const Page = () => (
  <Suspense fallback={<Spinner animation="border" />}>
    <CourceForm />
  </Suspense>
);

export default Page;
