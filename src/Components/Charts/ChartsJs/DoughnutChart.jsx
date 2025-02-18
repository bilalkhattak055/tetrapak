import React, { useEffect, useState } from "react";
import { Col, Card, CardBody } from "reactstrap";
import { DoughnutChart } from "../../../Constant";
import { H5 } from "../../../AbstractElements";
import PieDonutChart from "./PieDonutChart";

const DoughnutChartClass = ({ donutData }) => {
    // console.log('donutData.labels', donutData)
    //   const blockage = "Blockage";
    //   const noBlockage = "No Blockage";
    //   const blockagePercent = 70;
    //   const noBlockagePercent = 30;
    //   const color1 = '#d3e4ff'
    //   const color2 = '#0b57d0'


    //   const label = [blockage, noBlockage];
    //   const [labels, setLabels] = useState(label)
    //   const color = [color1, color2];
    //   const [colors, setColors] = useState(color)
    //   const serie = [noBlockagePercent, blockagePercent];
    //   const [series, setSeries] = useState(serie)


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
                height: 280,
                type: 'donut',
                toolbar: {
                    show: false
                }
            },
            labels: donutData.labels,
            colors: donutData.colors,
            dataLabels: {
                enabled: false
            },
            tooltip: {
                enabled: false // This line disables the tooltip
            },
            legend: {
                show: true,
                position: 'bottom',
                horizontalAlign: 'left',
                formatter: function (label, opts) {
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
                        size: '62%', // Controls the outer size of the donut (make it larger for thicker)
                    donutWidth: '20%', 
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
                                color: '#0b76b7',
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
            }
        },
        series: donutData.series

    })


    return (
        <Col xxl='3' xl="4" sm="6">
            <p className="p-0 m-0" style={{ fontSize: '17px' }}>{DoughnutChart}</p>
            <Card style={{ height: "300px" }}>
                <CardBody className="chart-block d-flex justify-content-center align-items-center">
                    <PieDonutChart setChartOptions={setChartOptions} chartOptions={chartOptions} width={'100%'} />
                    {/* <Doughnut data={doughnutData} options={doughnutOption} width={717} height={358} /> */}
                </CardBody>
            </Card>
        </Col>
    );
};

export default DoughnutChartClass;
