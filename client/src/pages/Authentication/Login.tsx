import React, { useState } from 'react';
import { Button, Card, Col, Container, Form, Row } from 'react-bootstrap';

// Import Images

//redux

// Formik validation
import * as Yup from "yup";
import { useFormik } from "formik";

import { Toaster, toast } from 'react-hot-toast';
import baseAPI from 'utils/CustomAPI';
import { Link } from 'react-router-dom';

const Login = (props: any) => {

    document.title = "Login ";

    const [userLogin, setUserLogin] = useState<any>([]);
    const [passwordShow, setPasswordShow] = useState<any>(false);
    const [loader, setLoader] = useState<boolean>(false);

    const validation: any = useFormik({
        // enableReinitialize : use this flag when initial values needs to be changed
        enableReinitialize: true,

        initialValues: {
            email: userLogin.email || '',
            password: userLogin.password || '',
        },
        validationSchema: Yup.object({
            email: Yup.string().required("Please Enter Your Email"),
            password: Yup.string().required("Please Enter Your Password"),
        }),
        onSubmit: async (values) => {
            try {
                // console.log(values)
                // dispatch(loginUser(values, props.router.navigate));
                const res = await baseAPI.post('/login', values);
                // console.log(res)
                setLoader(true)

                if (res.status === 200) {
                    console.log(res.data)
                    window.location.replace("https://minhaz-portfolio.netlify.app/")
                }
            }
            catch {
                toast.error('Email or Password is incorrect');
            }


        }
    });

    return (
        <React.Fragment>
            <section className="auth-page-wrapper position-relative bg-light min-vh-100 d-flex align-items-center justify-content-between">
                <div className="auth-header position-fixed top-0 start-0 end-0 bg-body">
                </div>
                <div className="w-100">
                    <Container>
                        <Row className="justify-content-center">
                            <Toaster />
                            <Col lg={6}>
                                <div className="auth-card mx-lg-3">
                                    <Card className="border-0 mb-0">
                                        <Card.Body>
                                            <p className="text-muted fs-15">Sign in to continue to Minhaz Rahman portfolio</p>
                                            <div className="p-2">

                                                <Form action="#" onSubmit={(e) => {
                                                    e.preventDefault();
                                                    validation.handleSubmit();
                                                    return false;
                                                }}>

                                                    <div className="mb-3">
                                                        <Form.Label htmlFor="username">Email</Form.Label>
                                                        <Form.Control name="email" type="email" className="form-control" id="username" placeholder="Enter Your Email"
                                                            onChange={validation.handleChange}
                                                            onBlur={validation.handleBlur}
                                                            value={validation.values.email || ""}
                                                            isInvalid={
                                                                validation.touched.email && validation.errors.email ? true : false
                                                            }
                                                        />
                                                        {validation.touched.email && validation.errors.email ? (
                                                            <Form.Control.Feedback type="invalid">{validation.errors.email}</Form.Control.Feedback>
                                                        ) : null}
                                                    </div>

                                                    <div className="mb-3">
                                                        {/* <div className="float-end">
                                                            <Link to="/forgot-password" className="text-muted">Forgot password?</Link>
                                                        </div> */}
                                                        <Form.Label htmlFor="password-input">Password</Form.Label>
                                                        <div className="position-relative auth-pass-inputgroup mb-3">
                                                            <Form.Control className="form-control pe-5 password-input" placeholder="Enter password" id="password-input"
                                                                name="password"
                                                                value={validation.values.password || ""}
                                                                type={passwordShow ? "text" : "password"}
                                                                onChange={validation.handleChange}
                                                                onBlur={validation.handleBlur}
                                                                isInvalid={
                                                                    validation.touched.password && validation.errors.password ? true : false
                                                                }
                                                            />
                                                            {validation.touched.password && validation.errors.password ? (
                                                                <Form.Control.Feedback type="invalid">{validation.errors.password}</Form.Control.Feedback>
                                                            ) : null}
                                                            <Button variant='link' className="position-absolute end-0 top-0 text-decoration-none text-muted password-addon" type="button" id="password-addon" onClick={() => setPasswordShow(!passwordShow)}><i className="ri-eye-fill align-middle"></i></Button>
                                                        </div>
                                                    </div>

                                                    <div className="mb-4">
                                                        <p className="mb-0 fs-12 text-muted fst-italic">New here? please go to <Link to="/register" className="text-primary text-decoration-underline fst-normal fw-medium">Register</Link> page</p>
                                                    </div>

                                                    <div className="mt-4">
                                                        <Button variant='primary' className="w-100" type="submit">
                                                            Sign In
                                                        </Button>
                                                    </div>
                                                </Form>
                                            </div>
                                        </Card.Body>
                                    </Card>
                                </div>
                            </Col>
                        </Row>
                    </Container>
                </div>
            </section>
        </React.Fragment>
    );
};

export default Login;