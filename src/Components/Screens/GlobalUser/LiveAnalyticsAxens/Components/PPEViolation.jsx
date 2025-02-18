import React from 'react';
import Chart from 'react-apexcharts';
import { Card, CardBody, CardTitle, Row, Col } from 'reactstrap';

const PPEViolationChart = ({ data, isLoading, gateData }) => {
  const chartOptions = {
    chart: {
      type: 'bar',
      toolbar: {
        show: false
      },
      events: {
        mouseMove: function(event, chartContext, config) {
          const tooltip = document.querySelector('.apexcharts-tooltip');
          if (tooltip) {
            tooltip.style.display = 'block';
          }
        }
      }
    },
    plotOptions: {
      bar: {
        horizontal: false,
        borderRadius: 2,
        columnWidth: '60%',
        distributed: true,
        dataLabels: {
          position: 'center'
        }
      }
    },
    dataLabels: {
      enabled: false
    },
    xaxis: {
      categories: data.map(item => item.module),
      labels: {
        style: {
          fontSize: '12px',
          fontWeight: 400,
          colors: '#666'
        },
        rotate: -45,
        trim: true,
        hideOverlappingLabels: true,
      },
      title: {
        text: 'No. of Alerts',
        offsetY: -10,
        style: {
          fontSize: '14px',
          fontWeight: 400,
          color: '#666',
        }
      }
    },
    yaxis: {
      labels: {
        style: {
          fontSize: '14px',
          fontWeight: 400,
          colors: '#666'
        }
      }
    },
    grid: {
      padding: {
        top: 0,
        right: 0,
        bottom: 0,
        left: 0
      },
      xaxis: {
        lines: {
          show: false
        }
      },
      yaxis: {
        lines: {
          show: false
        }
      }
    },
    colors: ['#F1CA32', '#8E66FF', '#E69151', '#26B6B4', '#23946C'],
    tooltip: {
      enabled: true,
      shared: true,
      intersect: false,
      followCursor: true,
      custom: function({ series, seriesIndex, dataPointIndex, w }) {
        const value = series[seriesIndex][dataPointIndex];
        const category = w.globals.labels[dataPointIndex];
        return (
          '<div class="custom-tooltip">' +
          '<span class="tooltip-title">' + category + '</span><br/>' +
          '<span class="tooltip-value">Alerts: ' + value + '</span>' +
          '</div>'
        );
      },
      style: {
        fontSize: '12px'
      },
      onDatasetHover: {
        highlightDataSeries: true,
      },
      items: {
        display: 'flex',
      },
      fixed: {
        enabled: false,
        position: 'topRight',
        offsetX: 0,
        offsetY: 0,
      },
      marker: {
        show: false,
      }
    },
    states: {
      hover: {
        filter: {
          type: 'lighten',
          value: 0.15
        }
      },
      active: {
        allowMultipleDataPointsSelection: false,
        filter: {
          type: 'darken',
          value: 0.35
        }
      }
    }
  };

  const series = [{
    name: 'Alerts',
    data: data.map(item => item.alerts_count)
  }];

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <Card className="shadow-sm">
      <CardBody>
        <CardTitle tag="h6" className="mb-3">
          Alert Counts
        </CardTitle>

        <div className="mb-2">
          <Chart
            options={chartOptions}
            series={series}
            type="bar"
            height={281}
          />
        </div>

        <Row className="g-3">
          {gateData.map((gate, index) => (
            <Col xs={4} md={4} sm={4} key={index}>
              <div
                className="text-center"
                style={{
                  backgroundColor: "#26B6B4",
                  padding: '8px 2px',
                  borderRadius: '8px 8px 0 0',
                  color: 'white'
                }}
              >
                <span className="text-sm font-medium whitespace-nowrap">
                  Gate # {gate.gate}
                </span>
              </div>
              <div
                className="text-center"
                style={{
                  backgroundColor: '#F2F8FF',
                  padding: '4px 0 2px 0',
                  borderRadius: '0 0 8px 8px'
                }}
              >
                <span className="text-sm opacity-90 text-gray-600 whitespace-nowrap">
                  Alerts {gate.alerts_count}
                </span>
              </div>
            </Col>
          ))}
        </Row>
      </CardBody>
    </Card>
  );
};

export default PPEViolationChart;