import React, { Fragment } from 'react';
import { Card, CardBody, Col } from 'reactstrap';
import Chart from 'react-apexcharts';
// import { areaSpaline } from './apexData';
import { P } from '../../../AbstractElements';

const AreaSpalineChartClass = ({areaSpaline, colSize}) => {
    return (
        <Fragment>
            <Col xs='12' xxl={`${colSize}`}  className=''>
            <P attrPara={{className:'', style:{fontSize:'16px'}}}>Modules</P>
                <Card className='area-cardd' style={{ marginBottom: 10 }}>
                    {/* <HeaderCard title={AreaSpalineChart} /> */}
                    <CardBody>
                        <div id='basic-apex'>
                            <Chart options={areaSpaline.options} series={areaSpaline.series} height="375" type="area" />
                        </div>
                    </CardBody>
                </Card>
            </Col>
        </Fragment>
    );
};

export default AreaSpalineChartClass;