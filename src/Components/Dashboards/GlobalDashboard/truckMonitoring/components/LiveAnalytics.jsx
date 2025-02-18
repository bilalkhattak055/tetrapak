import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { H5 } from '../../../../../AbstractElements'
import './liveAnalytics.css'
import { LogIn, LogOut } from 'react-feather'
import AnalyticsCard from './AnalyticsCard'

const LiveAnalytics = () => {
   
  return (
    <Row style={{marginTop: '20px'}}>
        <H5>Live Analytics</H5>
       <AnalyticsCard paraText={'Entrance'} Icon={LogIn} value={'100'} bg='#fff' />
       <AnalyticsCard paraText={'Exit'} Icon={LogIn} value={'50'} bg='#fff' />
       <AnalyticsCard paraText={'Total Inside The Plant'} Icon={LogOut} value={'50'} bg='#267ce9' txtColor='#fff' />
    </Row>
   
  )
}

export default LiveAnalytics
