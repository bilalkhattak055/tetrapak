import React, { useState } from 'react';
import { Row, Col, Card } from 'react-bootstrap';
import DatePicker from 'react-datepicker';
import calendarImage from '../../../../assets/images/dashboard/calendarTiming/calendar-svg.svg'
import watchImage from '../../../../assets/images/dashboard/calendarTiming/watch-svg.svg'
import ForkLiftTotalCard from '../Components/ForkLiftTotalCard'
import ForkLiftHeroBigCard from '../Components/ForkLiftHeroBigCard';
import ReactApexChart from 'react-apexcharts';
import FactoryDataTable from '../Components/Table/DataTable'
import smallCards from '../StaticData/Data'
import { Container } from 'reactstrap';
import DateTime from '../Components/DateTime';
import { H4 } from '../../../../AbstractElements';
import AllFilters from '../../../Common/allFilters/AllFilters';
import { areas, factories } from '../../../../Data/staticData/data';
const FactoryFolklift = () => {
  
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
    //filters end

  const heroCards = [1, 2, 3, 4]
  const donut = {
    id: 1,
    title: 'Active Forklift',
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
        height: 340,
        type: 'donut',
        toolbar: {
          show: false
        }
      },
      labels: ['Blockage', 'No Blockage'],
      colors: ['#d3e4ff', '#0b57d0'],
      dataLabels: {
        enabled: false
      },
      legend: {
        show: true,
        position: 'right',
        offsetX: 0,
        offsetY: 100,
        formatter: function (label, opts) {
          const series = opts.w.globals.series;
          const total = series.reduce((acc, val) => acc + val, 0);
          const percentage = ((series[opts.seriesIndex] / total) * 100).toFixed(0);
          return `${percentage}% ${label}`;
        }
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
                  return w.globals.seriesTotals.reduce((a, b) => a + b, 0) + "%";
                }
              }
            }
          }
        }
      },
      responsive: [
        {
          breakpoint: 768, // Mobile devices
          options: {
            chart: {
              height: 300 // Adjust height for smaller screens
            },

          }
        },
        {
          breakpoint: 2000, // Mobile devices
          options: {
            chart: {
              height: 260 // Adjust height for smaller screens
            },

          }
        },

        {
          breakpoint: 1600, // Mobile devices
          options: {
            chart: {
              height: 260 // Adjust height for smaller screens
            },

          }
        },
        {
          breakpoint: 1450, // Tablets
          options: {
            chart: {
              height: 200
            },
          },
          legend: {
            show: true,
            position: 'right',
            offsetX: 0,
            offsetY: 50,
          },
        },
        {
          breakpoint: 1200, // Tablets
          options: {
            chart: {
              height: 200
            },
          }
        },
        {
          breakpoint: 767,
          options: {
            chart: {
              height: 250
            },
          }
        },
        {
          breakpoint: 500,
          options: {
            chart: {
              height: 200
            },
          }
        }
      ]
    },
    series: [30, 70]
  };
  const bigCardChild = [
    {
      title: 'June',
      total: '350',
      chart: {
        series: [
          {
            name: "Desktops",
            data: [210, 180, 650, 200, 600, 100, 800, 300, 500],
          },
        ],
        options: {
          chart: {
            // width: 70,
            // height: 200,
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
          colors: ["white"],
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
    },
    {
      title: 'May',
      total: '320',
      chart: {
        series: [
          {
            name: "Desktops",
            data: [210, 180, 650, 200, 600, 100, 800, 300, 500],
          },
        ],
        options: {
          chart: {
            // width: 70,
            // height: 200,
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
          colors: ["white"],
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
    },
  ]
  const image = 'https://videos.cctvcamerapros.com/images/HD-surveillance/AHD-AD24H-1080p-Outdoor-Dome-Security-Camera-VIdeo-Surveillance.jpg'
  const tableData = [
    {
      id: 27,
      img: image,
      status: 'Active',
      createdBy: 'It Officer',
      name: "Jane Smith",
      email: "jane.smith@example.com",
      Phone: "+92313778899",
      role: "Factory",
      date: "2024-08-02",
      action: "Pending",
      area: "Gulshan",
      factory: 'Production',
      permissions: [
        { name: 'ITOfficer', isActive: false },
        { name: 'factory', isActive: true },
        { name: 'Factory', isActive: true },
        { name: 'Area', isActive: false },
        { name: 'TechQA', isActive: false }
      ]
    },
    {
      id: 30,
      status: 'Inactive',
      img: image,
      createdBy: 'It Officer',
      name: "Michael Johnson",
      email: "michael.johnson@example.com",
      Phone: "+92313778899",
      role: "Factory",
      date: "2024-08-03", area: "Gulshan",
      factory: 'Production',
      action: "Rejected",
      permissions: [
        { name: 'ITOfficer', isActive: true },
        { name: 'factory', isActive: true },
        { name: 'Factory', isActive: true },
        { name: 'Area', isActive: false },
        { name: 'TechQA', isActive: true }
      ]
    },
    {
      id: 29,
      status: 'Active',
      createdBy: 'It Officer',
      name: "Emily Davis",
      img: image,
      Phone: "+92313778899",
      email: "emily.davis@example.com",
      role: "Area",
      date: "2024-08-04",
      action: "Approved",
      area: "Gulshan",
      factory: 'Production',
      permissions: [
        { name: 'ITOfficer', isActive: true },
        { name: 'factory', isActive: true },
        { name: 'Factory', isActive: false },
        { name: 'Area', isActive: true },
        { name: 'TechQA', isActive: false }
      ]
    },
    {
      id: 33,
      status: 'Inactive',
      img: image,
      createdBy: 'It Officer',
      name: "William Brown",
      email: "william.brown@example.com",
      role: "Tech QA",
      Phone: "+92313778899",
      date: "2024-08-05",
      area: "Gulshan",
      factory: 'Production',
      action: "Pending",
      permissions: [
        { name: 'ITOfficer', isActive: false },
        { name: 'factory', isActive: true },
        { name: 'Factory', isActive: true },
        { name: 'Area', isActive: false },
        { name: 'TechQA', isActive: false }
      ]
    },
  ];
  const tableColumns = [
    {
      name: 'Id',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Forklift',
      selector: row => row.id,
      sortable: true,
    },
    {
      name: 'Area',
      selector: row => row.area,
      // sortable: true,
    },
    {
      name: 'Factory',
      selector: row => row.factory,
      // sortable: true,

      // cell: row => (
      //     <div style={{ background: '#267DEA', color: 'white', border: '0px', padding: '10px 18px', borderRadius: '10px', width: '80%', textAlign: 'center' }}>
      //         {row.role}
      //     </div>
      // ),
    },

    {
      name: 'Time',
      selector: row => row.date,
      // sortable: true,
    },
    {
      name: 'Image',
      cell: row => (
        <div style={{ width: '50px', height: '30px', borderRadius: '5px' }}>
          <img src={row.img} alt="" style={{ width: '100%', borderRadius: '5px' }} />
        </div>
      ),
    },
    // {
    //     name: 'Action',
    //     cell: row => (
    //         <div className='d-flex align-items-center justify-content-center'>
    //             <button onClick={() => handleEditClick(row)} style={{ border: 'none', background: 'none' }}>
    //                 <img src={editIcon} alt="Edit" style={{ width: '20px', height: '20px', marginRight: '2px' }} />
    //             </button>
    //             <button onClick={() => handleDeleteClick(row)} style={{ border: 'none', background: 'none' }}>
    //                 <img src={deleteIcon} alt="Delete" style={{ width: '20px', height: '20px' }} />
    //             </button>

    //         </div>
    //     ),
    // },
  ];




  //filters ffunctions
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
  // filters functions end


  const handleEditClick = (e) => {
    const rowData = e;
  }


  return (
    < Container fluid={true} >
      <section className='sectionPaddning'>
        <Row className='mb-4' style={{ paddingTop: '30px' }} >
          <Col   lg='5' xs='12' >
            <H4>
              Forklift Dashboard
            </H4>
          </Col>
          <Col lg='7' xs='12' className='d-flex justify-content-end' >
          <AllFilters
              handleInputChange={handleInputChange} factories={factories} style={style} areas={areas} selectedDate={selectedDate} startDate={startDate} handleDateChange={handleDateChange} typedate={'date'} dateInputShow={true}
            />

          </Col>
        </Row>
        <Row >
          {smallCards.map((key, index) => (
            <Col xl='3' lg='4' md='4' sm='6' xs='12'  >
              <ForkLiftTotalCard data={key} />
            </Col>
          ))}
        </Row>

        <Row  >
          <Col xl='6' lg='6' md='6' sm='12'  >
            <Card  >
              <ReactApexChart
                options={donut.options} // Correct options prop
                series={donut.series}   // Correct series prop
                type={donut.options.chart.type} // Correct type
                height={donut.options.chart.height} // Correct height
              />
            </Card>

          </Col>
          <Col xl='6' lg='6' md='6' sm='12'  >
            {bigCardChild.map((key, index) => (
              <ForkLiftHeroBigCard data={key} />
            ))}
          </Col>

        </Row>
        <Row>
          <Col xl='12' lg='12' style={{ display: 'flex', justifyContent: 'space-between', flexWrap: 'wrap', width: '100%' }}>
            <p className="m-0 p-0" style={{ fontSize: '17px' }}>Last Feed</p>

          </Col>
          <Col xl='12' lg='12'  >
            <Card >
              <FactoryDataTable
                tableColumns={tableColumns}
                staticData={tableData}
                onRowClick={handleEditClick}
              />
            </Card>
          </Col>
        </Row>
      </section>

    </Container>
  );
}

export default FactoryFolklift;
