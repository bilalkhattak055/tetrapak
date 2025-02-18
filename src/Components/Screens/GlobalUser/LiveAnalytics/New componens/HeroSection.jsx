import React, { useEffect, useState } from 'react';
import { Col, Row } from 'reactstrap';
import AccuracyCardDesign from './Cards/AccuracyCardDesign';
import Connectivitycard from './Cards/Connectivitycard';
import HighSeverityCard from './Cards/HighSeverityCard';
import NewCameraCount from './Cards/NewCameraCount';
import NewAIAccuracy from './Cards/NewAIAccuracy';
import HighestOrHighSeverity from './Cards/highestOrHighSeverity';

const HeroSection = ({data,severityAlertsData,width}) => { 
    const [accuracy, setaccuracy] = useState(data);
    const [maxalert, setmaxalert] = useState(severityAlertsData)

useEffect(() => { 
    setaccuracy(data);
    setmaxalert(severityAlertsData)

}, [data,severityAlertsData])
    
    return (
        <> 
                    <Col md='6' xs='12'>
                        {/* <Connectivitycard data={accuracy.connectivity} /> */}
                        <NewCameraCount />
                    </Col>
                  
                     <Col md='6' xs='12'>
                        {/* <AccuracyCardDesign data={accuracy}/> */}
                        <NewAIAccuracy/>
                    </Col>
                        <Col  md='12' lg='6'  >
                        {/* <HighSeverityCard data={maxalert}  /> */}
                        <HighestOrHighSeverity 
                            heading={'High Alerts'} 
                            highestboolean={true}
                            area='Ali Pump'
                            subarea={'LOCAL STORE'}
                            module={'Grouping'}
                            owner={'Kashif, Usman '}
                            />
                    </Col>
                    <Col md='12' lg='6'  >
                        {/* <HighSeverityCard data={maxalert}  /> */}
                        <HighestOrHighSeverity heading={'High Severity Alerts'} highestboolean={false}
                            area='MOULDING'
                            subarea={'MOULDING DEPART'}
                            module={'Grouping'}
                            owner={'Mr. Fida Khan Shareef'}
                            alert='53'
                            /> 
                    </Col>
                     
        
        </>
    );
}

export default HeroSection;
