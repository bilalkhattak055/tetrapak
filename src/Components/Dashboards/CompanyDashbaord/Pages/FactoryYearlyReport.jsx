import React, { useState,useEffect } from "react";
import '../Styling/factoryowner.css'
import {  Col, Modal, Row,Container } from 'react-bootstrap';
import ReactApexChart from 'react-apexcharts';
import { FaLongArrowAltDown } from "react-icons/fa";
import { Card, CardBody } from "reactstrap";
import { FaTableList } from "react-icons/fa6";
import { FaCalendarAlt, FaClock } from 'react-icons/fa';
import { GiSteeltoeBoots } from "react-icons/gi";
import { GiSunglasses } from "react-icons/gi";
import { CiMedicalMask } from "react-icons/ci";
import YearlyDatePicker from '../../../Common/YearlyDatePicker/yearlyDatePicker'
import GlobalDashboard from '../../GlobalDashboard/Default/index'
import Production from "../../GlobalDashboard/AreawiseReports/production/Production";

const FactoryYearlyReport = () => {

  const alertData = [
    {
      type: 'Gate #1',
      percentage: '80.50%',
      totalhelmet: '40',
      status: 'Down',
      backgroundcolors: '#85c1e9'
    },
    {
      type: 'Gate #2',
      percentage: '72.3%',
      totalhelmet: '20',
      status: 'Down',
      icon: <GiSteeltoeBoots />,
      backgroundcolors: '#FFDAB9'

    },
    {
      type: 'Gate #3',
      percentage: '46.1',
      totalhelmet: '72',
      status: 'Down',
      icon: <GiSunglasses />,
      backgroundcolors: '#85c1e9'

    },
    {
      type: 'Gate #4',
      percentage: '36.3%',
      totalhelmet: '39',
      status: 'Down',
      icon: <CiMedicalMask />,
      backgroundcolors: '#FFDAB9'
    },
  ]
  const images = [
    {
      imagepath: 'https://static.toiimg.com/photo/56329061.cms?imgsize=43342',
      cameraNumber: 'Camera 1',
    },
    {
      imagepath: 'https://www.shutterstock.com/shutterstock/videos/1088545931/thumb/1.jpg?ip=x480',
      cameraNumber: 'Camera 2'
    },
    {
      imagepath: 'https://s33644.pcdn.co/wp-content/uploads/2021/07/CCTV-WorkplaceRegulations-AndreyPopovAdobeStock-21.jpeg'
      ,
      cameraNumber: 'Camera 3'
    }, {
      imagepath: 'https://silversolution.in/wp-content/uploads/2022/06/IMG-20201028-WA0010-1024x576.jpg',
      cameraNumber: 'Camera 4'
    },

  ]
  const dailySales = [
    { time: '2024-07-01 00:00', quantitySold: 5 },
    { time: '2024-07-01 01:00', quantitySold: 3 },
    { time: '2024-07-01 02:00', quantitySold: 6 },
    { time: '2024-07-01 03:00', quantitySold: 4 },
    { time: '2024-07-01 04:00', quantitySold: 2 },
    { time: '2024-07-01 05:00', quantitySold: 7 },
    { time: '2024-07-01 06:00', quantitySold: 8 },
    { time: '2024-07-01 07:00', quantitySold: 5 },
    { time: '2024-07-01 08:00', quantitySold: 6 },
    { time: '2024-07-01 09:00', quantitySold: 4 },
    { time: '2024-07-01 10:00', quantitySold: 3 },
    { time: '2024-07-01 11:00', quantitySold: 6 },
    { time: '2024-07-01 12:00', quantitySold: 7 },
    { time: '2024-07-01 13:00', quantitySold: 8 },
    { time: '2024-07-01 14:00', quantitySold: 5 },
    { time: '2024-07-01 15:00', quantitySold: 6 },
    { time: '2024-07-01 16:00', quantitySold: 7 },
    { time: '2024-07-01 17:00', quantitySold: 8 },
    { time: '2024-07-01 18:00', quantitySold: 5 },
    { time: '2024-07-01 19:00', quantitySold: 6 },
    { time: '2024-07-01 20:00', quantitySold: 7 },
    { time: '2024-07-01 21:00', quantitySold: 8 },
    { time: '2024-07-01 22:00', quantitySold: 5 },
    { time: '2024-07-01 23:00', quantitySold: 6 },
    { time: '2024-08-01 00:00', quantitySold: 8 },
    { time: '2024-08-01 01:00', quantitySold: 6 },
    { time: '2024-08-01 02:00', quantitySold: 7 },
    { time: '2024-08-01 03:00', quantitySold: 5 },
    { time: '2024-08-01 04:00', quantitySold: 4 },
    { time: '2024-08-01 05:00', quantitySold: 8 },
    { time: '2024-08-01 06:00', quantitySold: 9 },
    { time: '2024-08-01 07:00', quantitySold: 7 },
    { time: '2024-08-01 08:00', quantitySold: 6 },
    { time: '2024-08-01 09:00', quantitySold: 8 },
    { time: '2024-08-01 10:00', quantitySold: 5 },
    { time: '2024-08-01 11:00', quantitySold: 7 },
    { time: '2024-08-01 12:00', quantitySold: 6 },
    { time: '2024-08-01 13:00', quantitySold: 8 },
    { time: '2024-08-01 14:00', quantitySold: 7 },
    { time: '2024-08-01 15:00', quantitySold: 9 },
    { time: '2024-08-01 16:00', quantitySold: 8 },
    { time: '2024-08-01 17:00', quantitySold: 7 },
    { time: '2024-08-01 18:00', quantitySold: 6 },
    { time: '2024-08-01 19:00', quantitySold: 8 },
    { time: '2024-08-01 20:00', quantitySold: 7 },
    { time: '2024-08-01 21:00', quantitySold: 9 },
    { time: '2024-08-01 22:00', quantitySold: 6 },
    { time: '2024-08-01 23:00', quantitySold: 8 },
    { time: '2024-09-01 00:00', quantitySold: 9 },
    { time: '2024-09-01 01:00', quantitySold: 7 },
    { time: '2024-09-01 02:00', quantitySold: 8 },
    { time: '2024-09-01 03:00', quantitySold: 6 },
    { time: '2024-09-01 04:00', quantitySold: 5 },
    { time: '2024-09-01 05:00', quantitySold: 8 },
    { time: '2024-09-01 06:00', quantitySold: 7 },
    { time: '2024-09-01 07:00', quantitySold: 9 },
    { time: '2024-09-01 08:00', quantitySold: 8 },
    { time: '2024-09-01 09:00', quantitySold: 7 },
    { time: '2024-09-01 10:00', quantitySold: 9 },
    { time: '2024-09-01 11:00', quantitySold: 8 },
    { time: '2024-09-01 12:00', quantitySold: 7 },
    { time: '2024-09-01 13:00', quantitySold: 9 },
    { time: '2024-09-01 14:00', quantitySold: 8 },
    { time: '2024-09-01 15:00', quantitySold: 7 },
    { time: '2024-09-01 16:00', quantitySold: 9 },
    { time: '2024-09-01 17:00', quantitySold: 8 },
    { time: '2024-09-01 18:00', quantitySold: 7 },
    { time: '2024-09-01 19:00', quantitySold: 9 },
    { time: '2024-09-01 20:00', quantitySold: 8 },
    { time: '2024-09-01 21:00', quantitySold: 7 },
    { time: '2024-09-01 22:00', quantitySold: 9 },
    { time: '2024-09-01 23:00', quantitySold: 8 },
  ]

  const donut = {
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
        height: 320,
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
        position: 'bottom',
        horizontalAlign: 'left',
        formatter: function (label, opts) {
          const series = opts.w.globals.series;
          const total = series.reduce((acc, val) => acc + val, 0);
          const percentage = (series[opts.seriesIndex] / total * 100).toFixed(0);
          return `${percentage}% ${label}`;
        },
        // offsetX: 10,
        offsetY: -5,
      },
      plotOptions: {
        pie: {
          donut: {
            labels: {
              show: true, // Center labels ko show karna
              name: {
                show: false, // Name label ko show karna
                fontSize: '22px', // Font size set karna
                fontFamily: 'Helvetica, Arial, sans-serif', // Font family set karna
                color: '#373d3f', // Text color set karna
                offsetY: -10 // Vertical position adjust karna
              },
              value: {
                show: true, // Value label ko show karna
                fontSize: '30px', // Value ke liye font size set karna
                fontFamily: 'Helvetica, Arial, sans-serif',
                fontWeight: 'bold',
                color: '#0b57d0', // Value ke liye color set karna
                offsetY: 16, // Vertical position adjust karna
                formatter: function (val) {
                  return val + "%"; // Value ko percentage format me dikhana
                }
              },
              total: {
                show: true, // Total label ko show karna ,

                color: '#373d3f', // Total label ka color set karna
                formatter: function (w) {
                  return w.globals.seriesTotals.reduce((a, b) => {
                    return b;
                  }, 0) + "%"; // Total value ko calculate karna aur percentage format me dikhana
                }
              }
            }
          }
        }
      }
    },
    series: [30, 70]

  }
  const grapgh = {
    series: [{
      name: 'Desktops',
      data: [26, 16, 12, 20, 30, 40, 36, 25, 20, 40, 60, 70]
    }],
    options: {
      chart: {
        type: 'line',
        height: 270,
        zoom: {
          enabled: false
        },
        toolbar: {
          show: false
        },
        // Add padding around the entire chart area
        margin: {
          top: 20, // Padding on top
          right: 20, // Padding on right
          bottom: 20, // Padding on bottom
          left: 20
        }
      },
      dataLabels: {
        enabled: false
      },
      stroke: {
        curve: 'smooth',
        width: 3
      },
      title: {
        text: 'Count',
        style: {
          color: '#607D8B',
          fontWeight: '100',
          fontSize: '12px',
        },
        floating: true,
        offsetX: 4,
        offsetY: 17

      },
      grid: {
        show: true,
        xaxis: {
          lines: {
            show: false
          }
        },
        yaxis: {
          lines: {
            show: true
          }
        },
        padding: {
          top: 15,
        },
      },
      xaxis: {
        type: 'numeric',
        min: 2,
        max: 12,
        // tickAmount: 7,
        title: {
          text: 'Hours',
          style: {
            fontWeight: '100',
            color: "#607D8B",
          },
        },
        labels: {
          formatter: function (value) {
            return [2, 4, 6, 8, 10, 12].includes(value) ? value : '';
          },
          style: {
            colors: '#607D8B',
            fontSize: '12px',
            fontFamily: '"M PLUS Rounded 1c"'
          },
        },
        axisBorder: {
          show: false,
          color: '#78909C'
        },
        axisTicks: {
          show: false,
          color: '#78909C'
        }
      },
      yaxis: {
        axisBorder: {
          show: false,
          color: '#78909C'
        },
        min: 10,
        max: 70,
        axisTicks: {
          show: false,
          color: '#78909C'
        },
        labels: {
          style: {
            colors: '#607D8B',
            fontSize: '12px',
            fontFamily: '"M PLUS Rounded 1c"'
          }
        },
      },
      plotOptions: {
        line: {
          dataLabels: {
            position: 'top' // Example of using plotOptions for specific chart areas
          }
        }
      }
    }
  }
  const bar = {
    series: [{
      name: 'Series 1',
      data: [12, 10, 8, 6, 4]
    }],
    options: {
      chart: {
        type: 'bar',
        height: '270',
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
          horizontal: true,
          borderRadius: 3,

          borderColor: 'black',
          distributed: true,
        }
      },
      dataLabels: {
        enabled: false
      },
      xaxis: {
        tickAmount: 6,
        min: 2,
        max: 12,
        categories: ['Gate #1', 'Gate #2', 'Gate #3', 'Gate #4', 'Gate #5'],
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
            show: true // This will hide the horizontal grid lines
          }
        },
        yaxis: {
          lines: {
            show: false
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
  }
  const progress = [
    { gatenumber: '1', percentage: 88 },
    { gatenumber: '2', percentage: 72 },
    { gatenumber: '3', percentage: 45 },
    { gatenumber: '4', percentage: 35 },
  ]
  const liveData = [
    {
      img: 'https://s3-alpha-sig.figma.com/img/1bbb/39ea/ff005f4dceeeb29fce8bd874b878e347?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qdtXhy29DEasBBHADelftSkq4YV8ZLefG5~-3HmVyEIhTQoABZs2HNY7RPx2qN1y6HnJbPiES3m5baukmyIA668eDqPipIoGgSWoBFtgNESZjAs2nRhVh7qhB0WZPnFfcaao89SgnBsUzeT2rH7npRjeE55wcDt-f44P-AIxKEMj-J6nihVjrA31txq0KNQiO~73J4YHaiEvishwHTF48hldIYvZzmspyBADWBy1~76smXHmpcxUR3rPrbGZZZT47PsCOErBzDmm~FoufyuE8Ilo1abmkFGQR2yegXGaGSqB-8uJ9vA7ajY7zC-FZqrbJMZR3f7XOAxqIZunzFaNwA__',
      room: 'Generator Room',
      gate: '1'
    },
    {
      img: 'https://s3-alpha-sig.figma.com/img/5a6c/4d44/616c32f8b412bd0644939f1224579ba2?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=h~LOOYhZtcH5KWd~IAI1WomTUWEDGbGNEQFJPE2DmHL1tGqL0Xis4h8dTt3UIp0iC~~7dcwrdIT7PGZSSf8wIl5CymKjsbq6yl3qpyFVzjiU0uAnczMG8BTl83Rr1896CvfOxgOPEbIcVopgcFZUZoOzZkaYmTK9hywY3uVClCkkLO4Wr~dJQ-QCYmL~qDB7HesU9if7cD8BWM46rSjgsPDr8ipnSMnJeFgiiNQhuX4zwBFMMbw02YomPh1eLU7qtEWKBy0GeQWxhDSxDHPH5n1DlTCION7x-q2BwVAo1JU9D9jv8xQXVnS2U6l3B4FiEhtvJjCSs~0ReTMZQY9yZg__',
      room: 'Labour Room',
      gate: '2'

    },
    {
      img: 'https://s3-alpha-sig.figma.com/img/525c/6ced/2a76c55290b892228cb0c21329f68b87?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=qEtniSfT0oNtajseTtFNCm6PsrzB0Ep5nrygu6KYfCniQNBZmqU8NwoyG5rnqdsHfYVHB4GDiAScCjFVgu1T9iJ~bkS6dJtsT2VptQAoLL9zfhjBFXPRo1qeVuwg1onrcOtrnfiTKNuI-4ksudJHC~KpzwCAc0eftQ4UxzuIDImXK1HwHkKzPd1iqcBjpSvRpdpERZkaq-E8n4vEQdZ61HrFfyFqRn4Rb0YU2tdtwRmB75CKaX53vgxz4-KGOAbr3pgE9c2El6rqGv0oE-k8NDfhHjVezMziBF69lvvZ4pYivFisBUnsAg71L5dCUH60mkWN7wJUOoomOEY2DcMXkw__',
      room: 'Store Room',
      gate: '3'

    },
    {
      img: 'https://s3-alpha-sig.figma.com/img/46e5/cf65/4ff346dec40a96e7e4222c9dc3b9f644?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=VLexXjpnJQWS6nMGYmjv1hjTk-sGHWsnNMNuw1shLFsWuKOA2U-zbG9SAaibWiqVlIXU4dtZ62~M7lSJCb~9NcFBYsavGIbQqDLEKcguHVj8lKrUAfBfjLok37FP~PNazrnRD~XUzMSnOJNM0mftmARICLyHjPm2mVSVwZBNtN5e6jdeRPTeWFPJQOGD4kBY3vp5c8SCqHCFKsw7VA5gGWHGHNtnOs1orkcP5peO0Ta5Ug3aGKLJ7NRgAZeVw-v0aPp6UGQtcSzQ9IxiOZizkE7g9-dwThbGnEbY8mAr8cfJAe58~D2kr95q9ype7-Jz9ykvdOvCcs5Tfqqye~Jb4g__',
      room: 'Technician Room',
      gate: '4'

    },
    {
      img: 'https://s3-alpha-sig.figma.com/img/30a5/d376/6665822b7cb91bf54c87d26c584bc70f?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=cw~eer2XJ0jl~29iFj3W3M5NvrpdIyH2WeHQEzxW-FrEnk3NnOSMjZnrWiHmBp~nI2N~RCgWStQeG8fRCibQUaCE3XzcqLIKeHoXlgWwjXPerXTYujuUgEly2MJAhnNgn61-oTeU~qGWoXVsksEoT6ADttTIjgfu7XSeIBiDMMJfto-7cR3Tueb6fe2PkjEJ4gEBWBpKk2m4wuaa8iokxPMEJRJBwk0HxsS1UhyKWNbZQntYJRJB5AySxuuvjClQAxxQ3SRrw0QKwnPBcsAbEG8FP8Q5wwcZV3h-h723ZQIdzc4B~muQ7KeeiPY33GZisYdCNXF0DqErx1tXXWmcsQ__',
      room: 'Labour Room 2',
      gate: '5'

    },
    {
      img: 'https://s3-alpha-sig.figma.com/img/5a1d/835d/6f5e0e9ba1844b1e7713f7b0ce00dad0?Expires=1724630400&Key-Pair-Id=APKAQ4GOSFWCVNEHN3O4&Signature=oYAMX7yU7EbKFVMjPmjBRr8N5SHNAnyOHj7e3feuHX~1ADHQ~9tWLVu9eM4yiSAgis0TSQ9000slL1cMD3dRh6Qrn17GW-eIyBbu--TIRPicdGyRHhah7SpWxKPQtl5wgDFgW9xSv8a4dBTQWKV5WYKjvUkj1VbYJGMvQcfTdNbo9RgbR0KRTwYmNVAAx7Vqihn4VYXSXLYPJgWkIMFdw0sc~0f1D9ePYRj2ZZCHzyMSHFVpTXOLz85R~2RoqAqhH5bVHWjVlepr4ThE2DtkV5JvGPZE-KRZ2Ndh8Cfph9dYyNRH7xyawAu30gJX4kUIVLzqSmxyVbSbrROa0E2dxA__',
      room: 'Store Room 2',
      gate: '6'

    },
  ]

  const [imgPath, setimgPath] = useState();
  const [show, setShow] = useState(false);

  const handleImage = (path) => {
    const data = path;
    console.log(data)
    setimgPath(data.imagepath);
    setShow(true)
  } 
  
  const [selectedYear, setSelectedYear] = useState(new Date()); // Default to current year
const [year, setYear] = useState()
  const handleYear = (date) => {
    if (date) {
      setSelectedYear(date);
    }
  };
  useEffect(() => {
    if (selectedYear) {
      // Format the year to a string (e.g., '2024')
      setYear(selectedYear.getFullYear().toString());
    }
  }, [selectedYear]);
  return (
    < >
    {/* <GlobalDashboard  type='Yearly'/> */}
   <Production mainTitle={'Yearly Report'} type={'area'}/>

{/* <Container>
      <Row style={{ paddingBlock: '50px' }} >
        <Col xxl='6' xl='6' lg='6' md='6' sm='6' xs='6' >
          <h1 style={{ fontSize: '30px' }}>Year: {year} </h1>
        </Col>
        <Col xxl='6' xl='6' lg='6' md='6' sm='6' xs='6' className="d-flex justify-content-end  align-items-center "  >
        <YearlyDatePicker 
                handleYear={handleYear}
                selectedYear={selectedYear}
                setSelectedYear={setSelectedYear}
                setYear={setYear}
                year={year}
            />
        </Col>
      </Row>
      <Row >
        <Col xl='3' xxl='3' lg='6' md='6' className='CustomCard1'>
          <h1>Overall Compliance</h1>
          <Card>
            <CardBody className="p-0">

              <ReactApexChart
                options={donut.options}
                series={donut.series}
                type={donut.options.chart.type}
                height={donut.options.chart.height}
              />
            </CardBody>
          </Card>
        </Col>
        <Col xl='3' xxl='3' lg='6' md='6' className='CustomCard1'>
          <h1>Emergency Gate Blockage</h1>
          <Card>
            <CardBody className="py-3">
              {progress.map((pointer, key) => (
                <Row style={{ marginBlock: '25px',paddingInline:'10px' }}>
                  <Col xl='4' lg='4' sm='4' md='4' xs='4' xxl='4' style={{ padding: '0px' }}>
                    <div style={{ background: `${key % 2 == 0 ? '#deebfc' : '#ffeaff'}`, paddingInline: '6px', paddingBlock: '6px', borderRadius: '10px' }}>
                      <p style={{ padding: '0px', margin: '0px', fontSize: '12px', textAlign: 'center', color: '#607D8B' }}>Gate #{pointer.gatenumber}</p>

                    </div>
                  </Col>
                  <Col xl='8' lg='8' sm='8' md='8' xs='8' xxl='8' style={{ margin: '0px', paddingLeft: '15px' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <p style={{ padding: '0px', margin: '0px', fontSize: '12px', color: '#607D8B' }}>Gate #{pointer.gatenumber}</p>
                      <p style={{ padding: '0px', margin: '0px', fontSize: '12px', color: `${pointer.percentage > 80 ? 'orange' : pointer.percentage > 40 ? 'green' : pointer.percentage > 30 ? 'red' : ''}` }}>{pointer.percentage}%</p>
                    </div>
                    <div className="progress" style={{ height: 2, width: '100%' }}>
                      <div
                        className={`progress ${pointer.percentage > 80 ? 'bg-warning' : pointer.percentage > 40 ? 'bg-success' : pointer.percentage > 30 ? 'bg-danger' : ''}`}
                        role="progressbar"
                        aria-valuenow={pointer.percentage}  // Dynamic value for aria-valuenow
                        aria-valuemin={0}
                        aria-valuemax={100}
                        style={{ width: `${pointer.percentage}%`, borderRadius: '0px' }}
                      />

                    </div>
                  </Col>
                </Row>
              ))}

            </CardBody>
          </Card>
        </Col>
        <Col xl='3' xxl='3' lg='6' md='6' className='CustomCard1'>
          <h1>Blockage Over Time</h1>
          <Card>
            <CardBody className="p-0 ">
              <ReactApexChart
                options={grapgh.options}
                series={grapgh.series}
                type={grapgh.options.chart.type}
                height={grapgh.options.chart.height}
              />
            </CardBody>
          </Card>
        </Col>
        <Col xl='3' xxl='3' lg='6' md='6' className='CustomCard1'>
          <h1>Alerts</h1>
          <Card>
            <CardBody className="p-0 ">
              <ReactApexChart
                options={bar.options}
                series={bar.series}
                type={bar.options.chart.type}
                height={bar.options.chart.height}
              />
            </CardBody>
          </Card>
        </Col>

      </Row>


      <section style={{ paddingBlock: '15px' }}>
        <Row>
          <Col xxl='6' xl='6' lg='6' md='6' sm='6' xs='6'>
            <h1 style={{ fontSize: '30px' }}>Alerts</h1>
          </Col>
          <Col xxl='6' xl='6' lg='6' md='6' sm='6' xs='6' className="d-flex justify-content-end"  >
          <button className="btn " style={{ background: '#0b57d0', color: 'white', border: '0px', borderRadius: '10px' }}>
            View all <FaTableList className="mx-1" />
          </button>
          </Col>

        </Row>

        <Row className='alertParent'>
          {alertData.map((key, index) => (
            <Col sm='6' md='3' lg='3' xl='3' xxl='3' className='AlertCard'>
              <div className='alertBox card' style={{ width: '100%', paddingInline: '28px', paddingBlock: '10px' }}>
                <div className='alertsmallcards' >
                  <h2 style={{ color: 'black', paddingInline: '10px', paddingBlock: '5px', fontWeight: '100', background: `${key.backgroundcolors}` }}>{key.type}</h2>
                  <h1 style={{ paddingLeft: '20px' }}>  </h1>
                </div>
                <div style={{ display: 'flex' }}>
                  <h1 style={{ fontSize: '20px' }}>{key.totalhelmet}</h1>
                  <FaLongArrowAltDown style={{ color: 'red', marginTop: '5px', marginLeft: '10px' }} />
                  <span style={{ color: 'red', marginTop: '3px', marginRight: '5px' }}> {key.percentage} </span>

                  <h2 style={{ fontSize: '13px', paddingLeft: '6px', fontWeight: '300', marginTop: '5px' }}>{key.status}</h2>
                </div>
              </div>
            </Col>
          ))}

        </Row>
      </section>

      <section className='  '>
        <Col className='AlertsDashboardSection'>
          <h1>Camera</h1>
          <button className="btn " style={{ background: '#0b57d0', color: 'white', border: '0px', borderRadius: '10px' }}>
            View all <FaTableList className="mx-1" />
          </button>
        </Col>
        <Row className='CameraParent' >

          {images.map((key, index) => (
            <Col xxl='3' xl='3' lg='3' md='4' sm='6' xs='6' className='Cameracard' >
              <div className='Camerabox' onClick={() => { handleImage(key) }}>
                <img src={key.imagepath} alt="" />
              </div>
              <h1>Gate #{index + 1}</h1>
            </Col>
          ))}

        </Row>
      </section>

      <section>
        <Modal show={show} onHide={() => { setShow(false) }} centered >
          <div className="imageshow">
            <img src={imgPath} alt="image" className="img-fluid" />
          </div>
        </Modal>
      </section>
      </Container> */}
    </>

  );
}

export default FactoryYearlyReport;
   
