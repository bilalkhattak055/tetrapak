import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, Col, Container } from 'reactstrap';
import { H4 } from '../../../../AbstractElements';
import { Row } from 'react-bootstrap';

const ForkLiftTotalCard = ({ ParentMargin, data, chartClass, mainClass, padding, TotalFont, BarHeight, subHeading, BarWidth }) => {

  return (
    <Col lg='12' xl='12' md='12' sm='12' xs='12'>
      {/* <Card className={`widget-1 widget-with-chart ${mainClass ? mainClass : ''}`}> */}

      <Card className={`widget-1 ${ParentMargin ? ParentMargin : ''}`}>
        <CardBody className={`d-flex justify-content-between `} style={{ paddingBlock: `${padding ? padding : '24px'}` }}>
          {/* <div>
            <H4 attrH4={{ className: 'mb-1' }}>{data.total}</H4>
      <p className='f-light m-0 p-0' style={{fontSize:'13px'}}>{data.title}</p>
          </div>
      
            <div  className={`${chartClass ? chartClass : 'order-chart'} m-0 p-0`}>
            <ReactApexChart type={data.chart.options.chart.type} height='100' width={100} options={data.chart.options} series={data.chart.series} />
          </div> */}
          <div style={{ width: '100%' }}>
            <div style={{ width: '100%', justifyContent: 'space-between', display: 'flex', alignItems: 'end' }}>
              <H4 attrH4={{ className: 'mb-1', style: { fontSize: `${TotalFont ? TotalFont : ''}`, fontWeight: '100', color:data.title ==="Helmet Module" ? "black":'#868894' } }}>{data.total}</H4>
              <div className={` ${chartClass ? chartClass : 'order-chart'} m-0 p-0`}>
                <ReactApexChart type={data.chart.options.chart.type} height={BarHeight ? BarHeight : '100px'} width={BarWidth ? BarWidth : '100'} options={data.chart.options} series={data.chart.series} />
              </div>
            </div>
            <p className='f-light m-0 p-0' style={{ fontSize: `${subHeading ? subHeading : '13px'}`,color:data.title ==="Helmet Module" ? "black":'#868894' }}>{data.title}</p>
          </div>
        </CardBody>
      </Card>
    </Col>

  );
};

export default ForkLiftTotalCard;
