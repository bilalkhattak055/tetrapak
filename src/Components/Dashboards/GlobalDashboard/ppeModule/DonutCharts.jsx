import React, { useState } from "react";
import { Col, Card, CardBody } from "reactstrap";
import PieDonutChart from "../../../Charts/ChartsJs/PieDonutChart";
import { H5 } from "../../../../AbstractElements";
import './ppe.css';



const DonutCharts = () => {
  const blockage = "Blockage";
  const noBlockage = "No Blockage";

  const labels = [noBlockage, blockage];
  const colors = ["#e0f0fd", "#1e67d6"];
  const blockagePercent = 70;
  const noBlockagePercent = 30;

  const series = [noBlockagePercent, blockagePercent];
  


  const [chartOptions, setChartOptions] = useState( {
       
    options: {
        grid: {
            padding: {
                top: 10,
                bottom: 10,
                left: 0,
                right: 0
            }
        },
        chart: {
            height: 280,
            type: 'donut',
            toolbar: {
                show: false
            }
        },
        labels: ['Blockage', 'No Blockage'],
        colors: ['#d3e4ff', '#0b57d0'],
        dataLabels: {
            enabled: false
        },
        tooltip: {
            enabled: false // This line disables the tooltip
        },
        legend: {
            show: true,
            position: 'right',
            // horizontalAlign: 'left',
            formatter: function(label, opts) {
                const series = opts.w.globals.series;
                const total = series.reduce((acc, val) => acc + val, 0);
                const percentage = (series[opts.seriesIndex] / total * 100).toFixed(0);
                return `${percentage}% ${label}`;
            },
           
    offsetY: -5, 
        },
        plotOptions: {
            pie: {
                donut: {
                    labels: {
                        show: true, 
                        name: {
                            show: false, 
                            fontSize: '22px', 
                            fontFamily: 'Helvetica, Arial, sans-serif', 
                            color: '#373d3f', 
                            offsetY: -10 
                        },
                        value: {
                            show: true, 
                            fontSize: '30px', 
                            fontFamily: 'Helvetica, Arial, sans-serif',
                            fontWeight:'bold',
                            color: '#0b57d0', 
                            offsetY: 16, 
                            formatter: function (val) {
                                return val + "%"; 
                            }
                        },
                        total: {
                            show: true, 
                            
                            color: '#373d3f', 
                            formatter: function (w) {
                                return w.globals.seriesTotals.reduce((a, b) => {
                                    return b ;
                                }, 0) + "%"; 
                            }
                        }
                    }
                }
            }
        }
    },
    series: [30, 70]
    
})


  return (
    <Col xxl='4' xl="6" md="12" sm="12">
      <H5>Overall Compliance</H5>
      <Card style={{ height: "300px", padding: '20px 10px' }} >
        <CardBody className="chart-block d-flex  justify-content-evenly align-items-center donut-card-body">
          <PieDonutChart labels={labels} colors={colors} series={series} setChartOptions={setChartOptions} chartOptions={chartOptions} width={400} />
          {/* <Doughnut data={doughnutData} options={doughnutOption} width={717} height={358} /> */}
        </CardBody>
      </Card>
    </Col>
  );
};

export default DonutCharts;