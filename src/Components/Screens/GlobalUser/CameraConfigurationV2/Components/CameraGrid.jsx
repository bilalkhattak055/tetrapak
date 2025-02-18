import React, { useState } from "react";
import { Card, CardBody, CardTitle, Modal, ModalBody, ModalHeader } from "reactstrap";
import CameraModal from "./CameraImageModal";

const Tag = ({ label, color = "#43953B", bgColor = "#ebf7eb" }) => {
    if (!label) return null;

    return (
        <span
            style={{
                padding: "4px 6px",
                fontSize: "13px",
                fontWeight: "500",
                color: color,
                backgroundColor: bgColor,
                borderRadius: "4px",
                textAlign: "center",
                marginLeft: "4px",
            }}
        >
            {label}
        </span>
    );
};

const InfoRow = ({ label, value, isModules = false }) => (
    <div
        style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: isModules ? "flex-start" : "center",
            marginBottom: "8px",
        }}
    >
        <span style={{ color: "#8C8C8C", fontSize: "14px" }}>{label}:</span>
        <div
            style={{
                marginLeft: "auto",
                color: "#595959",
                display: "flex",
                flexWrap: "wrap",
                justifyContent: "flex-end",
            }}
        >
            {value}
        </div>
    </div>
);

const CameraCard = ({
    cameraID,
    cameraImg,
    cameraName,
    areaName,
    owner,
    subarea,
    modules,
    status,
    lastActive,
    number,
}) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isHovering, setIsHovering] = useState(false);
    const [hoveredModule, setHoveredModule] = useState([]);
    
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    
    const handleHover = (e, module) => {
        setIsHovering(true);
        setHoveredModule(module);
    };
    
    const handleMouseLeave = () => {
        setIsHovering(false);
        setHoveredModule([]);
    };

    const modulesTags = (
        <>
            {modules.map((module, index) => (
                <div key={index} style={{ display: "flex", alignItems: "center", position: "relative" }}>
                    {/* Display first module normally */}
                    {index === 0 ? (
                        <Tag
                            label={module}
                            color={module === "Helmet" ? "#1890FF" : module === "Vest" ? "#722ED1" : "#43953B"}
                            bgColor={module === "Helmet" ? "#E6F7FF" : module === "Vest" ? "#F9F0FF" : "#EBF7EB"}
                        />
                    ) : null}
    
                    {modules.length > 2 && index === 0 && (
                        <span
                            style={{
                                fontSize: "10px",
                                fontWeight: 600,
                                border: "1px dashed #8C8C8C",
                                borderRadius: "50%",
                                width: "20px",
                                height: "20px",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                textAlign: "center",
                                color: '#8C8C8C',
                                cursor: 'pointer',
                                marginLeft: "5px",
                            }}
                            onMouseEnter={(e) => handleHover(e, modules.slice(1))}
                            onMouseLeave={handleMouseLeave}
                        >
                            +{modules.length - 1}
                        </span>
                    )}
                </div>
            ))}
        </>
    );
    
    return (
        <>
            <Card
                className="mb-4 mt-3 shadow-sm"
                style={{ backgroundColor: "#FFFFFF" }}
            >
                <CardBody className="p-0">
                    <div style={{ padding: "16px 16px 0" }}>
                        <div className="d-flex justify-content-between align-items-center mb-2">
                            <CardTitle
                                tag="h5"
                                className="mb-0"
                                style={{ fontSize: "16px", fontWeight: "500" }}
                            >
                                Camera#{number}
                            </CardTitle>
                            <div>
                                <span style={{ fontSize: "14px", color: "#595959" }}>
                                    Status:
                                </span>
                                <Tag
                                    label={status}
                                    color={status === "Active" ? "#43953B" : "#B53131"}
                                    bgColor={status === "Inactive" ? "#FDE3E3" : "#EEF8ED"}
                                />
                            </div>
                        </div>
                    </div>

                    <div
                        className="image-container mt-3"
                        onClick={toggleModal}
                        style={{
                            margin: "0px 16px 16px 16px",
                            borderRadius: "20px",
                            overflow: "hidden",
                            backgroundColor: "#f5f5f5",
                            position: "relative",
                            paddingTop: "37.75%",
                            cursor: "pointer", // Add cursor pointer to indicate clickable
                        }}
                    >
                        <img
                            src={cameraImg}
                            alt={`Camera ${number}`}
                            style={{
                                position: "absolute",
                                top: "0",
                                left: "0",
                                width: "100%",
                                height: "100%",
                                objectFit: "cover",
                                display: "block",
                            }}
                        />
                    </div>

                    <div style={{ padding: "0 14px 0" }}>
                        <InfoRow label="Camera ID" value={cameraID} />
                        <InfoRow label="Camera Name" value={cameraName} />
                        <InfoRow label="Area Name" value={areaName} />
                        <InfoRow label="Owner" value={owner} />
                        <InfoRow label="Sub Area" value={subarea} />
                        <InfoRow label="Modules" value={modulesTags} isModules />
                        <InfoRow label="Last Active" value={lastActive} />
                    </div>
                </CardBody>
            </Card>

            {/* Show hovered modules container */}
            {isHovering && (
                <div
                    style={{
                        position: "absolute",
                        top: "454px",
                        left: "92%",
                        transform: "translateX(-50%)",
                        backgroundColor: "#FFFFFF",
                        borderRadius: "5px",
                        boxShadow: "0 4px 6px rgba(0,0,0,0.1)",
                        padding: "10px 8px",
                        zIndex: "10",
                        border: "0.5px solid #ccc",
                    }}
                >
                    <ul style={{ padding: "0", margin: "0", listStyle: "none" }}>
                        {hoveredModule.map((module, index) => (
                            <li key={index} className="mt-2">
                                <Tag
                                    label={module}
                                    color={module === "Helmet" ? "#1890FF" : module === "Vest" ? "#722ED1" : "#43953B"}
                                    bgColor={module === "Helmet" ? "#E6F7FF" : module === "Vest" ? "#F9F0FF" : "#EBF7EB"}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
            )}

            <CameraModal
                isOpen={isModalOpen}
                toggle={toggleModal}
                imageUrl={cameraImg}
                cameraName={cameraName}
                lastActive={lastActive}
                AreaName={areaName}
            />
        </>
    );
};

export default CameraCard;
