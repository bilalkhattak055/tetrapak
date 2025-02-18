import React from 'react'
import DonutCharts from './DonutCharts'
import LineChart from './LineChart'
import { Col, Row } from 'reactstrap'
import SmallWidgets from '../../../Common/CommonWidgets/SmallWidgets'
import { SmallWidgetsDataa } from '../../../../Data/Ecommerce'

const ChartsSection = () => {
  return (
    <Row className='d-flex gap-4'>
      <DonutCharts />
      <LineChart />
      
    <Card />
    
       
    </Row>
  )
}


function Card() {
    return <>{SmallWidgetsDataa.map((data, i) => (
        <Col xxl='3' xs='4' md='4' key={i}>
          <SmallWidgets data={data} />
        </Col>
      ))}
      </>
}

export default ChartsSection
