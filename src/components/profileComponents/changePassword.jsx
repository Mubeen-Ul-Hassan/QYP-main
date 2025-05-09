/* eslint-disable no-unused-vars */
import { useState } from "react";
// import { apiRequest } from '../../api/auth_api';
import { CircularProgress } from "@mui/material";
import { message } from "antd";
import { useFormik } from "formik";
import { useRouter } from "next/navigation";
import { Eye, EyeOff } from "react-feather";
import { FaArrowLeft } from "react-icons/fa";
import {
  Col,
  Container,
  Form,
  FormFeedback,
  Input,
  Label,
  Row,
} from "reactstrap";
import * as Yup from "yup";

const ChangePassword = () => {
  const router = useRouter();
  const [showPassword, setShowPassword] = useState(false);
  const [showoldPassword, setShowoldPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setisLoading] = useState(false);

  const validation = useFormik({
    enableReinitialize: true,
    initialValues: {
      oldPassword: "",
      password: "",
      confirmPassword: "",
    },
    validationSchema: Yup.object({
      oldPassword: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(15, "Maximum 15 characters allowed")
        .required("Please Enter Password"),
      password: Yup.string()
        .min(8, "Password must be at least 8 characters")
        .max(15, "Maximum 15 characters allowed")
        .required("Please Enter Password"),
      confirmPassword: Yup.string()
        .oneOf([Yup.ref("password"), null], "Passwords must match")
        .required("Please confirm your password"),
    }),

    onSubmit: async (values, { resetForm }) => {
      setisLoading(true);
      router.push("/service-provider/dashboard");
      message.success("Password updated successfully");
      setisLoading(false);
    },
  });

  return (
    <Container className="bg-white rounded-3 p-4 w-full">
      <h4 className="text_primary text-xl mb-0 semibold-font">
        Change Password
      </h4>
      {/* <div className="flex gap-4 items-center justify-between w-full mb-4">
                    <div className="flex flex-col gap-3 w-full">
                        <div className="flex gap-4 mb-3 items-center w-full">
                            <button
                                onClick={() => router.back()}
                                className="bg_primary rounded-3 p-2"
                            >
                                <FaArrowLeft className='text_white' />
                            </button>
                            <h4 className="text_primary mb-0 semibold-font">Change Password</h4>
                        </div>
                    </div>
                </div> */}
      <div className="flex justify-center w-full flex-col items-center">
        <Form
          style={{ maxWidth: "600px", width: "100%" }}
          onSubmit={(e) => {
            e.preventDefault();
            validation.handleSubmit();
            return false;
          }}
          className=" mt-4 auth_form"
        >
          <Row>
            <div className="mb-3 position-relative">
              <Label
                className="form-label color-3 text-[15px] regular-font"
                htmlFor="oldPassword"
              >
                Current Password
              </Label>
              <Input
                type={showoldPassword ? "text" : "password"}
                className="form-control rounded-3 text-sm regular-font relative"
                name="oldPassword"
                id="oldPassword"
                style={{ padding: "12px 24px" }}
                // placeholder="Enter your Current Password"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.oldPassword || ""}
                invalid={
                  validation.touched.oldPassword &&
                  validation.errors.oldPassword
                    ? true
                    : false
                }
              />
              <span
                onClick={() => setShowoldPassword(!showoldPassword)}
                style={{
                  position: "absolute",
                  right: "40px",
                  top: "47px",
                  zIndex: 99,
                  cursor: "pointer",
                }}
              >
                {!showoldPassword ? (
                  <EyeOff size={18} color="#C4C4C4" />
                ) : (
                  <Eye size={18} color="#C4C4C4" />
                )}
              </span>
              {validation.touched.oldPassword &&
              validation.errors.oldPassword ? (
                <FormFeedback type="invalid">
                  {validation.errors.oldPassword}
                </FormFeedback>
              ) : null}
            </div>
            <div className="mb-3 position-relative">
              <Label
                className="form-label color-3 text-[15px] regular-font"
                htmlFor="password"
              >
                New Password
              </Label>
              <Input
                type={showPassword ? "text" : "password"}
                className="form-control rounded-3 text-sm regular-font relative"
                name="password"
                id="password"
                style={{ padding: "12px 24px" }}
                // placeholder="Enter your New password"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.password || ""}
                invalid={
                  validation.touched.password && validation.errors.password
                    ? true
                    : false
                }
              />
              <span
                onClick={() => setShowPassword(!showPassword)}
                style={{
                  position: "absolute",
                  right: "40px",
                  top: "47px",
                  zIndex: 99,
                  cursor: "pointer",
                }}
              >
                {!showPassword ? (
                  <EyeOff size={18} color="#C4C4C4" />
                ) : (
                  <Eye size={18} color="#C4C4C4" />
                )}
              </span>
              {validation.touched.password && validation.errors.password ? (
                <FormFeedback type="invalid">
                  {validation.errors.password}
                </FormFeedback>
              ) : null}
            </div>

            <div className="mb-3 position-relative">
              <Label
                className="form-label color-3 text-[15px] regular-font"
                htmlFor="confirmPassword"
              >
                Confirm New Password
              </Label>
              <Input
                type={showConfirmPassword ? "text" : "password"}
                className="form-control rounded-3 text-sm regular-font"
                name="confirmPassword"
                id="confirmPassword"
                style={{ padding: "12px 24px" }}
                // placeholder="Please Confirm your Password"
                onChange={validation.handleChange}
                onBlur={validation.handleBlur}
                value={validation.values.confirmPassword || ""}
                invalid={
                  validation.touched.confirmPassword &&
                  validation.errors.confirmPassword
                    ? true
                    : false
                }
              />
              <span
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                style={{
                  position: "absolute",
                  right: "40px",
                  top: "47px",
                  zIndex: 99,
                  cursor: "pointer",
                }}
              >
                {!showConfirmPassword ? (
                  <EyeOff size={18} color="#C4C4C4" />
                ) : (
                  <Eye size={18} color="#C4C4C4" />
                )}
              </span>
              {validation.touched.confirmPassword &&
              validation.errors.confirmPassword ? (
                <FormFeedback type="invalid">
                  {validation.errors.confirmPassword}
                </FormFeedback>
              ) : null}
            </div>

            <Col lg={12} className="mb-0 mt-3">
              <div className="d-grid">
                <button
                  className="py-3 text-sm rounded-3 primary-bg medium-font text-white"
                  disabled={isLoading}
                  type="submit"
                >
                  {isLoading ? (
                    <CircularProgress size={18} style={{ color: "#fff" }} />
                  ) : (
                    "Change Password"
                  )}
                </button>
              </div>
            </Col>
          </Row>
        </Form>
      </div>
    </Container>
  );
};

export default ChangePassword;
