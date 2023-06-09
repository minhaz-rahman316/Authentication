import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row, Spinner } from 'react-bootstrap';


// Formik Validation
import * as Yup from "yup";
import { useFormik } from "formik";

//redux
import { Link } from "react-router-dom";
import baseAPI from 'utils/CustomAPI';
import { Toaster, toast } from 'react-hot-toast';

const Register = () => {

    document.title = "Register";

    const [passwordShow, setPasswordShow] = useState<any>(false);
    const [loader, setLoader] = useState<boolean>(false);

    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: '',
            username: '',
            password: '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Please Enter Your Email"),
            username: Yup.string().required("Please Enter Your Username"),
            password: Yup.string().required("Please Enter Your Password").matches(/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}/, "Must Contain 8 Characters, One Uppercase, One Lowercase, One Number and One Special Case Character"),
        }),
        onSubmit: async (values) => {
            try {
                setLoader(true)
                const res = await baseAPI.post('/register', values)

                if (res.status === 200) {
                    toast.success("Registration Successful, Please Login to Continue")
                }

            } catch (error) {

            }
        }
    });

    return (
        <React.Fragment>
            <section className="auth-page-wrapper position-relative bg-light min-vh-100 d-flex align-items-center justify-content-between">
                <div className="w-100">
                    <Toaster />
                    <Container>
                        <Row className="justify-content-center">
                            <Col lg={6}>
                                <div className="auth-card mx-lg-3">
                                    <Card className="border-0 mb-0">
                                        <Card.Body>
                                            <p className="text-muted fs-15">Get your free account</p>
                                            <div className="p-2">
                                                <Form className="needs-validation" action="#" onSubmit={(e) => { e.preventDefault(); validation.handleSubmit(); return false; }}>

                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="useremail">Email <span className="text-danger">*</span></Form.Label>
                                                        <Form.Control type="email" id="useremail" placeholder="Enter email address"
                                                            name="email"
                                                            className="form-control"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.email || ""}
                                                            isInvalid={
                                                                validation.touched.email && validation.errors.email ? true : false
                                                            }
                                                        />
                                                        {validation.touched.email && validation.errors.email ? (
                                                            <Form.Control.Feedback type="invalid"><div>{validation.errors.email}</div></Form.Control.Feedback>
                                                        ) : null}
                                                    </div>
                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="username">Username <span className="text-danger">*</span></Form.Label>
                                                        <Form.Control type="text" id="username" placeholder="Enter username"
                                                            name="username"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.username || ""}
                                                            isInvalid={
                                                                validation.touched.username && validation.errors.username ? true : false
                                                            }
                                                        />
                                                        {validation.touched.username && validation.errors.username ? (
                                                            <Form.Control.Feedback type="invalid"><div>{validation.errors.username}</div></Form.Control.Feedback>
                                                        ) : null}
                                                    </div>

                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="password-input">Password</Form.Label>
                                                        <div className="position-relative auth-pass-inputgroup">
                                                            <Form.Control type={!passwordShow ? "password" : "text"} className="pe-5 password-input" placeholder="Enter password" id="password-input"
                                                                name="password"
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                value={validation.values.password || ""}
                                                                isInvalid={
                                                                    validation.touched.password && validation.errors.password ? true : false
                                                                }
                                                            />
                                                            <Button variant='link' className="btn-link position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></Button>
                                                            {validation.touched.password && validation.errors.password ? (
                                                                <Form.Control.Feedback type="invalid"><div>{validation.errors.password}</div></Form.Control.Feedback>
                                                            ) : null}
                                                        </div>
                                                    </div>

                                                    <div className="mb-4">
                                                        <p className="mb-0 fs-12 text-muted fst-italic">If you register, please go to <Link to="/" className="text-primary text-decoration-underline fst-normal fw-medium">Login</Link> page</p>
                                                    </div>

                                                    <div className="mt-4">
                                                        <Button variant='primary' className="w-100" type="submit" disabled={loader}> {loader && <Spinner size="sm" animation="border" className="me-2" />} Sign Up</Button>
                                                    </div>


                                                </Form>
                                            </div>

                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </Container>

                    {/* <footer className="footer">
                        <Container>
                            <Row>
                                <Col lg={12}>
                                    <div className="text-center">
                                        <p className="mb-0 text-muted">©
                                            {(new Date().getFullYear())} Toner. Crafted with <i className="mdi mdi-heart text-danger"></i> by Themesbrand
                                        </p>
                                    </div>
                                </Col>
                            </Row>
                        </Container>
                    </footer> */}
                </div>
            </section>
        </React.Fragment>
    );
};

export default Register;