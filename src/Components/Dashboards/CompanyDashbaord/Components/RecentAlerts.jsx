import React, { useState } from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'

export default function RecentAlerts({ recentAlerts, handleActive, active, setActive }) {


    return (
        <>
            <Card className=''>
                <CardBody className='AlertsCardScroll'>
                    {
                        recentAlerts.map((alert) => {
                            return (
                                <>
                                    <Card onClick={() => handleActive(alert.machineGuard)} className='py-2  my-2 AlertsCardScroll2' style={{ backgroundColor: ` ${active == alert.machineGuard ? '#1e67d7' : '#f6f6f6'} `, color: `${active == alert.machineGuard ? 'white' : 'black'}`, boxShadow: 'none',  }}>
                                        <CardBody>
                                            <Row className='alertsRowWidth'>
                                                <Col xl='3' lg='3' md='3'sm='3'xs='12' className='MachineAlertCardCol1'>
                                                    <img className='MachingGuardSmallCardImage' src={alert.img} />
                                                </Col>
                                                <Col xl='9' lg='9' md='9'sm='9'xs='12' className='AlertsCardScroll' style={{display:'flex',alignItems:'center'}}>
                                                   
                                                    <div style={{ fontSize: '12px' }} className='alertsCardAllHeading d-flex flex-column w-100'>
                                                        <span>Machine Guard: {alert.machineGuard}</span>
                                                        <span>Module: {alert.module}</span>
                                                        <div style={{width:'100%',display:'flex',justifyContent:'end'}}> 
                                                            <p className='text-right' style={{ fontSize: '13px' }}>{alert.time}  </p>
                                                        </div>
                                                    </div>
                                                </Col>
                                            </Row>
                                            <div >

                                            </div>
                                        </CardBody>
                                    </Card>
                                </>
                            )
                        })
                    }
                </CardBody>
            </Card>
        </>
    )
}
