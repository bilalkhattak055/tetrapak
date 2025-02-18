import React, { Fragment } from 'react';
import Chart from 'react-apexcharts';
// import { apexBarChart } from './apexData';

const BarChartClass = ({apexBarChart}) => {
    return (
        <Fragment>
          
               
                        <div id='basic-bar'>
                            <Chart options={apexBarChart.options} series={apexBarChart.series} type="bar" height={280} />
                        </div>
                    
           
        </Fragment>
    );
};

export default BarChartClass;