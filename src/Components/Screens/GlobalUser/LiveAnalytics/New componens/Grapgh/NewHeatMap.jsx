import React, { useEffect, useState } from 'react';
import { Card, CardBody, CardHeader, Col, Row } from 'reactstrap';
import ReactApexChart from 'react-apexcharts';
import { TbPoint } from 'react-icons/tb';
import Loader3 from '../../../../../../CommonElements/Spinner/loader3';
import { useNavigate } from 'react-router-dom';

export default function NewHeatmap({ heatmapData, moduleLength, loader, filters }) {
  const [series, setSeries] = useState([]);
  const { areas = [], subAreas = [], data = [] } = heatmapData || {};
  const navigate = useNavigate();

  const handleDataPointClick = (event, chartContext, { dataPointIndex, seriesIndex, w }) => {
    const xAxisValue = areas[dataPointIndex]; // Gate value
    // Extract numeric value from Gate string (e.g., "Gate 1" -> "1")
    const subareaValue = parseInt(xAxisValue.match(/\d+/)[0]);
    const yAxisValue = w.config.series[seriesIndex].name; // Module value
    
    const currentDate = new Date();
    const oneJan = new Date(currentDate.getFullYear(), 0, 1);
    const dayOfWeek = oneJan.getDay();
    const firstMondayOffset = (dayOfWeek === 0 ? -6 : 1) - dayOfWeek;
    const firstMonday = new Date(oneJan.setDate(oneJan.getDate() + firstMondayOffset));
    const daysSinceFirstMonday = Math.floor((currentDate - firstMonday) / 86400000);
    const weekNumber = Math.ceil((daysSinceFirstMonday + 1) / 7);

    const determineIdentifier = (filters) => {
      if (filters.weekly) return "week";
      if (filters.month) return "month";
      if (filters.date) return "date";
      return "week";
    };

    const identifier = determineIdentifier(filters);
    
    const liveAlertFilters = {
      ...filters,
      identifier,
      module: yAxisValue,
      week: filters.weekly || "",
      approval: "Select Approval",
      severity: "",
      shift: filters.shift || [],
      date: "",
      month: filters.month || "",
      starting: "",
      ending: "",
      subarea: [subareaValue] // Changed to array containing the numeric value
    };

    localStorage.setItem('liveAlertFilters', JSON.stringify(liveAlertFilters));
    const role = JSON.parse(localStorage.getItem('role'));
    navigate(`${process.env.PUBLIC_URL}/live_alert/${role}`);
  };

  const options = {
    chart: {
      type: 'heatmap',
      width: '100%',
      toolbar: {
        show: false,
      },
      events: {
        dataPointSelection: handleDataPointClick
      },
      background: '#fff',
      fontFamily: 'inherit',
      responsive: [
        {
          breakpoint: 800,
          options: {
            chart: {
              width: 600,
            },
            xaxis: {
              labels: {
                style: {
                  fontSize: '10px',
                },
              },
            },
            yaxis: {
              labels: {
                style: {
                  fontSize: '10px',
                },
              },
            },
            dataLabels: {
              style: {
                fontSize: '10px',
              },
            },
          },
        },
      ],
    },
    dataLabels: {
      enabled: true,
      style: {
        fontSize: '14px',
        fontWeight: 100,
        colors: ['#1e293b'],
      },
    },
    xaxis: {
      categories: areas || [],
      labels: {
        style: {
          fontSize: '12px',
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
      categories: data?.map((item) => item.name) || [],
      labels: {
        style: {
          fontSize: '12px',
        },
      },
    },
    plotOptions: {
      heatmap: {
        enableShades: false,
        shadeIntensity: 0.5,
        distributed: true,
        radius: 10,
        padding: 5,
        colorScale: {
          ranges: [
            {
              from: -1,
              to: -1,
              name: ' ',
              color: '#ffffff',
              foreColor: '#ffffff',
            },
            {
              from: 0,
              to: 0,
              name: ' ',
              color: '#f6f6f6',
              foreColor: 'black',
            },
            {
              from: 1,
              to: 10,
              name: 'Normal',
              color: '#cfcad3',
              foreColor: '#FFFFFF',
            },
            {
              from: 11,
              to: 100,
              name: 'Serious',
              color: '#635470',
              foreColor: '#FFFFFF',
            },
            {
              from: 101,
              to: 300,
              name: 'Trouble',
              color: '#3b3243',
              foreColor: '#FFFFFF',
            },
            {
              from: 301,
              to: 1000,
              name: 'Critical',
              color: '#231d27',
              foreColor: '#FFFFFF',
            },
          ],
        },
      },
    },
    grid: {
      show: false,
    },
    legend: {
      show: false,
    },
    tooltip: {
      enabled: true,
      theme: 'light',
      x: {
        show: true,
      },
      y: {
        formatter: function (value) {
          return `${value} <span className='m-0 p-0' style={{fontSize:'10px',fontWeight:'lighter'}}>alerts</span>`;
        },
      },
    },
  };

  const items = [
    { label: 'Normal', color: '#cfcad3', width: '74px', height: '9px', borderRadius: '5px' },
    { label: 'Serious', color: '#635470', width: '58px', height: '9px', borderRadius: '5px' },
    { label: 'Trouble', color: '#3b3243', width: '42px', height: '9px', borderRadius: '5px' },
    { label: 'Critical', color: '#231d27', width: '26px', height: '9px', borderRadius: '5px' },
    { label: 'N/A', color: '#f6f6f6', width: '18px', height: '9px', borderRadius: '5px', padding: true },
  ];

  useEffect(() => {
    if (heatmapData?.data) {
      setSeries(heatmapData.data);
    }
  }, [heatmapData]);

  return (
    <Card style={{ minHeight: '300px' }}>
      <CardHeader className='pb-0' style={{ border: '0px' }}>
        <h5>Area Intensity Heatmap</h5>
      </CardHeader>
      {loader ? (
        <div className='w-100 h-100 d-flex justify-content-center align-items-center position-absolute' style={{ height: '100%' }}>
          <Loader3 />
        </div>
      ) : (
        <CardBody className='pt-0'>
          <Row>
            <Col>
              <div className='colorShadeOfheatMap' style={{ display: 'flex', flexDirection: 'column', gap: '10px', minWidth: '205px' }}>
                {items.map((item, index) => (
                  <div key={index} style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
                    <TbPoint style={{ color: item.color, fontSize: '25px' }} />
                    <span style={{ fontSize: '14px', color: '#6c757d' }}>{item.label}</span>
                    <div
                      style={{
                        width: item.width,
                        height: item.height,
                        borderRadius: item.borderRadius,
                        backgroundColor: item.color,
                        marginLeft: item.padding ? '23px' : undefined,
                      }}
                      className='barcolorwidth'
                    ></div>
                  </div>
                ))}
              </div>
            </Col>
            <Col xs='12' className='heatmapnewdesign' style={{ overflowX: 'auto' }}>
              <div style={{ minWidth: '600px' }}>
                <ReactApexChart options={options} series={series} type='heatmap' height='350px' />
                <p className='text-center'>Alerts</p>
              </div>
            </Col>
          </Row>
        </CardBody>
      )}
    </Card>
  );
}