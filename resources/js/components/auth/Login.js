import React from 'react';
import { Link, useHistory, useLocation } from 'react-router-dom';
import { MySwal, useApp } from '../App';
import { Button, Card, InputGroup, Form, Container, Row, Col } from 'react-bootstrap';
import { VscAccount, VscKey } from 'react-icons/vsc';
import AppLogo from '../shared/AppLogo';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import api, { API_KEY } from '../../services/api';

export default function Login() {
  const history = useHistory();
  const location = useLocation();
  const { config, signin } = useApp();

  const { from } = location.state || { from: { pathname: "/dashboard" } };
  const login = () => {
    signin(() => {
      history.replace(from);
    });
  };

  const formik = useFormik({
    initialValues: {username: '', password: ''},
    validationSchema: Yup.object().shape({
      username: Yup.string().required().label('Username'),
      password: Yup.string().required().label('Password'),
    }),
    onSubmit: async (values, { setSubmitting }) => {
      try {
        const { data } = await api.post(`/auth/login`, values);
        localStorage.setItem(API_KEY, JSON.stringify(data.access_token));
        setSubmitting(false);
        login();
      } catch (error) {
        setSubmitting(false);
        MySwal.fire('Failed', error?.response?.data?.message, 'error');
        console.log(error);
      }
    }
  });

  return (
    <div className="py-5">
      <Container>
        <Row className="justify-content-center">
          <Col md={3}>
            <Card body>
              <div className="text-center">
                <h3 className="fw-bolder">{config?.app_name}</h3>

                <AppLogo width={100} className="my-3" />

                <p>Tahun Anggaran {config?.tahun_anggaran}</p>
              </div>

              <br />

              <Form noValidate onSubmit={formik.handleSubmit}>
                <InputGroup className="mb-3">
                  <InputGroup.Text className="bg-white">
                    <VscAccount size={20} />
                  </InputGroup.Text>
                  <Form.Control
                    name="username"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.username && formik.errors.username}
                    className="bg-white"
                    placeholder="Username"
                    autoFocus
                  />

                  {formik.touched.username && formik.errors.username && (
                    <Form.Control.Feedback type="invalid">{formik.errors.username}</Form.Control.Feedback>
                  )}
                </InputGroup>

                <InputGroup className="mb-4">
                  <InputGroup.Text className="bg-white">
                    <VscKey size={20} />
                  </InputGroup.Text>
                  <Form.Control
                    type="password"
                    name="password"
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.password && formik.errors.password}
                    className="bg-white"
                    placeholder="Password"
                  />

                  {formik.touched.password && formik.errors.password && (
                    <Form.Control.Feedback type="invalid">{formik.errors.password}</Form.Control.Feedback>
                  )}
                </InputGroup>

                <div className="d-flex align-items-center justify-content-between">
                  <Button type="submit" variant="primary">
                    {formik.isSubmitting ? "Processing..." : "Log in"}
                  </Button>

                  <Button as={Link} to="/" variant="link">Homepage</Button>
                </div>
              </Form>
            </Card>
          </Col>
        </Row>
      </Container>
    </div>
  )
}
