import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { CardTitle, Row, Col } from 'reactstrap';

const AlertCountsChart = ({ loading = false, targetAreas = [] }) => {
    const processChartData = (targetAreas) => {
        // Sort areas by current week's alert count (high to low)
        const sortedAreas = [...targetAreas].sort(
            (a, b) => b.current_week.alerts - a.current_week.alerts
        );

        // Extract series data and categories
        const categories = sortedAreas.map(area => area.area_id);
        const targetData = sortedAreas.map(area => area.current_week.target);
        const alertData = sortedAreas.map(area => area.current_week.alerts);

        // Calculate max value for dynamic y-axis
        const maxTarget = Math.max(...targetData);
        const maxAlert = Math.max(...alertData);
        const maxValue = Math.max(maxTarget, maxAlert);
        const dynamicMax = Math.ceil(maxValue * 0.75 / 100) * 100;

        return {
            series: [
                {
                    name: 'Target',
                    data: targetData,
                },
                {
                    name: 'Alert',
                    data: alertData,
                }
            ],
            categories,
            dynamicMax
        };
    };

    const chartData = processChartData(targetAreas);

    const options = {
        chart: {
            type: 'bar',
            height: 300,
            toolbar: {
                show: false,
            },
        },
        plotOptions: {
            bar: {
                horizontal: false,
                columnWidth: '70%',
                borderRadius: 4,
                borderRadiusApplication: 'end',
            },
        },
        dataLabels: {
            enabled: false,
        },
        stroke: {
            show: false,
            width: 0,
        },
        xaxis: {
            categories: chartData.categories,
            labels: {
                style: {
                    fontSize: '12px',
                    colors: '#666666',
                },
            },
            axisBorder: {
                show: false,
            },
            axisTicks: {
                show: false,
            },
        },
        yaxis: {
            title: {
                text: 'Accuracy (%)',
                style: {
                    fontSize: '14px',
                    color: '#8C8C8C',
                    fontWeight: 500,
                    fontFamily: 'Arial, sans-serif',
                },
            },
            labels: {
                style: {
                    fontSize: '12px',
                    colors: '#666666',
                },
            },
            min: 0,
            max: chartData.dynamicMax,
            tickAmount: 4,
        },
        colors: ['#0B76B7', '#41B2EF'],
        legend: {
            position: 'bottom',
            horizontalAlign: 'center',
            fontSize: '14px',
            markers: {
                radius: 12,
            },
        },
        grid: {
            borderColor: '#e7e7e7',
            strokeDashArray: 4,
            xaxis: {
                lines: {
                    show: false,
                },
            },
            yaxis: {
                lines: {
                    show: true,
                },
            },
        },
        responsive: [
            {
                breakpoint: 768,
                options: {
                    plotOptions: {
                        bar: {
                            columnWidth: '85%',
                            borderRadius: 2,
                            borderRadiusApplication: 'end',
                        },
                    },
                    xaxis: {
                        labels: {
                            style: {
                                fontSize: '10px',
                            },
                        },
                    },
                },
            },
        ],
    };

    return (
        <Row style={{
            borderRadius: '20px',
            border: '1px solid #ECECEC',
            backgroundColor:"#FDFEFF"
        }}>
            <Col>
                <CardTitle tag="h5" className="text-center mt-2">
                    Alert Counts
                </CardTitle>
                {loading ? (
                    <div className="d-flex justify-content-center align-items-center" style={{ height: '250px' }}>
                        <div className="spinner-border text-primary" role="status">
                            <span className="visually-hidden">Loading...</span>
                        </div>
                    </div>
                ) : (
                    <ReactApexChart
                        options={options}
                        series={chartData.series}
                        type="bar"
                        height={360}
                    />
                )}
            </Col>
        </Row>
    );
};

export default AlertCountsChart;