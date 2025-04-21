import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { CardTitle, Row, Col } from 'reactstrap';

const ReProcessChart = ({ loading = false, data = {} }) => {
  const categories = data && typeof data === 'object' ? Object.keys(data) : [];
  const seriesData = categories.map((category) => data[category] || 0);
  const maxVal = seriesData.length ? Math.max(...seriesData) : 0;

  // ApexCharts configuration
  const options = {
    chart: {
      type: 'bar',
      height: 300,
      toolbar: { show: false },
    },
    plotOptions: {
      bar: {
        horizontal: false,
        columnWidth: '70%',
        borderRadius: 4,
        borderRadiusApplication: 'end',
        distributed: true, // let each bar have a different color
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
      // Make the title generic or pass a prop for it if you'd like
      title: {
        text: 'Time',
        style: {
          fontSize: '14px',
          color: '#8C8C8C',
          fontWeight: 500,
          fontFamily: 'Arial, sans-serif',
        },
      },
      // Use the dynamic categories
      categories,
      labels: {
        style: {
          fontSize: '12px',
          colors: '#666666',
        },
      },
      axisBorder: { show: false },
      axisTicks: { show: false },
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
      // Add a small buffer so bars don't max out the top of the chart.
      max: maxVal ? Math.ceil(maxVal * 1.2) : 1,
      tickAmount: 4,
    },
    // You can specify multiple colors or keep it simple
    colors: ['#D21404', '#FF5733', '#710C04', '#FF8C00', '#FF4500', '#B22222', '#8B0000'],
    legend: { show: false },
    grid: {
      borderColor: '#e7e7e7',
      strokeDashArray: 4,
      xaxis: { lines: { show: false } },
      yaxis: { lines: { show: true } },
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

  // ApexCharts series must be an array of objects
  const series = [
    {
      name: 'Count',
      data: seriesData,
    },
  ];

  return (
    <Row
      style={{
        borderRadius: '20px',
        border: '1px solid #ECECEC',
        backgroundColor: '#FDFEFF',
      }}
    >
      <Col>
        <CardTitle tag="h5" className="text-center mt-2">
          Reprocesses Chart
        </CardTitle>
        {loading ? (
          <div
            className="d-flex justify-content-center align-items-center"
            style={{ height: '250px' }}
          >
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
