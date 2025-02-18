import React from "react";
import { H4, H5, P } from "../../../../../AbstractElements";
import { Card, CardBody, Col, Progress } from "reactstrap";
import "./Gates.css";
// import { GatesData } from "../../../../../Data/DefaultDashboard";

const GatesSection = ({GatesData}) => {
  return (
    <Col xxl='3' xl="4" sm="6">
      <p className="m-0 p-0" style={{fontSize:'17px'}}>Emergency Blockage</p>
      <Card style={{height:'300px', padding: '10px 20px'}}>
        <CardBody className="chart-block">
          {GatesData?.map((g)=> <EachSection gate={g.gate} gateColor={g.gateColor} bar={g.bar} barColor={g.barColor} barColorPer={g.barColorPer} />)}
        </CardBody>
      </Card>
    </Col>
  );
};

function EachSection({gate, gateColor, bar, barColor, barColorPer}) {
  return <div className="main-box d-flex flex-row my-4" >
      <p className="para justify-items-center align-items-center px-2 rounded " style={{backgroundColor: gateColor}}>
       {gate}
      </p>
      <div
        className="px-2 d-flex flex-column "
        style={{
          width: "100%",
          height: "100%",
          alignItems: "self-end",
          paddingBottom: "5px",
        }}
      >
        <div
          className="d-flex justify-content-between"
          style={{ width: "100%" }}
        >
          <p style={{ fontSize: "10px", marginBottom: "0" }}>{gate}</p>
          <p style={{ fontSize: "10px", marginBottom: "0", color: barColorPer  }}>{`${bar}%`}</p>
        </div>
        <Progress className="prog-bar" color={barColor} value={bar} />
      </div>
    </div>
  
}

export default GatesSection;
