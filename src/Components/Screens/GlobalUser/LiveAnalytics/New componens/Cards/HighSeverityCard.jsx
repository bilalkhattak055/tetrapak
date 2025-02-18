import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import { LiaShareAltSolid } from "react-icons/lia";
import { IoIosArrowRoundDown } from "react-icons/io";
import { IoIosArrowRoundUp } from "react-icons/io";
import '../style/style.css'
import icon from '../Icons/security-time.png';
import Loader3 from '../../../../../../CommonElements/Spinner/loader3'
import { FaArrowTrendUp } from "react-icons/fa6";
import { FaArrowTrendDown } from "react-icons/fa6";
import { ScaleLoader  } from 'react-spinners';
const HighSeverityCard = ({ data }) => {
    console.log(data, 'from camera section');
    const [loader, setloader] = useState(true)

    useEffect(() => {
        if (data.maxAlerts !== undefined) {
            setloader(false)
        }
        else {
            setloader(true)
        }
    }, [data])

    return (
        <>
            {/* <Card>
            <CardBody className='liveAnalyticsHeroCards'>
                        {loader?<Loader3/>:<>
                        
                            <Row > 
                    <Col sm='7'>
                        <h5 className='mb-3'>High Severity Alerts </h5>
                        <div className='d-flex align-items-center gap-2'>
                            <div className="icon"> 
                                <img src={icon} alt='icon' style={{ color: '#1f7edb', width: '42px', height: '42px', marginBottom: '8px' }} />
                            </div>
                            <div >
                                <div className="d-flex align-items-center">
                                    <h6 style={{ fontSize: '30px', color: '#595959',fontFamily: 'Roboto, sans-serif' }} >
                                        {data?.maxAlerts}
                                    </h6>
                                    <IoIosArrowRoundUp style={{ fontSize: '30px', color: 'green', marginBottom: '8px' }} />
                                </div>
                                <div>
                                    <p className='m-0 p-0 subheadingofcard' style={{ color: '#8C8C8C' }}>{data?.module}</p>
                                </div>
 
                            </div>
                        </div>
                    </Col>
                    <Col sm='5' className='detailsofCards'>
                        <p className='m-0 p-0' style={{ color: '#8C8C8C', fontSize: '12px' }}>Details</p>
                        <p className='m-0 p-0' style={{ color: '#8C8C8C', fontSize: '12px' }}>Area: {data?.subArea || 'N/A'}</p>
                        <p className='m-0 p-0' style={{ color: '#8C8C8C', fontSize: '12px' }}>Owner: {data?.owner} </p>
                        <p className='m-0 p-0' style={{ color: '#8C8C8C', fontSize: '12px' }}>Camera: N/A</p>
                        <p className='m-0 p-0' style={{ color: '#8C8C8C', fontSize: '12px' }}>Sub Area: N/A </p> 

                    </Col>
                </Row>
                        </>}
                

            </CardBody>
              
        </Card> */}
            <Card style={{ borderRadius: '24px', overflow:'hidden',minHeight:'180px' }}  >
                {loader?<div className='py-4'><Loader3/></div>:
                <CardBody style={{ padding: '24px' }}>

                            <svg className='mb-2' width="35" height="35" viewBox="0 0 24 24">
                                <circle cx="12" cy="12" r="10" fill={'#b0d8b0'} /> 
                                <circle cx="12" cy="12" r="8" fill={'#b0d8b0'} />  
                                <circle cx="12" cy="12" r="5" fill={'#008000'} />  
                            </svg>
                    <div className='d-flex justify-content-between flex-wrap'>
                        <div>
                            <p className='mb-0' style={{ color: '#8C8C8C' }}>High Severity Alerts</p>
                            <h6 style={{ fontSize: '30px', color: '#595959', fontFamily: 'Roboto, sans-serif' }} >
                                {'32'}
                                <span className='ms-2'>
                                    {data?.maxAlerts >= 1 ? <FaArrowTrendUp style={{ color: '#8C8C8C', fontSize: '25px' }} /> : data?.maxAlerts == 0 ? <FaArrowTrendDown style={{ color: '#8C8C8C', fontSize: '25px' }} /> : null}
                                </span>
                            </h6>
                            <p className='mb-0' style={{ color: '#8C8C8C' }}>{data?.module}</p>
                        </div>
                        <div>
                            
                            <p className='m-0 p-0' style={{ color: '#8C8C8C', fontSize: '12px' }}>Details</p>
                            <p className='m-0 p-0' style={{ color: '#8C8C8C', fontSize: '12px' }}>Area: { 'Ali Pump '}</p>
                            <p className='m-0 p-0' style={{ color: '#8C8C8C', fontSize: '12px' }}>Sub Area: { 'Ali Pump Doubling'}</p>
                            <p className='m-0 p-0' style={{ color: '#8C8C8C', fontSize: '12px' }}>Owner: {'Qaiser '} </p>
                        </div>
                    </div>



                </CardBody>
                }
            </Card>
        </>

    );
}

export default HighSeverityCard;
