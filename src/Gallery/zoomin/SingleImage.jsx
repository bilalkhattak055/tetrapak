import "./zoom.css";
import React, { Fragment } from "react";
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";
import { Container, Button, Card } from "react-bootstrap";
import { X } from "react-feather";
import { H6, P } from "../../AbstractElements";

const SingleImage = ({ photo, setIsOpen, imageData }) => {
  return (
    <Fragment>
      <div className="zoom-image-container">
        <Container
          fluid={true}
          className="zoom d-flex flex-column justify-content-center"
          style={{ textAlign: "start" }}
        >
          <X
            type="button"
            width={35}
            onClick={() => setIsOpen(false)}
            className="x-icon"
          />
          <div className="zoom-image-div">
            <TransformWrapper initialScale={1}>
              {({ zoomIn, zoomOut, resetTransform }) => (
                <Fragment>
                  <div
                    className="p-2"
                    style={{
                      backgroundColor: "black",
                      borderRadius: "15px",
                      maxWidth: "270px",
                      marginBottom: "10px",
                    }}
                  >
                    <Button
                      variant="dark"
                      onClick={() => zoomIn()}
                      style={{ marginRight: "5px" }}
                    >
                      +
                    </Button>
                    <Button
                      variant="dark"
                      onClick={() => zoomOut()}
                      style={{ marginRight: "5px" }}
                    >
                      -
                    </Button>
                    <Button
                      className="btn-outline-info-2x"
                      variant="dark"
                      onClick={() => resetTransform()}
                    >
                      Reset
                    </Button>
                  </div>
                  <TransformComponent>
                    <img
                      className="zoom-image"
                      src={photo}
                      alt="Zoomable"
                      style={{
                        width: "",
                        height: "auto",
                        cursor: "pointer",
                      }}
                    />
                    <Card className="zoom-card">
                      {imageData?.areaOwner && (
                        <H6>Area Owner: {imageData?.areaOwner}</H6>
                      )}
                      {imageData?.areaName && (
                        <P attrPara={{ className: "fontsizing" }}>
                          Area: {imageData.areaName}
                        </P>
                      )}
                      {imageData?.cameraName && (
                        <H6 attrH6={{ className: "fontsizing" }}>
                          Camera Name: {imageData?.cameraName}
                        </H6>
                      )}
                      {/* {imageData?.operation_safety_id && (
                        <H6 attrH6={{ className: "fontsizing" }}>
                          Safety ID: {imageData?.operation_safety_id}
                        </H6>
                      )} */}
                      {imageData?.date && (
                        <P attrPara={{ className: "pb-1 mb-0 fontsizing" }}>
                          Date: {imageData.date}
                        </P>
                      )}
                      {imageData?.time && (
                        <P attrPara={{ className: "p-0 m-0 fontsizing" }}>
                          Time: {imageData?.time}
                        </P>
                      )}
                      {imageData?.module && (
                        <P attrPara={{ className: "p-0 m-0 fontsizing" }}>
                          Module: {imageData?.module}
                        </P>
                      )}
                      {imageData?.violationArea && (
                        <P attrPara={{ className: "fontsizing" }}>
                          Violation: {imageData?.violationArea}
                        </P>
                      )}
                      {/* <P>Time: {data?.time}</P> */}
                    </Card>
                  </TransformComponent>
                </Fragment>
              )}
            </TransformWrapper>
          </div>
        </Container>
      </div>
    </Fragment>
  );
};

export default SingleImage;
