import React from 'react'
import { Card, CardBody, Col, Row } from 'reactstrap'
import { H4, H5, P } from '../../../../../AbstractElements'
import ReactApexChart from 'react-apexcharts'
import { Widgets2Data } from '../../../../../Data/DefaultDashboard'
import './VehicleEntranceSection.css'
import { FontWeight, MarginBottom } from '../../../../../Constant'

const VehicleEntranceSection = () => {
    return (
        <>
            <Row xs='12'>
                <H5>
                    Vehicle Entrance
                </H5>
                <Widget data={Widgets2Data} />
            </Row>
        </>
    )
}

function Widget({ data, chartClass, mainClass, textColor }) {
    return <Card className={` ${mainClass ? mainClass : ''}`}>
        <CardBody className='card-body-entrance'>
                
                    <WidgetBody data={data} chartClass={chartClass} textColor={textColor} clasName={'border-right'} text={'Total Vehicle'} />
                
                    <WidgetBody data={data} chartClass={chartClass} textColor={textColor} clasName={'border-right'} text={'Loading Vehicle'} />
                
                    <WidgetBody data={data} chartClass={chartClass} textColor={textColor} clasName={'border-right'} text={'Container'} />
                
                    <WidgetBody data={data} chartClass={chartClass} textColor={textColor} text={'Normal Vehicle'} />
                
        </CardBody>
    </Card>
}

function WidgetBody({ data, chartClass, textColor, clasName, text }) {
    return <div className={`main-card-entrance ${clasName}`}>
        <div className='main-card-entrance-2'>
        <div className={`${chartClass ? chartClass : 'order-chart'}`}>
            <ReactApexChart type={data.chart.options.chart.type} height={data.chart.options.chart.height} options={data.chart.options} series={data.chart.series} />
        </div>
        <div>
            <P attrPara={{ className: '', style: { marginBottom: '0' } }}>{text}</P>
            <P attrPara={{ className: '', style: { marginBottom: '0', fontWeight: '700', color: 'green' } }}>60</P>

        </div>
        </div>
    </div>
}



export default VehicleEntranceSection
