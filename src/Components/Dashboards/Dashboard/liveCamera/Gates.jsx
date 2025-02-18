import React from "react";
import { Col, Card, CardBody, Row } from "reactstrap";

export default function Gates({ gate, setMainCard, activeRoom, setActiveRoom }) {
  function handleCard(item) {
    setMainCard(item);
    setActiveRoom(item.roomName); // Update activeRoom in parent
  }

  return (
    <Card
      style={{
        backgroundColor: gate.roomName === activeRoom ? "#ebebeb" : "white"
      
      }}
      onClick={() => handleCard(gate)}
      className="col-md-4 col-lg-12 col-sm-6 col-6 gateMainCard"
    >
      <CardBody
        style={{
          display: "flex",
           justifyContent: "space-between",
          alignItems: "center",
          overflow:'auto',
          
     
          
        }}
      >
        <Row style={{display:'flex', alignItems:'center',  overflow:'auto',justifyContent:'space-between',  width:'100%', scrollbarWidth: '5px',  margin:'0px', padding:'0px'}}>
        <Col xl="6" lg="6" md="6" sm="6" xs="12">
          <div
            className="gateNumber"
            style={{ paddingInline: "10px", paddingTop: "20px" }}
          >
            Gate #{gate.gate}
          </div>
          <div
            className="room"
            style={{ paddingInline: "10px", paddingBottom: "20px" }}
          >
            Room
          </div>
        </Col>
        <Col
        className="gateCol"
          style={{ display: "flex",   justifyContent:'end',padding:'0px' }}
          xl="6"
          lg="6"
          md="6"
          sm="6"
          xs="12"
        >
          <img
            src={gate.thumbnail} // Assuming `gate.thumbnail` is the URL of the thumbnail image
            width='134px'
            height='96px'
            alt="Video Thumbnail"
            style={{ borderRadius: '10px' }}
            className="gateImage"
          />
        </Col>
        </Row>
      </CardBody>
    </Card>
  );
}
