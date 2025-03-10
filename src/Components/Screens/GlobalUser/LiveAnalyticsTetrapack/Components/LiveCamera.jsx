import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Row, Col, Container } from 'reactstrap';
import CameraImg from '../asset/CameraImg.jpeg';
import Value from '../asset/ValueImg.jpeg';
import CautionModal from './AuthenticationModal/CautionModal';
import ImageZoom from '../../../../Dashboards/AreaDashbaord/reports/Components/LiveAlertsCards/ImageZoom';

const LiveCameraComparison = ({ images, barcodeData }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showZoomModal, setShowZoomModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageData, setImageData] = useState({});
    
    // Alarm state management
    const [alarmEnabled, setAlarmEnabled] = useState(true);
    const [alertDetected, setAlertDetected] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    
    const toggleModal = () => setIsModalOpen(!isModalOpen);
    
    const handleAlarmToggle = () => {
        setAlarmEnabled(!alarmEnabled);
        if (alertDetected && alarmEnabled) {
            // If we're disabling the alarm while an alert is active
            setAlertDetected(false);
            setIsAnimating(false);
        }
    };
    
    const handleOpenModal = () => {
        setIsModalOpen(true);
        // Simulate a mismatch alert detected when modal opens
        if (alarmEnabled) {
            setAlertDetected(true);
            setIsAnimating(true);
        }
    };
    
    const openZoomModal = (imageSrc, data = {}) => {
        setSelectedImage(imageSrc);
        setImageData(data);
        setShowZoomModal(true);
    };

    // Animation effect for the alarm button
    useEffect(() => {
        if (!alertDetected || !alarmEnabled) {
            setIsAnimating(false);
            return;
        }
        
        setIsAnimating(true);
        
        // Reset animation effect if component unmounts
        return () => {
            setIsAnimating(false);
        };
    }, [alertDetected, alarmEnabled]);

    // CSS for the animated button
    const animatedButtonStyle = {
        backgroundColor: alarmEnabled ? "#B80F0A" : "#28a745",
        border: "none",
        color: "#FFFFFF",
        boxShadow: isAnimating ? '0 0 10px #ff0000' : 'none',
        animation: isAnimating ? 'pulse 1s infinite' : 'none',
        transition: 'all 0.3s ease',
    };

    return (
        <>
        <Container fluid className='mb-2'>
            {/* Add the keyframes animation at the component level */}
            <style>
                {`
                @keyframes pulse {
                    0% { transform: scale(1); }
                    50% { transform: scale(1.05); }
                    100% { transform: scale(1); }
                }
                `}
            </style>
            
            <Card className="shadow h-100">
                <CardBody>
                    {/* Header section with buttons inline */}
                    <div className="d-flex justify-content-between align-items-center mb-3">
                        <CardTitle tag="h5" className="mb-0">Live Camera Image</CardTitle>
                        <div className="d-flex gap-2">
                            <button 
                                onClick={handleAlarmToggle} 
                                className="rounded-2 px-3 py-1" 
                                style={animatedButtonStyle}
                            >
                                {alarmEnabled ? "Disable Alarm" : "Enable Alarm"}
                            </button>
                            <button className="btn btn-light text-success rounded-2 px-3 py-1" style={{boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}}>
                                Matched
                            </button>
                            <button onClick={handleOpenModal} className="btn text-danger rounded-2 px-3 py-1" style={{backgroundColor:"#FEEAF0", boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}}>
                                Mis-match
                            </button>
                        </div>
                    </div>
                    
                    <Row>
                        {/* Left Side - Camera Feed Section */}
                        <Col md={8} className="position-relative shadow-md">
                            <div 
                                className="border rounded bg-light mb-2 border-none" 
                                style={{
                                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                    cursor: 'pointer'
                                }}
                                onClick={() => openZoomModal(CameraImg, { 
                                    cameraName: 'Main Camera', 
                                    areaName: 'Production Line', 
                                    alertName: 'Quality Check',
                                    lastActive: 'Just now'
                                })}
                            >
                                {/* Image container */}
                                <img
                                    src={CameraImg}
                                    alt="Product"
                                    className="img-fluid rounded"
                                    style={{
                                        width: '100%',
                                        height: '450px',
                                        objectFit: 'cover',
                                        backgroundColor: '#f8f9fa'
                                    }}
                                />
                                
                                {/* Show alert indicator when alert is detected and alarm is enabled */}
                                {alertDetected && alarmEnabled && (
                                    <div 
                                        className="position-absolute top-0 end-0 m-3 p-2 rounded-circle" 
                                        style={{
                                            backgroundColor: 'rgba(255, 0, 0, 0.97)',
                                            width: '20px',
                                            height: '20px',
                                            animation: 'pulse 1s infinite'
                                        }}
                                    />
                                )}
                            </div>
                            
                            <div className="d-flex gap-2 justify-content-center">
                                <button className="btn btn-success rounded-2 px-3 py-2" style={{boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}}>
                                    Run Conware
                                </button>
                                <button className="btn btn-light text-success rounded-2 px-3 py-2" style={{boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}}>
                                    Stop Conwar
                                </button>
                                <button onClick={handleOpenModal} className="btn text-danger rounded-2 px-3 py-2" style={{backgroundColor:"#FEEAF0", boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'}}>
                                    Re-Process
                                </button>
                            </div>
                        </Col>

                        {/* Right Side - Barcode Values Section */}
                        <Col md={4}>
                            <div className="d-flex flex-column gap-3">
                                {[1, 2].map((item, index) => (
                                    <div 
                                        key={item} 
                                        className="shadow-md"
                                        style={{
                                            backgroundColor: '#F8F9FA',
                                            boxShadow: '0 0 10px rgba(0,0,0,0.05)',
                                            borderRadius: "15px",
                                            cursor: 'pointer'
                                        }}
                                        onClick={() => openZoomModal(Value, { 
                                            cameraName: `Barcode Scanner ${item}`, 
                                            areaName: 'Quality Control',
                                            alertName: 'Barcode Verification',
                                            lastActive: '2 minutes ago'
                                        })}
                                    >
                                        <img
                                            src={Value}
                                            alt={`Barcode ${item}`}
                                            className="img-fluid"
                                            style={{
                                                width: '100%',
                                                height: '200px',
                                                objectFit: 'cover',
                                                borderTopLeftRadius: "10px",
                                                borderTopRightRadius: "10px"
                                            }}
                                        />
                                        <div className="d-flex align-items-center p-3" style={{
                                            backgroundColor: "#E6ECF3", 
                                            borderBottomLeftRadius: "15px",
                                            borderBottomRightRadius: "15px",
                                            boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.06)'
                                        }}>
                                            <span className="text-primary fw-bold me-2"
                                                style={{
                                                    border: '1px solid #0d6efd',
                                                    borderRadius: '4px',
                                                    padding: '0px 6px',
                                                    fontSize: '14px'
                                                }}>
                                                #
                                            </span>
                                            <span className="text-muted me-2" style={{ color: "#000000" }}>Value</span>
                                            <span className="fw-bold ms-auto" style={{ color: "#000000" }}>112233</span>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </Col>
                    </Row>
                    <CautionModal isOpen={isModalOpen} toggle={toggleModal} />
                </CardBody>
            </Card>
        </Container>
        
        {/* ImageZoom Modal */}
        {showZoomModal && selectedImage && (
            <ImageZoom 
                photo={selectedImage}
                setIsOpen={setShowZoomModal}
                setShowModal={setShowZoomModal}
                imageData={imageData}
                cameraTable={true}
            />
        )}
        </>
    );
};

export default LiveCameraComparison;