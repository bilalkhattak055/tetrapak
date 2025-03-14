import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { CardTitle, Row, Col } from 'reactstrap';

const ReProcessChart = ({ loading = false }) => {
    // Data for reprocess by weekdays
    const weekdayData = {
        categories: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
        counts: [32, 45, 39, 28, 36, 15, 10]
    };

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
                distributed: true, // Enable different colors for each bar
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
            title: {
                text: 'Weekdays',
                style: {
                    fontSize: '14px',
                    color: '#8C8C8C',
                    fontWeight: 500,
                    fontFamily: 'Arial, sans-serif',
                },
            },
            categories: weekdayData.categories,
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
                text: 'Number of Reprocesses',
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
            max: 50,
            tickAmount: 5,
        },
        colors: ['#D21404', '#FF5733', '#710C04', '#FF8C00', '#FF4500', '#B22222', '#8B0000'], 
        legend: {
            show: false, 
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

    // Format the data for ApexCharts
    const series = [{
        name: 'Count',
        data: weekdayData.counts
    }];

    return (
        <Row style={{
            borderRadius: '20px',
            border: '1px solid #ECECEC',
            backgroundColor: "#FDFEFF"
        }}>
            <Col>
                <CardTitle tag="h5" className="text-center mt-2">
                    Reprocesses by Weekday
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
                        series={series}
                        type="bar"
                        height={360}
                    />
                )}
            </Col>
        </Row>
    );
};

export default ReProcessChart;