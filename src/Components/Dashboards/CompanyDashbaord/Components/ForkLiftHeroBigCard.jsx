import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, Col } from 'reactstrap';
import { Row } from 'react-bootstrap';
import '../Styling/factoryowner.css'

const ForkLiftHeroBigCard = ({ data, chartClass, mainClass }) => {
    return (
                <Card className='widget-1 forkLifeBigCardsHeroParent   ' style={{ background: '#33ba63' }}>
                    <CardBody className='d-flex justify-content-between py-4 forkLifeBigCardsHero' >

                        <div style={{ width: '100%' }}>
                            <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex', alignItems: 'end' }}>
                                <h4 className='mb-1' style={{ color: 'white', fontSize: '27px' }} >ForkLift: {data.total}</h4>
                                <div className={`${chartClass ? chartClass : 'order-chart'} m-0 p-0`}>
                                    <ReactApexChart type={data.chart.options.chart.type} height='100' width={100} options={data.chart.options} series={data.chart.series} />
                                </div>
                            </div>
                            <p className='f-light m-0 p-0' style={{ color: 'white', fontSize: '15px' }}>Detected: {data.title}</p>
                        </div>
                    </CardBody>
                </Card>
         
    );
};
export default ForkLiftHeroBigCard;
