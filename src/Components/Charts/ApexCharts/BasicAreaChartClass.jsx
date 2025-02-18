import React, { Fragment, useEffect, useState } from 'react';
import { Card, CardBody } from 'reactstrap';
import Chart from 'react-apexcharts';


const BasicAreaChartClass = ({apexAreaChart}) => {

    return (
        <Fragment>
          
                <Card style={{maxHeight:'294px', marginBottom:'0'}}>
                    <CardBody>
                        <div id='basic-apex'>
                            <Chart options={apexAreaChart?.options} series={apexAreaChart?.series} type="area" height={270} />
                        </div>
                    </CardBody>
                </Card>
         
        </Fragment>
    );
};

export default BasicAreaChartClass;