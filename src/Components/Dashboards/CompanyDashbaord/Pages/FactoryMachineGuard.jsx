import React, { useState } from 'react';
import { Container } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import { Card, CardBody, Col, Row } from 'reactstrap';
import DatePicker from 'react-datepicker';
import "react-datepicker/dist/react-datepicker.css";
import calendarImage from '../../../../assets/images/dashboard/calendarTiming/calendar-svg.svg'
import '../../../../Components/Dashboards/Dashboard/components/calendarTiming/calendar.css'
import { IoIosArrowDown } from "react-icons/io";
import { IoMdBook } from "react-icons/io";
import { MdOutlineFactory } from "react-icons/md";
import { LuAreaChart } from "react-icons/lu";
import { H4, H6 } from '../../../../AbstractElements';
import './../Styling/factoryowner.css'
import RecentAlerts from '../Components/RecentAlerts';
import VideoSession from '../Components/VideoSession';
import { Link, useNavigate } from 'react-router-dom';
import img from '../../../../assets/images/dashboard/vieww.svg'
import ViewAllButton from '../../../Common/newButton/index'
import AllFilters from '../../../Common/allFilters/AllFilters';
import { areas, factories } from '../../../../Data/staticData/data';

const FactoryMachineGuard = () => {
  const [showDate, setShowDate] = useState(false)
  const [showDropdown, setShowDropdown] = useState(false);
  const role = JSON.parse(localStorage.getItem('role'));
  //filters states
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Ensure the date object is correctly set to the local time zone
    const day = date.getUTCDate(); // Use UTC methods to avoid timezone issues
    const month = date.toLocaleString('default', { month: 'long' }); // Full month name
    const year = date.getUTCFullYear();

    return `${day} ${month} ${year}`;
  };
  const today = new Date();
  const startDat = today.toISOString().split('T')[0];
  const [startDate, setStartDate] = useState(startDat)
  const [selectedDate, setSelectedDate] = useState(startDat)
  const [filters, setFilters] = useState({
    module: '',
    area: '',
    factory: ''
  })
  let formattedStartDate;
  if (startDate) {
    formattedStartDate = formatDate(startDate); // Current date in yyyy-mm-dd format
  }
  const toggleDropdown = () => {
    setShowDropdown(!showDropdown);
    console.log('toggleeee')
  };
  const [chartData, setChartData] = useState([
    {
      id: 1,
      title: 'Overtime Compliance',
      options: {
        grid: {
          padding: {
            top: 0,
            bottom: 0,
            left: 0,
            right: 0
          }
        },
        chart: {
          height: 270,  // Increased the height to ensure enough space
          width: 400,
          type: 'donut',
          toolbar: {
            show: false
          },

        },
        labels: ['Close Door', 'Open Door'],
        colors: ['#0b76b7', '#41b2ef', '#83cdf6', '#bde3fa'],
        dataLabels: {
          enabled: false
        },
        legend: {
          show: true,
          position: 'bottom',  // Keep the legend on the right
          offsetX: 0,
          formatter: function (label, opts) {
            const series = opts.w.globals.series;
            return `${series[opts.seriesIndex]} ${label}`;
          },
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
                  color: '#6D6F70',
                  offsetY: -10
                },
                value: {
                  show: true,
                  fontSize: '30px',
                  fontFamily: 'Helvetica, Arial, sans-serif',
                  fontWeight: 'bold',
                  color: '#6D6F70',
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
        responsive: [
          {
          breakpoint: 767, // Mobile devices
          options: {
            legend: {
              show: true,
              position: 'right',  // Position legend to the right
              offsetX: 0,
              offsetY: 100,  // Adjust the Y offset to move legend to the bottom
              floating: false  // Legend should stay fixed
            },
          }
        },
        {
          breakpoint: 500, // Mobile devices
          options: {
            legend: {
              show: true,
              position: 'bottom',  // Position legend to the right
              offsetX: 0,
              offsetY: 0,  // Adjust the Y offset to move legend to the bottom
              floating: false  // Legend should stay fixed
            },
          }
        },
        ],
        
       
      },
      series: [5, 10]
    }

    ,


    {
      id: 2,
      title: 'Violation Over Time',

      series: [{
        name: 'Series 1',
        data: [7, 6, 5, 6, 4, 5, 6, 3, 4, 5, 6, 4]
      }],
      options: {
        chart: {
          type: 'bar',
          height: 220,
          width: 380,
          toolbar: {
            show: false,
            tools: {
              download: true,
              selection: true,
              zoom: true,
              zoomin: true,
              zoomout: true,
              pan: true,
              reset: true,
            },
          },
        },
        plotOptions: {
          bar: {
            horizontal: false,
            borderRadius: 3,

            borderColor: 'black',
            distributed: true,
          }
        },
        responsive: [{
          breakpoint: 1921, // Mobile devices
          options: {
            chart: {
              // height: 270, // Adjust height for smaller screens

            },

          }
        },
        ],
        dataLabels: {
          enabled: false
        },
        xaxis: {
          tickAmount: 11,
          min: 1,
          max: 12,
          categories: [1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12],
          // axisBorder: {
          //   show: false,
          //   color: '',
          //   height: 1,
          //   width: '100%',
          //   offsetX: 0,
          //   offsetY: 0
          // },
          // axisTicks: {
          //   show: false,
          //   borderType: 'solid',
          //   color: '#78909C',
          //   height: 6,
          //   offsetX: 0,
          //   offsetY: 0
          // },
          labels: {

            style: {
              colors: '#607D8B',
              fontSize: '12px',
              fontFamily: '"M PLUS Rounded 1c"',
              fontWeight: 500,
              cssClass: 'apexcharts-xaxis-label',
            },
          },
        },
        yaxis: {
          labels: {
            style: {
              colors: '#607D8B',
              fontSize: '12px',
              fontFamily: 'sans-serif',
              fontWeight: 200,
              cssClass: 'apexcharts-yaxis-label',
            },
          },
        },

        grid: {
          show: true,
          xaxis: {
            lines: {
              show: false // This will hide the horizontal grid lines
            }
          },
          yaxis: {
            lines: {
              show: true
            },

          },
          padding: {
            top: 0,
            right: 20,
            bottom: 0,
          }
        },
        legend: {
          show: false,
          position: 'bottom',
          horizontalAlign: 'center',
          fontSize: '9px',
          fontFamily: '"M PLUS Rounded 1c"',
          fontWeight: 800,
          labels: {
            colors: '#263238',
          },
          markers: {
            width: 12,
            height: 12,
            strokeWidth: 0,
            strokeColor: '#fff',
            fillColors: undefined,
            radius: 12,
            customHTML: undefined,
            onClick: undefined,
          },
          itemMargin: {
            horizontal: 10,
            vertical: 5
          },
        },
        colors: ['#0d47a1', '#1565c0', '#1565c0', '#1565c0', '#1565c0'],
        //   fill: {
        //     colors: ['#008FFB'],
        //     opacity: 1,
        //     borderColor: 'black',
        //     borderWidth: 1,
        //   },
      }

    },
    {
      id: 3,
      title: 'Alerts Summary',

      data: [
        {
          amount: 614,
          caption: 'Total Monitored Doors',

          series: [
            {
              name: "Desktops",
              data: [210, 180, 650, 200, 600, 100, 800, 300, 500],
            },
          ],
          options: {
            chart: {
              width: 100,
              height: 80,
              type: "bar",
              toolbar: {
                show: false,
              },

              dropShadow: {
                enabled: true,
                enabledOnSeries: undefined,
                top: 5,
                left: 0,
                blur: 3,
                color: "#16C7F9",
                opacity: 0.3,
              },
              zoom: {
                enabled: false,
              },
            },
            colors: ["#16C7F9"],
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: 2,
              curve: "smooth",
            },
            grid: {
              show: false,
            },
            tooltip: {
              x: {
                show: false,
              },
              y: {
                show: false,
              },
              z: {
                show: false,
              },
              marker: {
                show: false,
              },
            },
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            yaxis: {
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
          },


        },
        {
          amount: 614,
          caption: 'Open Doors',

          series: [
            {
              name: "Desktops",
              data: [210, 180, 650, 200, 600, 100, 800, 300, 500],
            },
          ],
          options: {
            chart: {
              width: 100,
              height: 80,
              type: "bar",
              toolbar: {
                show: false,
              },
              dropShadow: {
                enabled: true,
                enabledOnSeries: undefined,
                top: 5,
                left: 0,
                blur: 3,
                color: "#16C7F9",
                opacity: 0.3,
              },
              zoom: {
                enabled: false,
              },
            },
            colors: ["#16C7F9"],
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: 2,
              curve: "smooth",
            },
            grid: {
              show: false,
            },
            tooltip: {
              x: {
                show: false,
              },
              y: {
                show: false,
              },
              z: {
                show: false,
              },
              marker: {
                show: false,
              },
            },
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            yaxis: {
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
          },


        },
        {
          amount: 614,
          caption: 'Total Alerts',

          series: [
            {
              name: "Desktops",
              data: [210, 180, 650, 200, 600, 100, 800, 300, 500],
            },
          ],
          options: {
            chart: {
              width: 100,
              height: 80,
              type: "bar",
              toolbar: {
                show: false,
              },
              dropShadow: {
                enabled: true,
                enabledOnSeries: undefined,
                top: 5,
                left: 0,
                blur: 3,
                color: "#16C7F9",
                opacity: 0.3,
              },
              zoom: {
                enabled: false,
              },
            },
            colors: ["#16C7F9"],
            dataLabels: {
              enabled: false,
            },
            stroke: {
              width: 2,
              curve: "smooth",
            },
            grid: {
              show: false,
            },
            tooltip: {
              x: {
                show: false,
              },
              y: {
                show: false,
              },
              z: {
                show: false,
              },
              marker: {
                show: false,
              },
            },
            xaxis: {
              categories: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep"],
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
              tooltip: {
                enabled: false,
              },
            },
            yaxis: {
              labels: {
                show: false,
              },
              axisBorder: {
                show: false,
              },
              axisTicks: {
                show: false,
              },
            },
          },


        },
      ],

    }
  ])
  const [recentAlerts, setRecentAlerts] = useState([
    {
      img: 'https://static.vecteezy.com/system/resources/thumbnails/008/085/230/original/industrial-engineers-in-hard-hats-work-at-the-heavy-industry-manufacturing-factory-industrial-worker-indoors-in-factory-man-working-in-an-industrial-video.jpg',
      video: 'https://www.youtube.com/embed/XoFoFFY9GzE?autoplay=1',
      machineGuard: 2,
      module: 'Helmet',
      area: 2,
      time: new Date().toLocaleString()
    },
    {
      img: 'https://static.vecteezy.com/system/resources/thumbnails/008/085/230/original/industrial-engineers-in-hard-hats-work-at-the-heavy-industry-manufacturing-factory-industrial-worker-indoors-in-factory-man-working-in-an-industrial-video.jpg',
      video: 'https://www.youtube.com/embed/CnsxlIzLKK4?autoplay=1',
      machineGuard: 3,
      module: 'Emergency Exit',
      area: 2,
      time: new Date().toLocaleString()

    }, {
      img: 'https://static.vecteezy.com/system/resources/thumbnails/008/085/230/original/industrial-engineers-in-hard-hats-work-at-the-heavy-industry-manufacturing-factory-industrial-worker-indoors-in-factory-man-working-in-an-industrial-video.jpg',
      video: 'https://www.youtube.com/embed/XoFoFFY9GzE?autoplay=1',
      machineGuard: 4,
      module: 'Machine Guard',
      area: 2,
      time: new Date().toLocaleString()

    }, {
      img: 'https://static.vecteezy.com/system/resources/thumbnails/008/085/230/original/industrial-engineers-in-hard-hats-work-at-the-heavy-industry-manufacturing-factory-industrial-worker-indoors-in-factory-man-working-in-an-industrial-video.jpg',
      video: 'https://www.youtube.com/embed/XoFoFFY9GzE?autoplay=1',
      machineGuard: 5,
      module: 'Helmet',
      area: 2,
      time: new Date().toLocaleString()

    },
  ])
  const [activeData, setActiveData] = useState([recentAlerts[0]])
  const [active, setActive] = useState([recentAlerts[0].machineGuard])
  function handleActive(alert) {
    setActive(alert)
    const activeVideo = recentAlerts.filter((item) => item.machineGuard == alert)
    setActiveData(activeVideo)
  }
  function handleDateChange(e) {
    console.log('ppe date')
    if (!e.target.value) {
      setSelectedDate('');
      setStartDate('')
      return; // Exit the function
    }

    setSelectedDate(e.target.value)

  }

  const handleInputChange = (e, field) => {
    setFilters({
      ...filters,
      [field]: e.target.value
    });
    // applyFilters({ ...filters, [field]: e.target.value });
  };
  const style = { width: '158px', height: '48px' }

  return (
    <>
      <Container fluid={true} style={{ paddingTop: '30px' }}>

        <Row className='header d-flex justify-content-between align-items-center permissioncolres mb-4' >
          <Col lg='5' xs='12' >
            <H4>
              Machine Guard Dashboard
            </H4>
          </Col>
          <Col className='d-flex justify-content-start justify-content-sm-start justify-content-md-end justify-content-lg-end justify-content-xl-end gap-1' lg='7' xs='12'>
            <AllFilters
              handleInputChange={handleInputChange}  style={style} selectedDate={selectedDate} startDate={startDate} handleDateChange={handleDateChange} typedate={'date'} dateInputShow={true}
            />


          </Col>
        </Row>


        <Row>
          {
            chartData.map((chart) => {
              return (
                <>
                  <Col xl='4' lg='6' md='6' sm='12' xs='12'>
                    <span style={{ fontSize: '16px' }}>{chart.title}</span>
                    <Card >
                      <CardBody className=''>
                        {
                          chart.id !== 3 ? (
                            <>

                              <ReactApexChart
                                options={chart.options}
                                series={chart.series}
                                type={chart.options.chart.type}
                                height={chart.options.chart.height}
                              // width={chart.options.chart.width}
                              />

                            </>
                          ) :
                            (
                              <>

                                {
                                  chart.data.map((cards) => {
                                    return (
                                      <>
                                        <Card style={{ height: '67px', backgroundColor: '#f5f5f5', boxShadow: 'none' }} className={` m-2`}>
                                          <CardBody className='m-0' >
                                            <div className='d-flex justify-content-between align-items-end px-4 m-0' style={{ width: '100%' }}>
                                              <H6 >{cards.amount}</H6>
                                              <div className={` order-chart profit-chart`}   >
                                                <ReactApexChart type={cards.options.chart.type} height={cards.options.chart.height} width={cards.options.chart.width} options={cards.options} series={cards.series} />
                                              </div>
                                            </div>
                                            <span className='f-light px-4 m-0'>{cards.caption}</span>

                                          </CardBody>
                                        </Card>
                                      </>
                                    )
                                  })
                                }

                              </>
                            )
                        }
                      </CardBody>
                    </Card>
                  </Col>
                </>
              )
            })
          }

        </Row>
        <Row className='  my-0'>
          <Col className='mb-3' xl='6' >
            <div className="d-flex align-items-center justify-content-between mb-3" style={{  }} >
              <p className="m-0 p-0" style={{ fontSize: '16px' }}>Alerts</p>
              <Link to={`${process.env.PUBLIC_URL}/dashboard/live-camera/${role}`}>
                <ViewAllButton btnText='View All' icon={img} />
              </Link>

            </div>
            <RecentAlerts active={active} setActive={setActive} handleActive={handleActive} recentAlerts={recentAlerts} />
          </Col>
          <Col   xl='6' className='mt-2'>
          <div className='d-flex align-items-start justify-content-start mb-3 flex-column'>
          <p className="m-0 p-0" style={{ fontSize: '16px' }}>Video Session</p>

            </div>
            <VideoSession activeData={activeData} />

          </Col>
        </Row>
      </Container>
    </>
  );
}

export default FactoryMachineGuard;
