/* eslint-disable no-unused-vars */
import { useState } from 'react';
// import { apiRequest } from '../../api/auth_api';
import { CircularProgress } from '@mui/material';
import { message } from 'antd';
import { useFormik } from "formik";
import { useRouter } from 'next/navigation';
import * as Yup from "yup";
import {
    Col,
    Container,
    Form,
    FormFeedback,
    Input,
    Label,
    Row
} from "reactstrap";

const HelpCenter = () => {
    const router = useRouter();
    const [isLoading, setisLoading] = useState(false);

    const validation = useFormik({
        enableReinitialize: true,
        initialValues: {
            title: '',
            email: '',
            message: '',
        },
        validationSchema: Yup.object({
            title: Yup.string()
                .required('Please enter a title')
                .max(50, 'Title must be less than 50 characters'),
            email: Yup.string()
                .email('Invalid email format')
                .required('Please enter your email'),
            message: Yup.string()
                .required('Please enter your message')
                .min(10, 'Message should be at least 10 characters long'),
        }),

        onSubmit: async (values, { resetForm }) => {
            setisLoading(true);
            // Simulating form submission success
            setTimeout(() => {
                message.success('Your message has been submitted successfully');
                setisLoading(false);
                resetForm();
            }, 2000);
        }
    });

    return (
        <Container className='bg-white rounded-3 p-4 w-full'>
            <h4 className="text_primary text-xl mb-0 semibold-font">Help Center</h4>
            <div className='flex justify-center w-full flex-col items-center'>
                <Form
                    style={{ maxWidth: '600px', width: '100%' }}
                    onSubmit={(e) => {
                        e.preventDefault();
                        validation.handleSubmit();
                        return false;
                    }}
                    className="mt-4 auth_form"
                >
                    <Row>
                        {/* Title Field */}
                        <div className="mb-3">
                            <Label className="form-label color-3 text-[15px] regular-font" htmlFor="title">
                                Title
                            </Label>
                            <Input
                                type="text"
                                className="form-control rounded-3 text-sm regular-font"
                                style={{ padding: '12px 24px', }}
                                name="title"
                                id="title"
                                // placeholder="Enter the title"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.title || ""}
                                invalid={validation.touched.title && validation.errors.title ? true : false}
                            />
                            {validation.touched.title && validation.errors.title ? (
                                <FormFeedback type="invalid">{validation.errors.title}</FormFeedback>
                            ) : null}
                        </div>

                        {/* Email Field */}
                        <div className="mb-3">
                            <Label className="form-label color-3 text-[15px] regular-font" htmlFor="email">
                                Email
                            </Label>
                            <Input
                                type="email"
                                className="form-control rounded-3 text-sm regular-font"
                                style={{ padding: '12px 24px', }}
                                name="email"
                                id="email"
                                // placeholder="Enter your email"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.email || ""}
                                invalid={validation.touched.email && validation.errors.email ? true : false}
                            />
                            {validation.touched.email && validation.errors.email ? (
                                <FormFeedback type="invalid">{validation.errors.email}</FormFeedback>
                            ) : null}
                        </div>

                        {/* Message Field */}
                        <div className="mb-3">
                            <Label className="form-label color-3 text-[15px] regular-font" htmlFor="message">
                                Message
                            </Label>
                            <Input
                                type="textarea"
                                className="form-control rounded-3 text-sm regular-font"
                                style={{ padding: '12px 24px', }}
                                name="message"
                                id="message"
                                // placeholder="Enter your message"
                                rows="4"
                                onChange={validation.handleChange}
                                onBlur={validation.handleBlur}
                                value={validation.values.message || ""}
                                invalid={validation.touched.message && validation.errors.message ? true : false}
                            />
                            {validation.touched.message && validation.errors.message ? (
                                <FormFeedback type="invalid">{validation.errors.message}</FormFeedback>
                            ) : null}
                        </div>

                        {/* Submit Button */}
                        <Col lg={12} className="mb-0 mt-3">
                            <div className="d-grid">
                                <button className="py-3 text-sm rounded-3 primary-bg medium-font text-white" disabled={isLoading} type="submit">
                                    {isLoading ? <CircularProgress size={18} style={{ color: '#fff' }} /> : "Submit"}
                                </button>
                            </div>
                        </Col>
                    </Row>
                </Form>
            </div>
        </Container>
    );
};

export default HelpCenter;
