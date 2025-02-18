import React, { useState } from "react";
import { Col, Card, CardBody } from "reactstrap";
// import PieDonutChart from "../../../Charts/ChartsJs/PieDonutChart";
// import { H5 } from "../../../../AbstractElements";
import './liveAnalytics.css';
import { H5 } from "../../../../../AbstractElements";
import PieDonutChart from "../../../../Charts/ChartsJs/PieDonutChart";



const TruckSctionDonut = ({text}) => {
    const  data1 = 'Shredded Metals';
    const data2 = 'HM2 - process Heavy metals (cut)'
    const data3 = 'HM3 - process premium metal (cut):'
    // const blockage = "Blockage";
    // const noBlockage = "No Blockage";

    const labels = [data1, data2, data3];

    const color1= '#0a75b6'
    const color2= '#41b1ef'
    const color3= '#bce2f9'
    const colorsData = [color1, color2, color3];
    const data_1_Count = 50
    const data_2_Count = 25
    const data_3_Count = 25
    // const blockagePercent = 70;
    // const noBlockagePercent = 30;

    const series = [data_1_Count, data_2_Count, data_3_Count ];



    const [chartOptions, setChartOptions] = useState({

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
                height: 200,
                type: 'donut',
                toolbar: {
                    show: false
                }
            },
            labels: labels,
            colors: colorsData,
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
                formatter: function (label, opts) {
                    const series = opts.w.globals.series;
                    const total = series.reduce((acc, val) => acc + val, 0);
                    const percentage = (series[opts.seriesIndex] / total * 100).toFixed(0);
                    return `${label} ${percentage}%`;
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
                                fontWeight: 'bold',
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
                                        return b;
                                    }, 0) + "%";
                                }
                            }
                        }
                    }
                }
            },
            // responsive: [{
            //     breakpoint: 610,
            //     options: {
            //         legend: {
            //             position: 'bottom' // Shift legend to bottom for smaller screens
            //         }
            //     }
            // }],
            responsive: [{
                breakpoint: 610,
                options: {
                    chart: {
                        height: 300 // Responsive height for smaller screens
                    },
                    legend: {
                        position: 'bottom' // Move legend to bottom for smaller screens
                    }
                }
            }, {
                breakpoint: 480,
                options: {
                    chart: {
                        height: 300 // Even smaller height for very small screens
                    }
                }
            }]
        },
        series: series

    })


    return (<>
        <H5>{text}</H5>
        <Card className="truck-monitoring-donut-card" style={{ padding: '20px 10px', width:'100%' }} >
            <CardBody className="chart-block d-flex  justify-content-evenly align-items-center donut-card-body">
                <PieDonutChart  chartOptions={chartOptions} width='100%' id='chart1' clasName={'chart11'}  />
            </CardBody>
        </Card>
    </>

    );
};

export default TruckSctionDonut;