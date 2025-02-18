import React from 'react'
import { H5 } from '../../AbstractElements'
import { Card, Col } from 'reactstrap'
import BasicAreaChartClass from '../Charts/ApexCharts/BasicAreaChartClass'

const BlockageOvertime = ({apexCharData}) => {
  return (
    <Col xxl='3' xl="4" sm="6">
      <p className='p-0 m-0' style={{fontSize:'17px'}}>Blockage Over Time</p>
      <Card className='px-0'>
       
          <BasicAreaChartClass apexAreaChart={apexCharData} />
        
      </Card>
    </Col>
  )
}

export default BlockageOvertime;
