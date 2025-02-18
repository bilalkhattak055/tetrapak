import React, { useState, useEffect } from 'react';
import ModelAnalyticsHeader from './Components/ModelAnalytics';
import CameraStatus from './Components/CameraStatus';
import { Container, Col, Row } from 'reactstrap';
import CameraCard from './Components/CameraGrid';
import CameraPagination from './Components/CameraPagination';
import CameraService from '../../../../api/cameraService';
import WeekFilterProvider from '../../../../Contexts/WeakGlobal';

const CameraDashboard = () => {
    const [camerasData, setCamerasData] = useState([]);
    const [analyticsData, setAnalyticsData] = useState({
        totalCameras: 0,
        activeCameras: 0,
        inactiveCameras: 0,
    });
    const [loading, setLoading] = useState(true);
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const factoryID=JSON.parse(localStorage.getItem('userData'))?.factory?.id || 14
    const userID = JSON.parse(localStorage.getItem('userData'))?.id || 89;

    const fetchCameras = async (pageNumber = 1) => {
        try {
            setLoading(true);
            const payload = {
                user_id: userID,
                status: "",
                connectivity: "",
                areas: [],
                sub_areas: [],
                module: "",
                factory_id: factoryID,
                pagination: {
                    page_no: pageNumber,
                    per_page: 20,
                },
            };

            const response = await CameraService.getAllLiveCameras_new(payload);
            console.log('Raw API response:', response);
            if (response?.data?.data) {
                const responseData = response.data.data; 
                console.log('Response data:', responseData);
                setAnalyticsData({
                    totalCameras: responseData.total_cameras || 0,
                    activeCameras: responseData.active_cameras || 0,
                    inactiveCameras: responseData.inactive_cameras || 0,
                });
                if (Array.isArray(responseData.cameras)) {
                    const mappedCameras = responseData.cameras.map((camera, index) => {
                        return {
                            number: index + 1 + (pageNumber - 1) * 20,
                            status: "Active",
                            imageUrl: camera.image_url || '',
                            cameraId: camera.camera_id,
                            cameraName: camera.camera_name,
                            areaNo: camera.area || '',
                            owner: camera.area_owner || '',
                            subArea: camera.sub_area || '',
                            modules: Array.isArray(camera.modules)
                                ? camera.modules.map(module => module.module_name)
                                : [],
                            lastActive: camera.last_active || '',
                        };
                    });
                    setCamerasData(mappedCameras);
                    setTotalPages(responseData.total_pages || 1);
                } else {
                    console.error("Cameras data is not an array:", responseData.cameras);
                    setCamerasData([]);
                }
            } else {
                console.error("No data in response:", response);
                setCamerasData([]);
            }
        } catch (error) {
            console.error("Error fetching cameras:", error);
            setCamerasData([]);
        } finally {
            setLoading(false);
        }
    };
    useEffect(() => {
        fetchCameras(currentPage);
        setInterval(()=>{
            fetchCameras(currentPage);
        },60000)
    }, [currentPage, userID, factoryID]);

    const handlePageChange = (pageNumber) => {
        if (pageNumber !== currentPage) {
            setCurrentPage(pageNumber);
        }
    };
    if (loading) {
        return (
            <div className="d-flex justify-content-center align-items-center" style={{ height: '250px' }}>
                <div className="spinner-border text-primary" role="status">
                    <span className="visually-hidden">Loading...</span>
                </div>
            </div>
        );
    }
    return (
        <WeekFilterProvider>
        <ModelAnalyticsHeader heading={"Camera Status"} />
        <Container fluid>
            <CameraStatus
                camnumber={analyticsData.activeCameras}
                totalnumber={analyticsData.totalCameras}
                number={Math.round((analyticsData.activeCameras / analyticsData.totalCameras) * 100)}
            />
            <Row>
            
                {camerasData.map((camera, index) => (
                    <Col key={index} xs="12" md="6" lg="6" xl="6" className="mb-4">
                        <CameraCard
                            number={camera.number}
                            cameraID={camera.cameraId}
                            cameraImg={camera.imageUrl}
                            cameraName={camera.cameraName}
                            areaName={camera.areaNo}
                            owner={camera.owner}
                            subarea={camera.subArea}
                            modules={camera.modules}
                            status={camera.status}
                            lastActive={camera.lastActive}
                        />
                    </Col>
                ))}
            </Row>
            <CameraPagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
            />
        </Container>
        </WeekFilterProvider>
    );
};

export default CameraDashboard;