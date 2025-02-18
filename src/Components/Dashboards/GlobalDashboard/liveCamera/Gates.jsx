import React, { useEffect, useState } from "react";
import { Col, Card, CardBody, Row } from "reactstrap";

export default function Gates({
  gate,
  setMainCard,
  activeRoom,
  setActiveRoom,
  roomName,
}) {
  const [role, setrole] = useState(
    localStorage.getItem("role")?.replace(/['"]+/g, "")
  );
  function handleCard(item) {
    console.log(item)
    setMainCard(item);
    setActiveRoom(item.roomName); // Update activeRoom in parent
  }
  return (
    <Card
      style={{
        backgroundColor: gate.roomName === activeRoom ? "#ebebeb" : "white",
      }}
      onClick={() => handleCard(gate)}
      className="col-md-4 col-lg-12 col-sm-6 col-6 gateMainCardd"
    >
      <CardBody
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          overflow: "auto",
        }}
        className="cardBodyPadding"
      >
        <Row
          style={{
            display: "flex",
            alignItems: "center",
            overflow: "auto",
            justifyContent: "space-between",
            width: "100%",
            scrollbarWidth: "5px",
            margin: "0px",
            padding: "0px",
          }}
        >
          <Col xl="6" lg="6" md="6" sm="6" xs="8">
            <div className="gateNumber" style={{ paddingInline: "10px" }}>
              Camera #{gate?.gate}
            </div>

            {role === "area" ? (
              ""
            ) : (
              <>
                {/* <div
                className="room"
                style={{ paddingInline: "10px", }}
              >
                <span>Factory: </span><span>{gate.factory}</span>

              </div> */}
              </>
            )}
            <div className="room" style={{ paddingInline: "10px" }}>
              <span>Module: </span>
              <span>{gate?.module}</span>
            </div>
            <div className="room" style={{ paddingInline: "10px" }}>
              <span>Camera ID: </span>
              <span> {gate?.cameraID}</span>
            </div>
            <div className="room" style={{ paddingInline: "10px" }}>
              <span>Sub Area: </span>
              <span> {gate?.subArea}</span>
            </div>
            <div className="room" style={{ paddingInline: "10px" }}>
              <span>Camera IP: </span>
              <span> {gate?.cameraIP}</span>
            </div>
          </Col>
          <Col
            className="gateCol "
            style={{ display: "flex", justifyContent: "end", padding: "0px" }}
            xl="6"
            lg="6"
            md="6"
            sm="6"
            xs="4"
          >
            <img
              src={gate?.image_url} // Assuming `gate.thumbnail` is the URL of the thumbnail image
              alt="Camera Image"
              style={{ borderRadius: "10px" }}
              className="gateImagee"
            />
          </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
