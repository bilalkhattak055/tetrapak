import React, { useRef } from 'react';
import { Modal, ModalBody,Row,Col } from 'reactstrap';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";


const CameraModal = ({ isOpen, toggle, imageUrl, cameraName, lastActive, AreaName }) => {
    const transformRef = useRef(null);

    const handleZoomIn = () => {
        if (transformRef.current) {
            transformRef.current.zoomIn();
        }
    };

    const handleZoomOut = () => {
        if (transformRef.current) {
            transformRef.current.zoomOut();
        }
    };

    const handleResetZoom = () => {
        if (transformRef.current) {
            transformRef.current.resetTransform();
        }
    };

    return (
        <Row>
        <Col xs={8}>
        <Modal
            className='camera-modal'
            isOpen={isOpen}
            toggle={toggle}
            size="xl"
            style={{
                maxWidth: '95vw',
                width: '100%',
                margin: '2.5vh auto',
                height: '100%',
                minHeight:"95vh"
            }}
            backdropClassName="modal-backdrop-dark"
        >
            <ModalBody 
                className="p-0 position-relative" 
                style={{ 
                    height: '95vh',
                    display: 'flex',
                    flexDirection: 'column',
                    backgroundColor: '#000',
                    borderRadius: '3px',
                    overflow: 'hidden'
                }}
            >
                {/* Zoom Controls */}
                <div
                    style={{
                        position: 'absolute',
                        top: '15px',
                        right: '15px',
                        display: 'flex',
                        alignItems: 'center',
                        zIndex: 1050,
                        backgroundColor: '#1B1B1B',
                        opacity:'95%',
                        borderRadius: '10px',
                        padding: '5px'
                    }}
                >
                    <button
                        onClick={handleZoomIn}
                        style={{
                            padding: '8px 15px',
                            border: 'none',
                            color: 'white',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            margin: '0 5px',
                            backgroundColor: '#1B1B1B',
                            fontWeight: 500,
                        }}
                    >
                        +
                    </button>
                    <button
                        onClick={handleZoomOut}
                        style={{
                            padding: '8px 16px',
                            border: 'none',
                            color: 'white',
                            borderRadius: '5px',
                            cursor: 'pointer',
                            margin: '0 5px',
                            backgroundColor: '#1B1B1B',
                            fontWeight: 500,
                        }}
                    >
                        -
                    </button>
                    <button
                        onClick={handleResetZoom}
                        style={{
                            padding: '5px 15px',
                            backgroundColor: '#1B1B1B',
                            color: 'white',
                            borderRadius: '20px',
                            border: "1px solid white",
                            cursor: 'pointer',
                            margin: '0 5px',
                            fontWeight: 500,
                        }}
                    >
                        Reset
                    </button>
                </div>

                {/* Image Container */}
                <div className="image-container"
                style={{ 
                    flex: '1 1 auto',
                    minHeight: 0,
                    position: 'relative',
                    backgroundColor: '#000'
                }}>
                    <TransformWrapper
                        ref={transformRef}
                        defaultScale={1}
                        defaultPositionX={0}
                        defaultPositionY={0}
                    >
                        <TransformComponent
                            wrapperStyle={{
                                width: '100%',
                                height: '100%'
                            }}
                            contentStyle={{
                                width: '100%',
                                height: '100%'
                            }}
                        >
                            <img
                                src={imageUrl}
                                alt={cameraName}
                                style={{
                                    width: '100%',
                                    height: '100%',
                                }}
                            />
                        </TransformComponent>
                    </TransformWrapper>
                </div>

                {/* Camera Information - Now Fixed */}
                <div
                    style={{
                        backgroundColor: "#1B1B1B",
                        color: 'white',
                        padding: "15px",
                        flex: '0 0 auto',
                        width: '100%',
                        borderTop: '1px solid #333'
                    }}
                >
                    <h3 style={{ 
                        fontSize: '20px', 
                        marginBottom: '5px',
                        fontWeight: 500
                    }}>
                        Camera Name: {cameraName}
                    </h3>
                    <div style={{ 
                        display: 'flex', 
                        gap: '20px', 
                        fontSize: '14px'
                    }}>
                        <p style={{ margin: 0 }}>Last Active: {lastActive}</p>
                    </div>
                    <p style={{ margin: 0 }}>Area Name: {AreaName}</p>
                </div>
            </ModalBody>
        </Modal>
        </Col>
        </Row>
    );
};

export default CameraModal;
