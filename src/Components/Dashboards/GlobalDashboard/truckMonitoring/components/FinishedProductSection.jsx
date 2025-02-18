import React from 'react'
import { Col, Row } from 'reactstrap'
import DonutCharts from '../../ppeModule/DonutCharts'
import TruckSctionDonut from './TruckSctionDonut'

const FinishedProductSection = () => {
  return (
    <Row xs='12'>
        <Col xs='12' xl='6'>
           <TruckSctionDonut text='Finished Product' />
        </Col>
        <Col xs='12' xl='6'>
        <TruckSctionDonut text='Other Categories' />
        </Col>
      
    </Row>
  )
}

export default FinishedProductSection
