import React from "react";
import { CardTitle, Row, Col } from "reactstrap";
import upgreen from "../../../../../assets/images/svg-icon/upgreen.svg";

const CameraStatus = ({ camnumber, totalnumber, number }) => {
    return (
        <Row className="g-0">
            {/**
            <Col>
                <div style={{ display: 'flex', gap: '20px', alignItems: 'center',marginLeft:"12px"}}>
                    <CardTitle>Area: --</CardTitle>
                    <CardTitle>Status: --</CardTitle>
                    <CardTitle>Module: --</CardTitle>
                </div>
            </Col>
             */}

            <Col xs="12" md="auto" className="ms-auto">
                <div className=" shadow-sm"
                    style={{
                        borderRadius: "8px",
                        padding: "10px",
                        backgroundColor: "#fff",
                        border: "1px solid #ECECEC",
                        marginTop: "10px",
                        minWidth: "250px",
                        maxWidth: "100%"
                    }}
                >
                    <CardTitle
                        style={{
                            fontSize: "16px",
                            color: "#8C8C8C",
                            fontWeight: "500",
                            marginBottom: "4px"
                        }}
                    >
                        Live Cameras / Total Cameras
                    </CardTitle>
                    <Row className="g-0 align-items-center">
                        <Col>
                            <CardTitle
                                style={{
                                    fontSize: "30px",
                                    fontWeight: "500",
                                    color: "#595959",
                                    marginBottom: 0
                                }}
                            >
                                {camnumber} / {totalnumber}
                            </CardTitle>
                        </Col>
                        <Col xs="auto">
                            <div
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: "4px"
                                }}
                            >
                                <span
                                    style={{
                                        fontSize: "16px",
                                        fontWeight: "400",
                                        color: "#43953B"
                                    }}
                                >
                                    {number}
                                </span>
                                <img
                                    src={upgreen}
                                    alt="upgreen"
                                    style={{
                                        width: "12px"
                                    }}
                                />
                            </div>
                        </Col>
                    </Row>
                </div>
            </Col>
        </Row>
    );
};

export default CameraStatus;