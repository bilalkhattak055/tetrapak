import React from 'react'
import { H5 } from '../../AbstractElements'
import { Card, CardBody, Col } from 'reactstrap'
import BarChartClass from '../Charts/ApexCharts/BarChart'

const Alerts = ({data}) => {
  return (
    <Col xxl='3' xl="4"  sm="6">
      <p className='m-0 p-0' style={{fontSize:'17px'}}>Alerts</p>
      <Card style={{height:'300px'}}>
        <CardBody className="chart-block">
          <BarChartClass apexBarChart={data} />
        </CardBody>
      </Card>
    </Col>
  )
}

export default Alerts
