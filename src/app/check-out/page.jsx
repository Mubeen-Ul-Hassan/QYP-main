/* eslint-disable react-hooks/exhaustive-deps */
"use client";
import BreadCrumbs from "@/components/BreadCrumbs/BreadCrumbs";
import { Button, Col, Container, Modal, Row, Spinner } from "react-bootstrap";
import React, { useEffect, useState } from "react";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import { FiLogIn } from "react-icons/fi";
import Image from "next/image";
import { FaCcPaypal } from "react-icons/fa6";
import { SiPayoneer } from "react-icons/si";
import { encryptData } from "@/components/ApiFunction/encrypted";
import PhoneInput from "react-phone-input-2";
import Autocomplete from "react-google-autocomplete";
import useApiClient from "@/components/ApiFunction/useApiClient";
import {
  clearCart,
  removeFromCart,
  selectCart,
  updateProductQuantity,
} from "@/components/Redux/Slices/cartData";
import { useDispatch, useSelector } from "react-redux";
import ApiFile from "@/components/ApiFunction/ApiFile";
import { message } from "antd";
import { useRouter } from "next/navigation";
import debounce from "debounce";
import {
  selectOrderData,
  setOrderData,
} from "@/components/Redux/Slices/orderSlice";
import { loadStripe } from "@stripe/stripe-js";
import { Elements } from "@stripe/react-stripe-js";
import PaymentCheckCheckout from "./PaymentCheckCheckout";

const Page = () => {
  const { GoogleApiKey, postData, header1 } = useApiClient();
  const { orderCreate, productsCheck, stripApi } = ApiFile;
  const dataOrder = useSelector(selectOrderData);
  const dispatch = useDispatch();
  const [locationDetails, setLocationDetails] = useState(null);
  const [useDifferentAddress, setUseDifferentAddress] = useState(false);
  const router = useRouter();
  const cartItems = useSelector(selectCart);
  const [isLoading, setIsLoading] = useState(false);
  const totalAmount = cartItems.reduce(
    (sum, item) => sum + item?.totalPrice,
    0
  );
  const validationSchema = Yup.object().shape({
    fname: Yup.string().required("First Name is required"),
    lname: Yup.string().required("Last Name is required"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    phone: Yup.string().required("Phone number is required"),
    address1: Yup.string().trim().required("Address is required"),
    address2: Yup.string(),
    country: Yup.string().required("Country is required"),
    state: Yup.string().required("State is required"),
    zipcode: Yup.string().required("Zipcode is required"),

    // shippingAddress: Yup.object().shape({
    //   fname: Yup.string().required(
    //     "First Name is required for shipping address"
    //   ),
    //   lname: Yup.string().required(
    //     "Last Name is required for shipping address"
    //   ),
    //   email: Yup.string()
    //     .email("Invalid email format")
    //     .required("Email is required"),
    //   phone: Yup.string().required("Phone number is required"),
    //   address1: Yup.string().required(
    //     "Address 1 is required for shipping address"
    //   ),
    //   address2: Yup.string().nullable(), // Optional
    //   country: Yup.string().required(
    //     "Country is required for shipping address"
    //   ),
    //   state: Yup.string().required("State is required for shipping address"),
    //   zipcode: Yup.string().required(
    //     "Zipcode is required for shipping address"
    //   ),
    // }),
  });

  const [show, setShow] = useState(false);

  const handleClose = () => setShow(false);
  const handleShow = () => setShow(true);

  // strip code start
  const [clientSecret, setClientSecret] = useState("");
  const [paymentOption, setPaymentOption] = useState("credit_card");
  const stripePromise = loadStripe(
    "pk_live_51QGiPQGLWJRijdNSe2qVfKk7KpGdHZznXylDh3tUp561Co72VM5TbjzMZkLUxq450yje3ZCqIcYkXlGY4waOm3h100sFempTGM"
  );
  const [isPaymentLoading, setIsPaymentLoading] = useState(false);
  const [isTrigger, setIsTrigger] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);

  const appearance = {
    theme: "stripe",
  };

  const options = {
    clientSecret,
    appearance,
    loader: "auto",
  };

  // strip code ended

  const handleSubmit = (values) => {
    if (cartItems?.length > 0) {
      setIsLoading(true);
      const api = stripApi;
      const dataUser = {
        fname: values?.fname,
        lname: values?.lname,
        email: values?.email,
        phone: values?.phone,
        address1: values?.address1,
        address2: values?.address2,
        country: values?.country,
        city: values?.city,
        state: values?.state,
        zipCode: values?.zipCode,
        lat: locationDetails?.p_company_lat,
        lng: locationDetails?.p_company_lng,
      };
      const shippingAddress = useDifferentAddress
        ? { ...values.shippingAddress }
        : dataUser;
      const products = cartItems.map(({ actualQuantity, ...item }) => item);

      const orderAllData = {
        products: products,
        totalAmount: totalAmount,
        deliveryAddress: dataUser,
        shippingAddress: shippingAddress,
      };

      const apiData = {
        email: values?.email,
        amount: Math.round(totalAmount * 100),
      };

      postData(api, apiData, header1)
        .then((res) => {
          if (res) {
            setClientSecret(res?.clientSecret);
            dispatch(setOrderData(orderAllData));
            handleShow();
          }
          setIsLoading(false);
        })
        .catch((error) => {
          console.log(error);
          message.error(error?.response?.data?.message);
          setIsLoading(false);
        });
    }
  };

  // out of stock products remove
  const [productLoading, setProductLoading] = useState(false);

  const HandleProducts = debounce(() => {
    setProductLoading(true);
    const apiCheck = productsCheck;
    const apiData = {
      products: cartItems,
    };
    postData(apiCheck, apiData, header1)
      .then((res) => {
        if (res?.success) {
          // message.success("Out Of Stock Products Remove");
          const checkData = res?.availability;
          if (checkData?.length > 0) {
            checkData.forEach((item) => {
              if (!item?.available) {
                setTimeout(() => {
                  dispatch(removeFromCart(item?.productId));
                }, 3000);
              }
            });
          }
          checkData?.forEach((item) => {
            if (item?.available) {
              dispatch(
                updateProductQuantity({
                  productId: item?.productId,
                  availableStock: item?.availableStock,
                })
              );
            }
          });
        }

        setProductLoading(false);
      })
      .catch((error) => {
        console.log(error);
        setProductLoading(false);
      });
  }, 300);

  useEffect(() => {
    HandleProducts();
  }, []);

  return (
    <>
      <BreadCrumbs breadName={"CheckOut"} />

      <Container className="mb-5" fluid="xxl">
        <section>
          <Row className="g-3">
            <Col xs={12} sm={12} md={8} lg={8} xl={8}>
              <section className="shadow2 loginbtn rounded-[10px] py-[10px] px-[15px]">
                <Formik
                  initialValues={{
                    fname: "",
                    lname: "",
                    email: "",
                    phone: "",
                    address1: "",
                    address2: "",
                    country: "",
                    state: "",
                    zipcode: "",
                    shippingAddress: {
                      fname: "",
                      lname: "",
                      email: "",
                      phone: "",
                      address1: "",
                      address2: "",
                      country: "",
                      state: "",
                      zipcode: "",
                    },
                  }}
                  validationSchema={validationSchema}
                  onSubmit={handleSubmit}
                >
                  {({ handleChange, setFieldValue, values }) => (
                    <Form>
                      {/* First Name */}
                      <Row className="g-3">
                        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                          <div className="mb-2 custom_control">
                            <label htmlFor="fname" className="form-label">
                              First Name
                            </label>
                            <Field
                              type="text"
                              id="fname"
                              name="fname"
                              placeholder="Enter Name"
                              className="form-control borderCus"
                              onChange={handleChange}
                            />
                            <ErrorMessage
                              name="fname"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                          <div className="mb-2 custom_control">
                            <label htmlFor="lname" className="form-label">
                              Last Name
                            </label>
                            <Field
                              type="text"
                              id="lname"
                              placeholder="Enter Last Name"
                              name="lname"
                              className="form-control borderCus"
                              onChange={handleChange}
                            />
                            <ErrorMessage
                              name="lname"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                          <div className="mb-2 custom_control">
                            <label htmlFor="email" className="form-label">
                              Email
                            </label>
                            <Field
                              type="email"
                              id="email"
                              name="email"
                              className="form-control borderCus"
                              placeholder="Your Email"
                              onChange={handleChange}
                            />
                            <ErrorMessage
                              name="email"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                          <div className="mb-2 custom_control">
                            <label htmlFor="phone" className="form-label">
                              Phone
                            </label>
                            <PhoneInput
                              country={"pk"}
                              value={values.phone}
                              onChange={(value) =>
                                setFieldValue("phone", value)
                              }
                              inputClass="borderCus w-[100%] phon_inp"
                            />
                            <ErrorMessage
                              name="phone"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col xl={12}>
                          <div className="mb-2 custom_control">
                            <label htmlFor="address1" className="form-label">
                              Address 1
                            </label>
                            <Autocomplete
                              className="form-control radius_12"
                              options={{ types: ["address"] }}
                              apiKey={GoogleApiKey}
                              onPlaceSelected={(place) => {
                                setLocationDetails({
                                  p_address: place?.formatted_address,
                                  p_company_lat:
                                    place?.geometry?.location.lat(),
                                  p_company_lng:
                                    place?.geometry?.location.lng(),
                                });
                                setFieldValue(
                                  "address1",
                                  place?.formatted_address
                                );
                                setFieldTouched("address1", true); // Mark field as touched
                              }}
                              onBlur={() => {
                                if (!values.address1) {
                                  setFieldValue("address1", "");
                                }
                              }}
                            />
                            <ErrorMessage
                              name="address1"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </Col>

                        <Col xl={12}>
                          <div className="mb-2 custom_control">
                            <label htmlFor="address2" className="form-label">
                              Address 2
                            </label>
                            <Field
                              type="text"
                              id="address2"
                              name="address2"
                              placeholder="Enter Address"
                              className="form-control borderCus"
                              onChange={handleChange}
                            />
                            <ErrorMessage
                              name="address2"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                          <div className="mb-2 custom_control">
                            <label htmlFor="country" className="form-label">
                              Country
                            </label>
                            <Field
                              type="text"
                              id="country"
                              name="country"
                              placeholder="Enter Country"
                              className="form-control borderCus"
                              onChange={handleChange}
                            />
                            <ErrorMessage
                              name="country"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                          <div className="mb-2 custom_control">
                            <label htmlFor="state" className="form-label">
                              State
                            </label>
                            <Field
                              type="text"
                              id="state"
                              name="state"
                              placeholder="Enter State"
                              className="form-control borderCus"
                              onChange={handleChange}
                            />
                            <ErrorMessage
                              name="state"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </Col>
                        <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                          <div className="mb-2 custom_control">
                            <label htmlFor="zipcode" className="form-label">
                              Zipcode
                            </label>
                            <Field
                              type="text"
                              id="zipcode"
                              name="zipcode"
                              placeholder="Enter Code"
                              className="form-control borderCus"
                              onChange={handleChange}
                            />
                            <ErrorMessage
                              name="zipcode"
                              component="div"
                              className="text-danger"
                            />
                          </div>
                        </Col>

                        <div className="mb-3">
                          <label>
                            <Field
                              type="radio"
                              name="addressOption"
                              value="sameAddress"
                              checked={!useDifferentAddress}
                              onChange={() => setUseDifferentAddress(false)}
                            />
                            Shipping address is the same as my billing address
                          </label>
                          <br />
                          <label>
                            <Field
                              type="radio"
                              name="addressOption"
                              value="differentAddress"
                              checked={useDifferentAddress}
                              onChange={() => setUseDifferentAddress(true)}
                            />
                            Ship to a different address?
                          </label>
                        </div>
                        {useDifferentAddress && (
                          <>
                            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                              <div className="mb-2 custom_control">
                                <label
                                  htmlFor="shippingAddress.fname"
                                  className="form-label"
                                >
                                  First Name
                                </label>
                                <Field
                                  type="text"
                                  id="shippingAddress.fname"
                                  name="shippingAddress.fname" // Correct name
                                  placeholder="Enter First Name"
                                  className="form-control borderCus"
                                />
                                <ErrorMessage
                                  name="shippingAddress.fname" // Correct name
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                              <div className="mb-2 custom_control">
                                <label
                                  htmlFor="shippingAddress.lname"
                                  className="form-label"
                                >
                                  Last Name
                                </label>
                                <Field
                                  type="text"
                                  id="shippingAddress.lname"
                                  name="shippingAddress.lname" // Correct name
                                  placeholder="Enter Last Name"
                                  className="form-control borderCus"
                                />
                                <ErrorMessage
                                  name="shippingAddress.lname" // Correct name
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>

                            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                              <div className="mb-2 custom_control">
                                <label
                                  htmlFor="shippingAddress.email"
                                  className="form-label"
                                >
                                  Email
                                </label>
                                <Field
                                  type="email"
                                  id="shippingAddress.email"
                                  name="shippingAddress.email" // Correct name
                                  className="form-control borderCus"
                                  placeholder="Your Email"
                                />
                                <ErrorMessage
                                  name="shippingAddress.email" // Correct name
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                              <div className="mb-2 custom_control">
                                <label
                                  htmlFor="shippingAddress.phone"
                                  className="form-label"
                                >
                                  Phone
                                </label>
                                <PhoneInput
                                  country={"pk"}
                                  value={values.shippingAddress.phone} // Ensure you're using the correct field
                                  onChange={(value) =>
                                    setFieldValue(
                                      "shippingAddress.phone",
                                      value
                                    )
                                  }
                                  inputClass="borderCus w-[100%] phon_inp"
                                />
                                <ErrorMessage
                                  name="shippingAddress.phone" // Correct name
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                            <Col xl={12}>
                              <div className="mb-2 custom_control">
                                <label
                                  htmlFor="shippingAddress.address1"
                                  className="form-label"
                                >
                                  Address 1
                                </label>
                                <Autocomplete
                                  className="form-control radius_12"
                                  options={{ types: ["address"] }}
                                  apiKey={GoogleApiKey}
                                  onPlaceSelected={(place) => {
                                    setLocationDetails({
                                      p_address: place?.formatted_address,
                                      p_company_lat:
                                        place?.geometry?.location.lat(),
                                      p_company_lng:
                                        place?.geometry?.location.lng(),
                                    });
                                    setFieldValue(
                                      "shippingAddress.address1",
                                      place?.formatted_address
                                    );
                                    setFieldTouched(
                                      "shippingAddress.address1",
                                      true
                                    ); // Correct name
                                  }}
                                  onBlur={() => {
                                    if (!values.shippingAddress.address1) {
                                      // Correct name
                                      setFieldValue(
                                        "shippingAddress.address1",
                                        ""
                                      );
                                    }
                                  }}
                                />
                                <ErrorMessage
                                  name="shippingAddress.address1" // Correct name
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>

                            <Col xl={12}>
                              <div className="mb-2 custom_control">
                                <label
                                  htmlFor="shippingAddress.address2"
                                  className="form-label"
                                >
                                  Address 2
                                </label>
                                <Field
                                  type="text"
                                  id="shippingAddress.address2" // Correct id
                                  name="shippingAddress.address2" // Correct name
                                  placeholder="Enter Address"
                                  className="form-control borderCus"
                                />
                                <ErrorMessage
                                  name="shippingAddress.address2" // Correct name
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                              <div className="mb-2 custom_control">
                                <label
                                  htmlFor="shippingAddress.country"
                                  className="form-label"
                                >
                                  Country
                                </label>
                                <Field
                                  type="text"
                                  id="shippingAddress.country" // Correct id
                                  name="shippingAddress.country" // Correct name
                                  placeholder="Enter Country"
                                  className="form-control borderCus"
                                />
                                <ErrorMessage
                                  name="shippingAddress.country" // Correct name
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                              <div className="mb-2 custom_control">
                                <label
                                  htmlFor="shippingAddress.state"
                                  className="form-label"
                                >
                                  State
                                </label>
                                <Field
                                  type="text"
                                  id="shippingAddress.state" // Correct id
                                  name="shippingAddress.state" // Correct name
                                  placeholder="Enter State"
                                  className="form-control borderCus"
                                />
                                <ErrorMessage
                                  name="shippingAddress.state" // Correct name
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                            <Col xs={12} sm={6} md={6} lg={6} xl={6}>
                              <div className="mb-2 custom_control">
                                <label
                                  htmlFor="shippingAddress.zipcode"
                                  className="form-label"
                                >
                                  Zipcode
                                </label>
                                <Field
                                  type="text"
                                  id="shippingAddress.zipcode" // Correct id
                                  name="shippingAddress.zipcode" // Correct name
                                  placeholder="Enter Code"
                                  className="form-control borderCus"
                                />
                                <ErrorMessage
                                  name="shippingAddress.zipcode" // Correct name
                                  component="div"
                                  className="text-danger"
                                />
                              </div>
                            </Col>
                          </>
                        )}
                      </Row>

                      {/* Submit Button */}
                      <Button
                        disabled={isLoading || cartItems?.length === 0}
                        type="submit"
                        className="btn w-[100%] rounded-[10px] h-[3rem] primary-bg medium-font mt-2 text-[1rem] border border-primary-bg primBnt"
                      >
                        {isLoading ? (
                          <>
                            <Spinner size="sm" />
                          </>
                        ) : (
                          "Submit"
                        )}
                      </Button>
                    </Form>
                  )}
                </Formik>
              </section>
            </Col>
            <Col xs={12} sm={12} md={4} lg={4} xl={4}>
              <section>
                <div className="shadow2 loginbtn rounded-[10px] py-[10px] px-[15px]">
                  <h4 className="color-0 medium-font text-[1.2rem]">
                    Cart Summary
                  </h4>

                  <section className="mt-3">
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="color-0 semiBold-font text-[1rem]">
                        Sub Total:
                      </h4>
                      <h5 className="color-1 regular-font text-[1rem]">
                        $ {totalAmount}
                      </h5>
                    </div>

                    <div className="flex justify-between items-center mb-2">
                      <h4 className="color-0 semiBold-font text-[1rem]">
                        Shipping:
                      </h4>
                      <h5 className="color-1 regular-font text-[0.7rem]">
                        Free Shipping above 199€ cart
                      </h5>
                    </div>

                    <div className="divider"></div>
                    <div className="flex justify-between items-center mb-2">
                      <h4 className="color-0 semiBold-font text-[1rem]">
                        Total:
                      </h4>
                      <h5 className="primary-color medium-font text-[1rem]">
                        $ {totalAmount}
                      </h5>
                    </div>
                  </section>
                </div>
              </section>
            </Col>
          </Row>
        </section>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton></Modal.Header>
          <Modal.Body>
            {" "}
            {clientSecret && (
              <div className="w-full">
                <Elements options={options} stripe={stripePromise}>
                  <PaymentCheckCheckout
                    isTrigger={isTrigger}
                    setIsLoading={setIsLoading}
                    setDisable={setIsDisabled}
                    email={dataOrder?.deliveryAddress?.email}
                    redirectURL="/orderCreate"
                  />
                </Elements>
              </div>
            )}
            <Button
              color="primary"
              className="w-100 btn btn-danger rounded-5  mt-4"
              style={{ minHeight: "40px" }}
              onClick={() => setIsTrigger(true)}
              disabled={isLoading || isDisabled}
            >
              {isLoading ? <Spinner size="sm" /> : "Pay now"}
            </Button>
          </Modal.Body>
        </Modal>
      </Container>
    </>
  );
};

export default Page;
