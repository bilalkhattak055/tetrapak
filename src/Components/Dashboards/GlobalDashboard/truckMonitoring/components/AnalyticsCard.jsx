import React from 'react'
import { LogIn } from 'react-feather'
import { Card, CardBody, Col } from 'reactstrap'
import { H5 } from '../../../../../AbstractElements'
import './liveAnalytics.css'

const AnalyticsCard = ({paraText, Icon, value, bg, txtColor}) => {

    const textColor = txtColor || '#267ce9';
  return (
    <Col xl="4" sm="6" xs='12'>
      <Card style={{padding: '20px',  backgroundColor: bg}} >
        <CardBody className="w-100 h-100 d-flex justify-content-between align-items-center">
            <div className='d-flex gap-2'>
               <Icon color={`${textColor}`} width={25} strokeWidth={4} />
               <p className='entrance-text' style={{color: textColor}}>{paraText}</p>
            </div>
            <H5 attrH5={{className: 'entrance-number', style: {marginBottom:'0', color: textColor}}}>{value}</H5>
            
        </CardBody>
      </Card>
    </Col>
  )
}

export default AnalyticsCard
