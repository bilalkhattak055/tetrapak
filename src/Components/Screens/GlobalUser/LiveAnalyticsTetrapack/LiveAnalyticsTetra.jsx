import React, { useState, useEffect } from 'react';
import MissandMatch from './Components/MissMatchCard';
import MissMatch from './Components/MismatchCard';
import ReelCard from './Components/ReelCard';
import LiveCameraComparison from './Components/LiveCamera';
import { Row, Col, Container } from 'reactstrap';
import ModelAnalyticsHeader from '../CameraConfigurationV2/Components/ModelAnalytics';
import WeekFilterProvider from '../../../../Contexts/WeakGlobal';

const AnalyticsTetra = () => {
    const [isLargeScreen, setIsLargeScreen] = useState(window.innerWidth > 1450);

    useEffect(() => {
        // Function to update state based on window width
        const handleResize = () => {
            setIsLargeScreen(window.innerWidth > 1450);
        };

        // Add event listener
        window.addEventListener('resize', handleResize);
        
        // Call handler right away to get initial state
        handleResize();
        
        // Clean up on component unmount
        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, []);

    return (
        <WeekFilterProvider>
        
            <Row>
                <h1 className='mt-4'>
                    <span style={{ color: "#0E0D0B" }}>Welcome to </span>
                    <span style={{ color: "#023F88" }}>Tetra Pak Inspection Dashboard!</span>
                </h1>
                <h5 className='mt-1 mb-3' style={{color:"#535353"}}> Here are some summary for you to check </h5>
                <ModelAnalyticsHeader
                    heading={`AI Based Reels Inspection System`}
                    hideWeekText={true}
                    currentWeek={true}
                    shifts={false}
                    multiShift={false}
                    months={false}
                    modules={false}
                    severity={false}
                    timeFilterOption={false}
                    areas={false}
                    showActions={false}
                />
                {isLargeScreen ? (
                    // Layout for screens above 1450px
                    <>
                        <Col lg={6} xl={3}><ReelCard /></Col>     
                        <Col xl={6}><MissandMatch /></Col>
                        <Col lg={6} xl={3}><MissMatch /></Col>
                    </>
                ) : (
                    // Original layout for smaller screens
                    <>
                        <Col lg={6}><ReelCard /></Col>     
                        <Col lg={6}><MissMatch /></Col>
                        <Col><MissandMatch /></Col>
                    </>
                )}
                
                <LiveCameraComparison
                    images={['https://t4.ftcdn.net/jpg/03/11/07/61/360_F_311076193_tNZbw0YPAfHHV1wZ0NuV0AftLardNBa7.jpg', 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTZI1RPh_6UkwW936QPB2U4EbdaVtnSLZFSYg&s']}
                    barcodeData={[
                        { value: '112233', image: 'https://4.imimg.com/data4/UC/KX/MY-11948983/tetrapack01-jpg9b31ec1b-be17-4364-a714-de28ee086ed1original.jpg' },
                        { value: '112233', image: 'https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc_7uyoAUjK3THhC0ZDv0eoj7FmlJ2oW47nA&s' }
                    ]}
                />
            </Row>
        
        </WeekFilterProvider>
    );
};

export default AnalyticsTetra;