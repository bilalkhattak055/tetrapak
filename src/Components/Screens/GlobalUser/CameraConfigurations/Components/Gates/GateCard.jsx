import React from "react";
import { Col, Card, CardBody, Row } from "reactstrap";

export default function GateCard({
  gate,
  setMainCard,
  setActiveRoom,
  mainCard,
}) {
  const handleCard = (item) => {
    setMainCard(item);
    setActiveRoom(item.roomName); // Update activeRoom in parent
  };

  const RenderText = ({ title, value, gate }) => {
    return (
      <div
        style={{
          paddingInline: "10px",
          color: gate === mainCard ? "white" : "black",
        }}
      >
        <span>{title}: </span>
        <span>{value}</span>
      </div>
    );
  };

  return (
    <>
      <Card
        style={{
          backgroundColor: gate === mainCard ? "#1e67d6" : "white",
          color: gate === mainCard ? "white" : "black",
          marginBottom: 10,
          margin: "5px 5px",
        }}
        onClick={() => handleCard(gate)}
        className="camera_list_card"
      >
        <CardBody 
        className="camera_card_body"
        >
          <Row
            style={{
              alignItems: "center",
            }}
          >
            <Col className="custom-col-9 col-sm-8 col-md-8 col-lg-8 col-xl-7 col-xxl-8">
              <div className="gateNumber" style={{ paddingInline: "10px" }}>
                Camera #{gate?.gate}
              </div>
              <div
                className="room"
                style={{
                  paddingInline: "10px",
                  color: gate === mainCard ? "white" : "black",
                }}
              >
                <span>Module: </span>
                <span>{gate?.module}</span>
              </div>
              <div
                className="room"
                style={{
                  paddingInline: "10px",
                  color: gate === mainCard ? "white" : "black",
                }}
              >
                <span>Camera ID: </span>
                <span> {gate?.cameraId}</span>
              </div>
              <div
                className="room"
                style={{
                  paddingInline: "10px",
                  color: gate === mainCard ? "white" : "black",
                }}
              >
                <span>Sub Area: </span>
                <span> {gate?.subArea}</span>
              </div>
              <div
                className="room"
                style={{
                  paddingInline: "10px",
                  color: gate === mainCard ? "white" : "black",
                }}
              >
                <span>Camera IP: </span>
                <span> {gate?.cameraIP}</span>
              </div>
            </Col>
            <Col className="custom_camera_card col-4 col-sm-3 col-md-4 col-lg-4 col-xl-5 col-xxl-4 text-end">
              <img
                src={gate?.image_url}
                alt="Camera Image"
                className="camera_image"
              />
            </Col>
          </Row>
        </CardBody>
      </Card>

      {/* <Card
        className="col-md-4 col-lg-12 col-sm-6 col-6 camera_list_card"
        style={{
          margin: "5px -7px",
          backgroundColor: gate === mainCard ? "#1e67d6" : "white",
          color: gate === mainCard ? "white" : "black",
          marginBottom: 10,
        }}
        onClick={() => handleCard(gate)}
      >
        <CardBody className="camera_card_body">
          <Row
            style={{
              alignItems: "center",
            }}
          >
            <Col className="col-9 col-sm-9 col-md-8 col-lg-8 col-xl-8 col-xxl-8">
              <div className="gateNumber" style={{ paddingInline: "10px" }}>
                Camera #{gate?.gate}
              </div>
              <RenderText title={"Module"} value={gate?.module} gate={gate} />
              <RenderText
                title={"Camera ID"}
                value={gate?.cameraId}
                gate={gate}
              />
              <RenderText
                title={"Sub Area"}
                value={gate?.subArea}
                gate={gate}
              />
              <RenderText
                title={"Camera IP"}
                value={gate?.cameraIP}
                gate={gate}
              />

              <div
                style={{
                  paddingInline: "10px",
                }}
              >
                <span>Status: </span>
                <span
                  className={
                    gate === mainCard
                      ? "white"
                      : gate?.active
                      ? "font-success"
                      : "font-danger"
                  }
                  style={{ fontWeight: 500, fontSize: 15 }}
                >
                  {" "}
                  {gate?.active ? "Active" : "Inactive"}
                </span>
              </div>
            </Col>
            <Col className="custom_camera_card col-3 col-sm-3 col-md-4 col-lg-4 col-xl-4 col-xxl-4 text-end">
              <img
                src={gate?.image_url}
                alt="Camera Image"
                className="camera_image"
              />
            </Col>
          </Row>
        </CardBody>
      </Card> */}
    </>
  );
}
