import React from "react";
import { H5 } from "../../../../../../AbstractElements";
import "./main_gate.css";

export default function GlobalMainGate({ mainCard, handleImage }) {


  return (
    <>
      {mainCard && (
        <div className="camera_card">
          <div
            style={{
              padding: "0",
              textTransform: "capitalize",
              backgroundColor: mainCard?.active ? "green" : "#a82a21",
              borderTopLeftRadius: 10,
              borderTopRightRadius: 10,
              color: "white",
              marginBottom:5
            }}
            className="p-4 d-flex align-items-start"
          >
            <H5 attrH5={{ className: "px-0" }}>Area: {mainCard?.roomName}</H5>
            <H5 attrH5={{ className: "px-4" }}>
              Status: {mainCard?.active ? "Active" : "Inactive"}
            </H5>
          </div>
          <div
          style={{ padding: "0" }}
          xl="12"
          lg="12"
          md="12"
          sm="12"
          xs="12"
          className="mx-0 p-0"
        >
          <img
            onClick={() => handleImage(mainCard)}
            src={mainCard?.image_url}
            width="100%"
            height="100%"
            alt="Camera Image"
          ></img>
        </div>
          
         
        </div>
      )}
    </>
  );
}
