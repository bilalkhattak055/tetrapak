import React, { Fragment } from "react";
import { Col, Container, Row } from "reactstrap";
import "./popup.css";
import { H2, Btn } from "../../AbstractElements";
import { ArrowRight } from "react-feather";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";

const Index = () => {
  const navigate = useNavigate();

  const loginAgain = (e) => {
    navigate(`${process.env.PUBLIC_URL}/login`, { state: { showToast: true } });
  };
  return (
    <Fragment>
      <div className="session-popup">
        <div fluid={true} className="session-timeout-card">
          <div className="session-card-image text-center">
            <img
              className="session-image"
              src={
                require("../../assets/images/popupImages/session-timeout.svg")
                  .default
              }
              alt="session-timeout-images"
            />
          </div>
          <H2 attrH2={{ className: "session-heading" }}>
            Your session has timed out due to inactivity
          </H2>

          <div className="d-flex w-100 justify-content-center">
            <Btn
              attrBtn={{
                color: "#1A3D6F",
                className:
                  "sign-btn d-flex mt-2 justify-content-center align-item-center",
                style: { BackgroundColor: "#1A3D6F", width: "50%" },
                onClick: (e) => loginAgain(e),
              }}
            >
              Login Again <ArrowRight className="ms-2" />
            </Btn>
          </div>
        </div>
      </div>
      <ToastContainer />
    </Fragment>
  );
};

export default Index;
