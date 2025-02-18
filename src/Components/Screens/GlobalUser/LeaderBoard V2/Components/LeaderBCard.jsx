import React from 'react';
import { Card, CardBody, Row, Col, Container } from 'reactstrap';
import first from '../../../../../assets/images/svg-icon/first.svg';
import second from '../../../../../assets/images/svg-icon/second.svg';
import third from '../../../../../assets/images/svg-icon/third.svg';
import human from '../../../../../assets/images/svg-icon/human.svg';

const Tag = ({ label, color = "#43953B", bgColor = "#ebf7eb" }) => {
    if (!label) return null;
    return (
        <span
            style={{
                padding: "4px 6px",
                fontSize: "11px",
                fontWeight: "400",
                color: color,
                backgroundColor: bgColor,
                borderRadius: "4px",
                textAlign: "center",
                marginLeft: "4px",
                whiteSpace: "nowrap"
            }}
        >
            {label}
        </span>
    );
};

const InfoRow = ({ label, value, isGreen }) => (
    <div style={{
        textAlign: "center",
        width: "100%",
        paddingRight: "8px",
    }}>
        <div style={{
            color: "#6B7280",
            fontSize: "13px",
            fontWeight: "400",
            textAlign: "center",
        }}>
            {label}
        </div>
        <div style={{
            color: isGreen ? "#22C55E" : "#374151",
            fontSize: "13px",
            fontWeight: "500",
            textAlign: "center",
        }}>
            {label === "Target Status" ? (
                <Tag
                    label={value}
                    color={value === "Achieved" ? "#43953B" : "#6B7280"}
                    bgColor={value === "Achieved" ? "#ebf7eb" : "#F3F4F6"}
                />
            ) : value}
        </div>
    </div>
);

const PerformanceCard = ({ rank, data }) => {
    const getBadgeSvg = (rank) => {
        switch (rank) {
            case 1: return first;
            case 2: return second;
            case 3: return third;
            default: return null;
        }
    };

    return (
        <Card style={{
            borderRadius: "24px",
            border: "1px solid #E5E7EB",
            boxShadow: "0px 1px 2px rgba(0, 0, 0, 0.05)",
            position: "relative",
            display: "flex",
            flexDirection: "column"
        }}>
            <CardBody style={{
                padding: "24px",
                position: "relative",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "space-between"
            }}>
                <div style={{
                    position: "absolute",
                    top: "0",
                    left: "0",
                    transform: "translate(-25%, -25%)",
                    zIndex: "1"
                }}>
                    <img
                        src={getBadgeSvg(rank)}
                        alt={`Rank ${rank}`}
                        style={{ width: "48px", height: "48px" }}
                    />
                </div>

                <div style={{
                    position: "absolute",
                    top: "-40px",
                    left: "50%",
                    transform: "translate(-50%, 0)",
                    zIndex: "2",
                }}>
                    <img
                        src={human}
                        alt={data.Name}
                        className="rounded-circle"
                        style={{
                            width: "80px",
                            height: "80px",
                            objectFit: "cover",
                            border: "2px solid white",
                            borderRadius: "50%"
                        }}
                    />
                </div>

                {/* Adjusted spacing for name and sub-area */}
                <div style={{ marginTop: "25px" }}>
                    <h6 style={{
                        fontSize: "18px",
                        fontWeight: "600",
                        marginBottom: "2px", // Reduced from 4px
                        textAlign: "center"
                    }}>{data.Name}</h6>
                    <p style={{
                        fontSize: "13px",
                        color: "#6B7280",
                        marginBottom: "12px", // Added margin before divider
                        textAlign: "center"
                    }}>{data.areaid}</p>
                </div>

                {/* Adjusted divider spacing */}
                <hr style={{
                    width: "100%",
                    margin: "0 0 24px 0", // Adjusted margins
                    borderColor: "#E5E7EB",
                    borderWidth: "2px",
                }} />

                <div style={{
                    display: "grid",
                    gridTemplateColumns: "1fr 1fr",
                    rowGap: "24px",
                    width: "100%",
                    padding: "0 0px 24px 16px",
                    marginBottom: "10px"
                }}>
                    <InfoRow label="Total Alerts" value={data.totalalert} />
                    <InfoRow label="Compliance" value={`${data.compliance_percentage}%`} />
                    <InfoRow
                        label="Target Status"
                        value={data.target === "Not Set" ? "Target not set" : "Achieved"}
                        isGreen={data.target !== "Not Set"}
                    />
                    <InfoRow label="Points" value={data.points} />
                </div>

                <div style={{
                    backgroundColor: "#E8EFF6",
                    padding: "12px",
                    borderBottomLeftRadius: "24px",
                    borderBottomRightRadius: "24px",
                    fontSize: "13px",
                    color: "#6B7280",
                    textAlign: "center",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    gap: "8px",
                    position: "absolute",
                    bottom: "0",
                    left: "0",
                    right: "0",
                }}>
                    <svg
                        width="16"
                        height="16"
                        viewBox="0 0 16 16"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                        style={{ flexShrink: 0 }}
                    >
                        <path d="M8 14A6 6 0 108 2a6 6 0 000 12z" stroke="currentColor" strokeWidth="1.5" />
                        <path d="M8 4.5v3.5l2 2" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
                    </svg>
                    Time spent: {data.time} minutes
                </div>
            </CardBody>
        </Card>
    );
};

const PerformanceGrid = ({ loading, performanceData }) => {
    return (
        <>
            {loading ? (
                <div className="d-flex justify-content-center align-items-center" style={{ height: '250px' }}>
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading...</span>
                    </div>
                </div>
            ) : (
                <Container fluid={true} >
                    <Row>
                        {performanceData.map((data, index) => (
                            <Col lg={6} xl={4} md={6} sm={12} key={index} className="mb-4 mt-5">
                                <PerformanceCard
                                    rank={index + 1}
                                    data={data}
                                />
                            </Col>
                        ))}
                    </Row>
                </Container>
            )}
        </>
    );
};

export default PerformanceGrid;