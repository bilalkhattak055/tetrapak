import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardTitle, Row, Col, Container } from 'reactstrap';
import CameraImg from '../asset/CameraImg.jpeg';
import Value from '../asset/ValueImg.jpeg';
import CautionModal from './AuthenticationModal/CautionModal';
import ImageZoom from '../../../../Dashboards/AreaDashbaord/reports/Components/LiveAlertsCards/ImageZoom';

const LiveCameraComparison = ({ images, barcodeData, matchStatus, mismatchStatus }) => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [showZoomModal, setShowZoomModal] = useState(false);
    const [selectedImage, setSelectedImage] = useState(null);
    const [imageData, setImageData] = useState({});

    // Alarm state management - now driven by backend status
    const [alarmEnabled, setAlarmEnabled] = useState(true);
    const [isAnimating, setIsAnimating] = useState(false);
    const [statusToSend, setStatusToSend] = useState({
        match_reels: matchStatus,
        missMatch_reels: mismatchStatus,
        wrong_mismatch: false,
        reprocess: false,
        bypass: false,
        conveyer_status: false
    });

    // WebSocket connection for sending status updates
    const [statusSocket, setStatusSocket] = useState(null);

    // Set up WebSocket connection on component mount
    useEffect(() => {
        const socket = new WebSocket('ws://localhost:8064');

        socket.onopen = () => {
            console.log('Connected to status WebSocket server');
            setStatusSocket(socket);

            // Send initial status
            socket.send(JSON.stringify(statusToSend));
        };

        socket.onerror = (err) => {
            console.error('Error with status WebSocket:', err);
        };

        socket.onclose = () => {
            console.log('Status WebSocket connection closed');
        };

        return () => {
            if (socket) {
                socket.close();
            }
        };
    }, []);

    // Update status when matchStatus or mismatchStatus props change
    useEffect(() => {
        setStatusToSend({
            ...statusToSend,
            match_reels: matchStatus,
            missMatch_reels: mismatchStatus
        });

        // Send updated status if socket is connected
        if (statusSocket && statusSocket.readyState === WebSocket.OPEN) {
            statusSocket.send(JSON.stringify({
                ...statusToSend,
                match_reels: matchStatus,
                missMatch_reels: mismatchStatus
            }));
        }
    }, [matchStatus, mismatchStatus]);

    // Determine animation state based on backend status
    useEffect(() => {
        if (mismatchStatus && !matchStatus) {
            // Mismatch is true and match is false - show alarm animation
            setIsAnimating(true);
            setAlarmEnabled(true);
        } else if (matchStatus && !mismatchStatus) {
            // Match is true and mismatch is false - show match animation on Match button
            setIsAnimating(false);
            setAlarmEnabled(false);
        } else {
            // Default state or both are false
            setIsAnimating(false);
            setAlarmEnabled(false);
        }
    }, [matchStatus, mismatchStatus]);

    const toggleModal = () => setIsModalOpen(!isModalOpen);

    const handleAlarmToggle = () => {
        // When alarm button is clicked, disable alarm and send status update
        if (alarmEnabled) {
            setAlarmEnabled(false);
            setIsAnimating(false);

            // Update and send status to backend
            const newStatus = {
                ...statusToSend,
                missMatch_reels: false
            };
            setStatusToSend(newStatus);

            if (statusSocket && statusSocket.readyState === WebSocket.OPEN) {
                statusSocket.send(JSON.stringify(newStatus));
            }
        }
    };

    const handleOpenModal = () => {
        setIsModalOpen(true);
        setIsAnimating(false);
        setAlarmEnabled(false);
        // When mismatch button is clicked, send status update
        const newStatus = {
            ...statusToSend,
            missMatch_reels: true,
            match_reels: false
        };
        setStatusToSend(newStatus);

        if (statusSocket && statusSocket.readyState === WebSocket.OPEN) {
            statusSocket.send(JSON.stringify(newStatus));
        }
    };

    const openZoomModal = (imageSrc, data = {}) => {
        setSelectedImage(imageSrc);
        setImageData(data);
        setShowZoomModal(true);
    };

    // Animation styles
    const animatedButtonStyle = {
        backgroundColor: "#B80F0A",
        border: "none",
        color: "#FFFFFF",
        boxShadow: isAnimating ? '0 0 10px #ff0000' : 'none',
        animation: isAnimating ? 'pulse 1s infinite' : 'none',
        transition: 'all 0.3s ease',
        fontSize:"1em"
    };

    const matchButtonStyle = {
        boxShadow: matchStatus && !mismatchStatus ? '0 0 10px rgb(0, 196, 26)' : 'none',
        animation: matchStatus && !mismatchStatus ? 'pulse 1s infinite' : 'none',
        transition: 'all 0.3s ease',
        fontSize:"1em"
    };

    // Make sure we have valid data to display
    const mainCameraImage = Array.isArray(images) && images.length > 0 ? images[0] : CameraImg;
    const barcodes = Array.isArray(barcodeData) && barcodeData.length > 0 ? barcodeData : [
        { value: '112233', image: Value },
        { value: '112233', image: Value }
    ];

    return (
        <>
            <Container fluid className='mb-2'>
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
                        <Row className="align-items-center mb-3">
                            <Col xs={12} md={6}>
                                <CardTitle tag="h5" className="mb-md-0 mb-2 " style={{fontSize:"26px"}}>Live Camera Image</CardTitle>
                            </Col>
                            <Col xs={12} md={6}>
                                <div className="d-flex gap-2 justify-content-md-end" >
                                    <button
                                
                                        onClick={handleAlarmToggle}
                                        className="rounded-2 px-3 py-1 shadow-sm"
                                        style={animatedButtonStyle}
                                        disabled={!alarmEnabled}
                                    >
                                        Alarm Active
                                    </button>
                                    <button
                                        className="btn btn-light text-success shadow-sm rounded-2 px-3 py-1"
                                        style={matchButtonStyle}
                                    >
                                        Matched
                                    </button>
                                    <button
                                        onClick={handleOpenModal}
                                        className="btn text-danger rounded-2 shadow-md px-3 py-1"
                                        style={{ backgroundColor: "#FEEAF0", boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',fontSize:"1em" }}
                                    >
                                        Mis-match
                                    </button>
                                </div>
                            </Col>
                        </Row>
                        <Row>
                            {/* Left Side - Camera Feed Section */}
                            <Col md={8} className="position-relative shadow-md">
                                <div
                                    className="border rounded bg-light mb-2 border-none"
                                    style={{
                                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.15), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                                        cursor: 'pointer'
                                    }}
                                    onClick={() => openZoomModal(mainCameraImage, {
                                        cameraName: 'Main Camera',
                                        areaName: 'Production Line',
                                        alertName: 'Quality Check',
                                        lastActive: 'Just now'
                                    })}
                                >
                                    {/* Image container */}
                                    <img
                                        src={mainCameraImage}
                                        alt="Product"
                                        className="img-fluid rounded"
                                        style={{
                                            width: '100%',
                                            height: '450px',
                                            objectFit: 'cover',
                                            backgroundColor: '#f8f9fa'
                                        }}
                                    />

                                    {/* Show alert indicator when alarm is enabled and animating */}
                                    {alarmEnabled && isAnimating && (
                                        <div
                                            className="position-absolute top-0 end-0 m-3 p-2 rounded-circle"
                                            style={{
                                                backgroundColor: 'rgba(177, 0, 0, 0.97)',
                                                width: '20px',
                                                height: '20px',
                                                animation: 'pulse 1s infinite'
                                            }}
                                        />
                                    )}
                                </div>

                                <div className="d-flex gap-2 justify-content-center mb-3 mt-1">
                                    <button className="btn btn-success rounded-2 px-3 py-2" style={{ boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                                        Run Conveyor
                                    </button>
                                    <button className="btn text-danger rounded-2 px-3 py-2" style={{ backgroundColor: "#FEEAF0", boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' }}>
                                        Stop Conveyor
                                    </button>
                                </div>
                            </Col>

                            {/* Right Side - Barcode Values Section */}
                            <Col md={4}>
                                <div className="d-flex flex-column gap-3">
                                    {barcodes.slice(0, 2).map((barcode, index) => (
                                        <div
                                            key={index}
                                            className="shadow-md"
                                            style={{
                                                backgroundColor: '#F8F9FA',
                                                boxShadow: '0 0 10px rgba(0,0,0,0.05)',
                                                borderRadius: "15px",
                                                cursor: 'pointer'
                                            }}
                                            onClick={() => openZoomModal(barcode.image, {
                                                cameraName: `Barcode Scanner ${index + 1}`,
                                                areaName: 'Quality Control',
                                                alertName: 'Barcode Verification',
                                                lastActive: '2 minutes ago'
                                            })}
                                        >
                                            <img
                                                src={barcode.image}
                                                alt={`Barcode ${index + 1}`}
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
                                                    }}
                                                >
                                                    #
                                                </span>
                                                <span className="text-muted me-2" style={{ color: "#000000" }}>Value</span>
                                                <span className="fw-bold ms-auto" style={{ color: "#000000" }}>{barcode.value}</span>
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