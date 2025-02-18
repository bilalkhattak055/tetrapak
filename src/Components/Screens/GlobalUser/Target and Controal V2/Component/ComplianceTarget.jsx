import React from 'react';
import ReactApexChart from 'react-apexcharts';
import { CardTitle, Row, Col } from 'reactstrap';

const ComplianceTargetsChart = ({ loading = false, targetAreas = [] }) => {
  // Process the data received from props
  const processChartData = (targetAreas) => {
    const aggregatedData = targetAreas.reduce(
      (acc, area) => {
        acc.lastWeek.target += area.last_week.target;
        acc.lastWeek.alerts += area.last_week.alerts;
        acc.lastWeek.week = area.last_week.week;
        acc.lastWeek.year = area.last_week.year;

        acc.currentWeek.target += area.current_week.target;
        acc.currentWeek.alerts += area.current_week.alerts;
        acc.currentWeek.week = area.current_week.week;
        acc.currentWeek.year = area.current_week.year;

        return acc;
      },
      {
        lastWeek: { target: 0, alerts: 0, week: 0, year: 0 },
        currentWeek: { target: 0, alerts: 0, week: 0, year: 0 },
      }
    );

    const allValues = [
      aggregatedData.lastWeek.target,
      aggregatedData.lastWeek.alerts,
      aggregatedData.currentWeek.target,
      aggregatedData.currentWeek.alerts
    ];
    const maxValue = Math.max(...allValues);
    const dynamicMax = Math.ceil((maxValue * 0.9) / 100) * 100;

    return {
      series: [
        {
          name: 'Target',
          data: [aggregatedData.lastWeek.target, aggregatedData.currentWeek.target],
        },
        {
          name: 'Alert',
          data: [aggregatedData.lastWeek.alerts, aggregatedData.currentWeek.alerts],
        },
      ],
      categories: [
        `Week ${aggregatedData.lastWeek.week}`,
        `Week ${aggregatedData.currentWeek.week}`,
      ],
      dynamicMax,
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
        columnWidth: '45%',
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
          fontFamily: 'Arial, sans-serif'
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
              columnWidth: '90%',
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
      backgroundColor:"#FDFEFF",
    }}>
      <Col>
        <CardTitle tag="h5" className="text-center mt-2">
          Compliance Targets
        </CardTitle>
        {loading ? (
          <div className="d-flex justify-content-center align-items-center" style={{ height: '250px' }}>
            <div className="spinner-border text-primary" role="status">
              <span className="visually-hidden">Loading...</span>
            </div>
          </div>
        ) : (
          <ReactApexChart options={options} series={chartData.series} type="bar" height={360} />
        )}
      </Col>
    </Row>
  );
};

export default ComplianceTargetsChart;