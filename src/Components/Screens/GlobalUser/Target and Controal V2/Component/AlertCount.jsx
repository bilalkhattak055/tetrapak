import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { CardTitle, Row, Col } from 'reactstrap';

const AlertCountsChart = ({ loading = false }) => {
    // Dummy data for wrong mis-match reasons
    const dummyData = {
        categories: ['Camera Problem', 'Time Problem', 'Detection Problem'],
        counts: [28, 42, 15]
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
                text: 'Reasons',
                style: {
                    fontSize: '14px',
                    color: '#8C8C8C',
                    fontWeight: 500,
                    fontFamily: 'Arial, sans-serif',
                },
            },
            categories: dummyData.categories,
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
                text: 'Number of Occurrences',
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
        colors: ['#D21404', '#FF5733', '#710C04'], // Different red shades for each bar
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
        data: dummyData.counts
    }];

    return (
        <Row style={{
            borderRadius: '20px',
            border: '1px solid #ECECEC',
            backgroundColor: "#FDFEFF"
        }}>
            <Col>
                <CardTitle tag="h5" className="text-center mt-2">
                    Wrong Mis-Match Reasons
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

export default AlertCountsChart;