import React, { Fragment, useContext, useState } from "react";
import { Col, Container, Row } from "reactstrap";
import './otp.css'
import { Btn, H2, P } from "../../../AbstractElements";
import OtpInput from "./OtpInput";
import { useNavigate } from "react-router";

const Index = () => {
  const initialRole = JSON.parse(localStorage.getItem('role'))
  const [role, setRole] = useState(initialRole)

  const navigate = useNavigate();

  const submitOtp = (e) => {
    console.log('role222', role)
    navigate(`${process.env.PUBLIC_URL}/dashboard/default/${role}`, { state: { showToast: true } });
  };
    const onOtpSubmit=()=> {};
  return (
    <Fragment>
      <Container fluid={true} className="p-0 otp-page">
        <Row>
          <Col xs="12">
          <img className="otp-logo" src={require('../../../assets/images/logo/login-logo.svg').default} alt="" />
          <Container fluid={true} className="main-otp-card">
            <H2 attrH2={{className: 'h2-heading'}}>
                Two Factor Authentication
            </H2>
            <P attrPara={{className:'otp-para text-center'}}>A verification code has been sent to 
            your email</P>

            <div className="d-flex justify-content-center flex-row " style={{padding: '30px'}}>
          <OtpInput length={4} onOtpSubmit={onOtpSubmit} />
        </div>


            <div className="w-100 d-flex justify-content-center">
            <Btn attrBtn={{ color: "#1A3D6F", className: "sign-btn otp-btn d-block mt-2", style:{BackgroundColor: '#1A3D6F'}, onClick: (e) => submitOtp(e) }}>Continue</Btn>
            </div>
          </Container>
          </Col>
        </Row>
      </Container>
    </Fragment>
  );
};

export default Index;
