import React from 'react'
import { Card, CardBody, Col } from 'reactstrap'
import { H5 } from '../../../../AbstractElements'
import Chart from 'react-apexcharts';
import { apexAreaChart } from '../../../Charts/ApexCharts/apexData';

const LineChart = () => {
    return (
        <Col xxl="4" xl="6" md="12" sm="12">
            <H5>PPE Violation Over Time</H5>
            <Card className=''>
            <CardBody>
                        <div id='basic-apex'>
                            <Chart options={apexAreaChart.options} series={apexAreaChart.series} type="area" height={270} />
                        </div>
                    </CardBody>
            </Card>
        </Col>
    )
}

export default LineChart

