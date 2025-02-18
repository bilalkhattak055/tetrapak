import React, { useState, useEffect } from 'react';
import { Card, CardBody, CardSubtitle, Row, Col, Badge, Spinner } from 'reactstrap';
import Camera from '../assets/Camera.png';
import camicon from '../assets/camicon.svg';
import Graphicon from '../assets/Graphicon.svg';
import watchicon from '../assets/watchicon.svg';
import calender from '../assets/calender.svg';
import ImageZoom from '../../../../Dashboards/AreaDashbaord/reports/Components/LiveAlertsCards/ImageZoom';


const FILTER_STORAGE_KEY = 'liveAlertFilters';

// Function to remove date-related fields from filters
const removeDateFields = (filters) => {
    const {
        customStartDate,
        customEndDate,
        date,
        month,
        week,
        timeFilterSelection,
        starting,
        ending,
        ...cleanedFilters
    } = filters;
    return cleanedFilters;
};

const formatFilters = (filters) => {
    const formattedFilters = [];

    // Handle shifts
    if (filters.shift && filters.shift.length > 0) {
        formattedFilters.push(`Shift: ${filters.shift.join(' | ')}`);
    }
    //subarea
    if (filters.subarea && filters.subarea.length > 0) {
        formattedFilters.push(`Sub Area: Gate ${filters.subarea[0]}`);
    }

    // Handle week filter
    if (filters.week) {
        formattedFilters.push(`Week: ${filters.week}`);
    }

    // Handle month filter
    if (filters.month) {
        formattedFilters.push(`Month: ${filters.month}`);
    }

    // Handle other filters
    const filterMappings = {
        module: 'Module',
        area: 'Area',
        severity: 'Severity',
        approval: 'Approval'
    };

    Object.entries(filterMappings).forEach(([key, label]) => {
        if (filters[key] && filters[key] !== '_' && filters[key] !== 'Select Approval') {
            formattedFilters.push(`${label}: ${filters[key]}`);
        }
    });

    return formattedFilters;
};

const LiveAlertCards = ({ filters, alerts, loading, currentPage, totalPages, onPageChange }) => {
    const [showModal, setShowModal] = useState(false);
    const [activeModalIndex, setActiveModalIndex] = useState(null);

    // Save filters to localStorage, excluding date-related fields
    useEffect(() => {
        if (Object.keys(filters).length > 0) {
            const cleanedFilters = removeDateFields(filters); // Remove date fields
            localStorage.setItem(FILTER_STORAGE_KEY, JSON.stringify(cleanedFilters));
        }
    }, [filters]);

    const openModal = (index) => {
        setActiveModalIndex(index);
        setShowModal(true);
    };

    if (loading) {
        return <div className="text-center mt-4"><Spinner color="primary" /></div>;
    }

    const formattedFilters = formatFilters(filters);

    return (
        <>
            {formattedFilters.length > 0 && (
                <div className="px-4 py-3 mb-4 bg-light rounded">
                    {formattedFilters.map((filter, index) => (
                        <span
                            key={index}
                            className="me-4 d-inline-block"
                            style={{
                                color: '#444',
                                fontSize: '14px',
                                fontWeight: '500'
                            }}
                        >
                            {filter}
                        </span>
                    ))}
                </div>
            )}

            <Row>
                {alerts.map((alert, index) => (
                    <Col sm="6" md="6" lg="6" xl="4" key={alert.operation_safety_id}>
                        <Card className="mb-4" style={{
                            borderRadius: '20px',
                            overflow: 'hidden',
                            border: '1px solid #e0e0e0',
                            boxShadow: '0 2px 4px rgba(0,0,0,0.05)',
                            padding: '30px 20px 10px 20px'
                        }}>
                            <div style={{ position: 'relative' }}>
                                <img
                                    src={alert.image || Camera}
                                    alt="Camera View"
                                    style={{
                                        width: '100%',
                                        height: '180px',
                                        backgroundColor: '#f5f5f5',
                                        marginTop: "10px",
                                        borderRadius: "5px",
                                        cursor: 'pointer',
                                        objectFit: "cover"
                                    }}
                                    onClick={() => openModal(index)}
                                />
                                <Badge
                                    color="danger"
                                    style={{
                                        position: 'absolute',
                                        top: '-25px',
                                        right: 1,
                                        borderRadius: '20px',
                                        fontSize: '14px',
                                        fontWeight: '500',
                                        backgroundColor: '#ff3b30',
                                    }}
                                >
                                    {alert.violation}
                                </Badge>
                            </div>
                            <CardBody style={{ textAlign: 'left', padding: '20px 0 0 0' }}>
                                <CardSubtitle tag="div" className="mb-3" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    color: '#444',
                                    fontSize: '14px'
                                }}>
                                    <img src={camicon} alt='camicon' />
                                    Camera ID: {alert.camera_id}
                                </CardSubtitle>

                                <CardSubtitle tag="div" className="mb-3" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    color: '#444',
                                    fontSize: '14px'
                                }}>
                                    <img src={Graphicon} alt='graph' />
                                    {alert.violationArea}
                                </CardSubtitle>

                                <CardSubtitle tag="div" className="mb-3" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    color: '#444',
                                    fontSize: '14px'
                                }}>
                                    <img src={watchicon} alt='watchicon' />
                                    {alert.shift}
                                </CardSubtitle>

                                <CardSubtitle tag="div" className="mb-3" style={{
                                    display: 'flex',
                                    alignItems: 'center',
                                    gap: '12px',
                                    color: '#444',
                                    fontSize: '14px'
                                }}>
                                    <img src={calender} alt='calender' />
                                    {`${alert.date} ${alert.time}`}
                                </CardSubtitle>

                                <Badge
                                    className='shadow-sm'
                                    color="light"
                                    style={{
                                        borderRadius: '15px',
                                        padding: '6px 16px',
                                        color: '#635470',
                                        backgroundColor: '#F6F9FB',
                                        fontWeight: '500',
                                        fontSize: '13px',
                                        border: '1px solid #635470',
                                        boxShadow: '0px 8px 8px #00000040'
                                    }}
                                >
                                    {alert.violationArea}
                                </Badge>
                            </CardBody>
                        </Card>
                    </Col>
                ))}
            </Row>

            {totalPages > 1 && (
                <div className="d-flex justify-content-center mt-4 mb-4">
                    <button
                        className="btn btn-link text-decoration-none"
                        onClick={() => onPageChange(currentPage - 1)}
                        disabled={currentPage === 1}
                        style={{
                            color: currentPage === 1 ? '#6c757d' : '#635470',
                            cursor: currentPage === 1 ? 'not-allowed' : 'pointer',
                            border: 'none',
                            background: 'none',
                            padding: '0 10px',
                            fontSize: '14px'
                        }}
                    >
                        Previous
                    </button>

                    {Array.from({ length: totalPages }, (_, i) => i + 1).map(pageNum => {
                        // Show ellipsis for large page ranges
                        if (totalPages > 7) {
                            if (
                                pageNum === 1 ||
                                pageNum === totalPages ||
                                (pageNum >= currentPage - 1 && pageNum <= currentPage + 1)
                            ) {
                                return (
                                    <button
                                        key={pageNum}
                                        onClick={() => onPageChange(pageNum)}
                                        className={`btn ${currentPage === pageNum ? 'btn-link' : 'btn-link'}`}
                                        style={{
                                            minWidth: '32px',
                                            height: '32px',
                                            padding: '4px 8px',
                                            margin: '0 4px',
                                            borderRadius: '4px',
                                            color: currentPage === pageNum ? 'white' : '#635470',
                                            backgroundColor: currentPage === pageNum ? '#635470' : 'transparent',
                                            border: 'none',
                                            textDecoration: 'none',
                                            fontSize: '14px'
                                        }}
                                    >
                                        {pageNum}
                                    </button>
                                );
                            } else if (
                                pageNum === currentPage - 2 ||
                                pageNum === currentPage + 2
                            ) {
                                return <span key={pageNum} style={{ margin: '0 4px', color: '#635470' }}>...</span>;
                            }
                            return null;
                        }

                        // Show all pages if total pages is small
                        return (
                            <button
                                key={pageNum}
                                onClick={() => onPageChange(pageNum)}
                                className={`btn ${currentPage === pageNum ? 'btn-link' : 'btn-link'}`}
                                style={{
                                    minWidth: '32px',
                                    height: '32px',
                                    padding: '4px 8px',
                                    margin: '0 4px',
                                    borderRadius: '4px',
                                    color: currentPage === pageNum ? 'white' : '#635470',
                                    backgroundColor: currentPage === pageNum ? '#635470' : 'transparent',
                                    border: 'none',
                                    textDecoration: 'none',
                                    fontSize: '14px'
                                }}
                            >
                                {pageNum}
                            </button>
                        );
                    })}

                    <button
                        className="btn btn-link text-decoration-none"
                        onClick={() => onPageChange(currentPage + 1)}
                        disabled={currentPage === totalPages}
                        style={{
                            color: currentPage === totalPages ? '#6c757d' : '#635470',
                            cursor: currentPage === totalPages ? 'not-allowed' : 'pointer',
                            border: 'none',
                            background: 'none',
                            padding: '0 10px',
                            fontSize: '14px'
                        }}
                    >
                        Next
                    </button>
                </div>
            )}

            {showModal && activeModalIndex !== null && (
                <ImageZoom
                    photo={alerts[activeModalIndex].image}
                    setIsOpen={setShowModal}
                    setShowModal={setShowModal}
                    imageData={{
                        image_url: alerts[activeModalIndex].image,
                        cameraName: alerts[activeModalIndex].camera_id || "Random Camera",
                        lastActive: `${alerts[activeModalIndex].date}  ${alerts[activeModalIndex].time}`,
                        areaName: alerts[activeModalIndex].violationArea,
                        alertName: alerts[activeModalIndex].violation
                    }}
                    cameraTable={true}
                />
            )}
        </>
    );
};

export default LiveAlertCards;