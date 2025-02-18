import React from "react";
import { H5 } from "../../../../AbstractElements";
import './liveCamera.css'

export default function MainGate({ mainCard, handleImage }) {
  return (
    <>
      {mainCard && (
        <div
          className="gate_camera_card"
        >
          <div
            style={{ padding: "0", textTransform: "capitalize" }}
            className="p-4  d-flex align-items-start"
          >
            <H5 attrH5={{className:'px-4'}}>Area: {mainCard?.roomName}</H5>
            <H5 attrH5={{className:'px-4'}}>Active: {String(mainCard?.active)}</H5>
            {/* <H5 attrH5={{className:'px-4'}}>{mainCard?.active ? 'Active' : 'In Active' }</H5> */}
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
            onClick={()=>handleImage(mainCard)}
              src={mainCard?.image_url}
              // className="iframee2"
              width="100%"
              height="100%"
              // title="YouTube video"
              // allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              // allowFullScreen
              // style={{ borderRadius: "0px 0px 26px 26px" }}
            ></img>
          </div>
        </div>
      )}
    </>
  );
}
