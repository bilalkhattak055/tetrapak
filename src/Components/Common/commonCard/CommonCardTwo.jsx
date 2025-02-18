import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, Col, Container } from 'reactstrap';
import { H4 } from '../../../AbstractElements';
import { Row } from 'react-bootstrap';

const CommonCardTwo = ({ data, chartClass, mainClass }) => {
  return (
     
   <>
        {/* <Card className={`widget-1 widget-with-chart ${mainClass ? mainClass : ''}`}> */}
     
        <Card className='widget-1' style={{marginBottom: '8px'}}>
          <CardBody className='d-flex justify-content-between py-4'>
            <div style={{ width: '100%' }}>
              <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex', alignItems: 'end' }}>
                <H4 attrH4={{ className: 'mb-1' }}>{data.total}</H4>
                <div className={` ${chartClass ? chartClass : 'order-chart'} m-0 p-0`}>
                  <ReactApexChart type={data.chart.options.chart.type} height='100' width={100} options={data.chart.options} series={data.chart.series} />
                </div>
              </div>
              <p className='f-light m-0 p-0' style={{ fontSize: '13px' }}>{data.title}</p>
            </div>
          </CardBody>
        </Card>
        </>
  
  );
};

export default CommonCardTwo;
