import React, { useEffect, useState } from "react";
import { Row, Col, Card, CardBody, Modal } from "react-bootstrap";
import ReactApexChart from "react-apexcharts";
import { H4 } from "../../../../AbstractElements";
import img from "../../../../assets/images/dashboard/vieww.svg";
import { Link } from "react-router-dom";
import { Container } from "reactstrap";
import ViewAllButton from "../../../Common/newButton/index";
import AllFilters from "../../../Common/allFilters/AllFilters";
import Loader1 from "../../../../CommonElements/Spinner/loader";
import AreaService from "../../../../api/areaService";
import OverAllComplianceDonutChart from "./OverAllComplianceDonutChart";
import './styling/addForm.css'
import SingleImage from "../../../../Gallery/zoomin/SingleImage";

const FactoryPPEModal = () => {
  // const [selectedDate, setSelectedDate] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [endTime, setEndTime] = useState(null);
  //showing
  const [showDate, setShowDate] = useState(false);
  const [showStartTime, setShowStartTime] = useState(false);
  const [showEndTime, setShowEndtime] = useState(false);
  const [data, setData] = useState([]);
  const [searchItem, setSearchItem] = useState("");
  const [filteredRows, setFilteredRows] = useState([]);
  const initialRole = JSON.parse(localStorage.getItem("role"));
  const [role, setRole] = useState(initialRole);

  //filters states
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Ensure the date object is correctly set to the local time zone
    const day = date.getUTCDate(); // Use UTC methods to avoid timezone issues
    const month = date.toLocaleString("default", { month: "long" }); // Full month name
    const year = date.getUTCFullYear();

    return `${day} ${month} ${year}`;
  };
  const today = new Date();
  const startDat = today.toLocaleDateString('en-CA');
  const [startDate, setStartDate] = useState(startDat);
  const [selectedDate, setSelectedDate] = useState(startDat);
  const [filters, setFilters] = useState({
    module: "",
    area: "",
    factory: "",
  });
  let formattedStartDate;
  if (startDate) {
    formattedStartDate = formatDate(startDate); // Current date in yyyy-mm-dd format
  }
  const [loader, setLoader] = useState(false);
  const [dashboardData, setDashboardData] = useState({
    overall_compliance: {
      comliant_count: 0,
      non_comliant_count: 0,
    },
    camera_wise_alerts: [],
    daily_alerts: [],
    camera_images:[],
    recent_alerts:[],

  });

  const [violationOverTime, setViolationOverTime] = useState({
    series: [
      {
        name: "Alerts",
        data: [],
      },
    ],
    options: {
      chart: {
        height: 250,
        type: "area",
        toolbar: {
          show: false,
        },
      },
      title: {
        text: "Alerts", // Your title here
        align: "left",
        floating: false,
        offsetX: 7,
        offsetY: 10,
        style: {
          fontSize: "12px", // Font size of the title
          color: "#6d6f70", // Title color, you can change it dynamically
          fontFamily: "Arial",
          fontWeight: "400",
        },
      },
      dataLabels: {
        enabled: false,
      },
      colors: ["#0B76B7", "#BDE3FA", "#41B2EF", "#267DEA"],
      stroke: {
        curve: "smooth",
        width: [4, 4, 4, 4], // Thicker stroke for 'Total' line
      },
      fill: {
        type: "solid",
        opacity: 0, // Set opacity to 0 to remove the fill
      },
      xaxis: {
        type: "category", // Use 'category' for custom labels
        categories: [],
        title: {
          text: "Hours",
          style: {
            fontWeight: "100",
            color: "#607D8B",
          },
          offsetX: -25,
          offsetY: 0, // Adjusted to reduce space
        },
        labels: {
          offsetY: 0, // Reduced offset to bring labels closer to the chart
        },
      },

      yaxis: {
        min: 0,
        max: function (maxValue) {
          return Math.max(5, maxValue + 5); // Ensure y-axis is at least 5 units greater than the highest alert
        },
        forceNiceScale: true,
        labels: {
          formatter: function (value) {
            return Math.round(value); // Show integer values
          },
          style: {
            colors: ["#6D6F70"], // Color for the y-axis values
            fontSize: "12px",
          },
        },
      
      },
      tooltip: {
        x: {
          format: "dd/MM/yy HH:mm",
        },
      },
      legend: {
        position: "bottom",
        horizontalAlign: "center",
      },
    },
  });

  const [cameraWiseAlerts, setCameraWiseAlerts] = useState({
    chart: {
      type: "bar",
      height: 250,
      toolbar: {
        show: false,
      },
    },
    title: {
      text: "Alerts", // Your title here
      align: "left",
      floating: false,
      offsetX: 7,
      offsetY: 10,
      style: {
        fontSize: "12px", // Font size of the title
        color: "#6d6f70", // Title color, you can change it dynamically
        fontFamily: "Arial",
        fontWeight: "400",
      },
    },
    plotOptions: {
      bar: {
        distributed: false, // Different colors for each bar
        borderRadius: 0, // Rounds the top borders of bars
        columnWidth:
          dashboardData?.camera_wise_alerts?.length <= 3
            ? "10%"
            : (dashboardData?.camera_wise_alerts?.length > 3 &&
              dashboardData?.camera_wise_alerts?.length < 8)
            ? "90%" 
            : "40%",
        // horizontal: false,
      },
    },
    colors: ["#0b76b7", "#41b2ef", "#83cdf6"], // Custom colors for each bar
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      labels: {
        style: {
          colors: ["#6D6F70"], // Color for the x-axis values
          fontSize: "12px",
        },
      },
      title: {
        text: "Cameras",
        style: {
          fontWeight: "100",
          color: "#607D8B",
        },
        offsetX: -25,
        offsetY: 0, // Adjusted to reduce space
      },
    },
    yaxis: {
      forceNiceScale:true,
      min:0,
      max:undefined,
      labels: {
        formatter: function (value) {
          return Math.floor(value);
        },
        style: {
          colors: ["#6D6F70"], // Color for the y-axis values
          fontSize: "12px",
        },
      },
      title: {
        // text: 'Alerts'
      },
    },
    // tooltip: {
    //   x: {
    //     formatter: function (value, { series, seriesIndex, dataPointIndex, w }) {
    //       // Assuming your categories are like ["1", "2", "3"] and you want to append "Camera "
    //       return `Camera ${w.globals.labels[dataPointIndex]}`;
    //     },
    //   },
    // },
    tooltip: {
      x: {
        formatter: function (value, {series, seriesIndex, dataPointIndex, w}) {
          return `Camera ${w.globals.labels[dataPointIndex]}`
        }
      }
    },
    legend: {
      show: false,
      position: "right", // Legends on the right
      floating: false, // Legends don't float, fixed to the right
      offsetY: 170, // Vertically center the legend
      offsetX: 0, // Adjust X offset to move the legend to the right
      formatter: function (label, opts) {
        const series = opts.w.globals.series[0]; // Access the data array
        const total = series.reduce((acc, val) => acc + val, 0);
        const percentage = ((series[opts.seriesIndex] / total) * 100).toFixed(
          0
        );
        return `<div style="width:150px; display:flex; justify-content:space-between; align-items:center;">${label} <span>${percentage && percentage !='NaN' ? percentage : "0" }%</span></div>`;
      },
      markers: {
        fillColors: ["#0b76b7", "#41b2ef", "#83cdf6"], // Match legend colors to bars
        radius: 5, // Rounded borders of the legend markers
      },
      labels: {
        colors: "#6D6F70", // Color for legend text
        fontSize: "12px",
      },
    },
    series: [
      {
        name: "Alerts",
        data: [],
        // data: [450, 350, 250, 450, 350, 250, 450, 350, 250, 450, 350, 250, 450, 350, 250, 450, 350] // Data for each bar
      },
    ],
  });
  

  useEffect(() => {
    setLoader(true);
    let unsubscribe = fetchDashboard(selectedDate);
    return () => unsubscribe;
  }, []);

  const fetchDashboard = (selected_date) => {
    const payload = {
      user_id: 9,
      date: selected_date,
    };
    AreaService.getHelmetModule(payload)
      .then((res) => {
        const resp = res?.data?.data;
        // console.log(resp)
        setDashboardData({
          ...dashboardData,
          overall_compliance: resp?.helmet_compliance,
          camera_wise_alerts: resp?.camera_wise_alerts,
          daily_alerts: resp?.daily_alerts,
          camera_images:resp?.cameras,
          recent_alerts:resp?.recent_alerts
        });
        setViolationOverTime({
          ...violationOverTime,
          series: [
            {
              name: "Alerts",
              data: resp?.daily_alerts?.map((item) => item?.alerts) || [],
            },
          ],
          options: {
            ...violationOverTime?.options,
            xaxis: {
              ...violationOverTime?.options?.xaxis,
              categories:
                resp?.daily_alerts?.map((i) => {
                  // remove the time part, after next server restart
                  const timeParts = i?.label.split(" ");
                  const hour = timeParts[0].startsWith("0")
                    ? timeParts[0].slice(1)
                    : timeParts[0]; // Remove leading zero if present
                  return `${hour} ${timeParts[1]}`;
                }) || [], // Use an empty array as fallback
            },
          },
        });

        setCameraWiseAlerts({
          ...cameraWiseAlerts,
          series: [
            {
              name: "Alerts",
              data: resp?.camera_wise_alerts?.map((item) => item?.alerts) || [],
            },
          ],
          xaxis: {
            ...cameraWiseAlerts?.xaxis,
            categories:
              resp?.camera_wise_alerts?.map((i) => i?.camera_id) || [], // Use an empty array as fallback
            
          },
          plotOptions:{
            ...cameraWiseAlerts?.plotOptions,
            bar:{
              ...cameraWiseAlerts?.plotOptions?.bar,
              columnWidth: resp?.camera_wise_alerts?.length <= 3
              ? "40%"
              : (resp?.camera_wise_alerts?.length > 3 &&
                resp?.camera_wise_alerts?.length < 8)
              ? "50%" 
              : "40%"

            }
          }
        });

        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  useEffect(() => {
    const today_date = new Date().toLocaleDateString('en-CA');
    if (selectedDate === today_date) {
      const interval = setInterval(() => {
        fetchDashboard(selectedDate);
      }, 5000);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [selectedDate]);

  // const images = [
  //   {
  //     imagepath: "https://static.toiimg.com/photo/56329061.cms?imgsize=43342",
  //     cameraNumber: "Camera 1",
  //   },
  //   {
  //     imagepath:
  //       "https://www.shutterstock.com/shutterstock/videos/1088545931/thumb/1.jpg?ip=x480",
  //     cameraNumber: "Camera 2",
  //   },
  //   {
  //     imagepath:
  //       "https://s33644.pcdn.co/wp-content/uploads/2021/07/CCTV-WorkplaceRegulations-AndreyPopovAdobeStock-21.jpeg",
  //     cameraNumber: "Camera 3",
  //   },
  //   {
  //     imagepath:
  //       "https://silversolution.in/wp-content/uploads/2022/06/IMG-20201028-WA0010-1024x576.jpg",
  //     cameraNumber: "Camera 4",
  //   },
  //   {
  //     imagepath:
  //       "https://www.shutterstock.com/shutterstock/videos/1088545931/thumb/1.jpg?ip=x480",
  //     cameraNumber: "Camera 2",
  //   },
  //   {
  //     imagepath:
  //       "https://s33644.pcdn.co/wp-content/uploads/2021/07/CCTV-WorkplaceRegulations-AndreyPopovAdobeStock-21.jpeg",
  //     cameraNumber: "Camera 3",
  //   },
  // ];

  const chartOptions2 = {
    chart: {
      type: "bar",
      height: 250,
      toolbar: {
        show: false,
      },
    },
    title: {
      text: "Alerts", // Your title here
      align: "left",
      floating: false,
      offsetX: 7,
      offsetY: 10,
      style: {
        fontSize: "12px", // Font size of the title
        color: "#6d6f70", // Title color, you can change it dynamically
        fontFamily: "Arial",
        fontWeight: "400",
      },
    },
    plotOptions: {
      bar: {
        distributed: false, // Different colors for each bar
        borderRadius: 0, // Rounds the top borders of bars
        columnWidth: "70%", // Increase bar width, adjust as needed
        horizontal: false,
      },
    },
    colors: ["#83cdf6", "#41b2ef", "#83cdf6"],
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["07", "09", "11", "13", "15", "17", "18"], // Custom 2-hour intervals for 24 hours

      labels: {
        style: {
          colors: ["#6D6F70"], // Color for the x-axis values
          fontSize: "12px",
        },
      },
      title: {
        text: "Hours",
        style: {
          fontWeight: "100",
          color: "#607D8B",
        },
        offsetX: -25,
        offsetY: 0, // Adjusted to reduce space
      },
    },
    yaxis: {
      labels: {
        style: {
          colors: ["#6D6F70"], // Color for the y-axis values
          fontSize: "12px",
        },
      },
      title: {
        // text: 'Alerts'
      },
    },
    legend: {
      show: false,
      position: "right", // Legends on the right
      floating: false, // Legends don't float, fixed to the right
      offsetY: 170, // Vertically center the legend
      offsetX: 0, // Adjust X offset to move the legend to the right
      formatter: function (label, opts) {
        const series = opts.w.globals.series[0]; // Access the data array
        const total = series.reduce((acc, val) => acc + val, 0);
        const percentage = ((series[opts.seriesIndex] / total) * 100).toFixed(
          0
        );
        return `<div style="width:150px; display:flex; justify-content:space-between; align-items:center;">${label} <span>${percentage}%</span></div>`;
      },
      markers: {
        fillColors: ["#0b76b7", "#41b2ef", "#83cdf6"], // Match legend colors to bars
        radius: 5, // Rounded borders of the legend markers
      },
      labels: {
        colors: "#6D6F70",
        fontSize: "12px",
      },
    },
    series: [
      {
        name: "Alerts",
        data: [450, 350, 250, 450, 350, 250, 450], // Data for each bar
      },
    ],
  };
  const [imgPath, setimgPath] = useState();
  const [show, setShow] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [imageData, setImageData] = useState({})
  
  const handleImage = (path) => {
    setImageData({
      cameraName: path?.camera_name,
      date: path?.date,
      time: path?.time
    })
    setimgPath(path?.image);
    setIsOpen(true)
    setShow(true);
  };
  function handleDateChange(e) {
    if (!e.target.value) {
      const today_date = new Date().toLocaleDateString('en-CA');
      
      setSelectedDate(today_date);
      setStartDate(today_date);
      setLoader(true)
      fetchDashboard(today_date)
    } else {
      setSelectedDate(e.target.value);
      setLoader(true)
      fetchDashboard(e.target.value);
    }
  }
  const handleInputChange = (e, field) => {
    setFilters({
      ...filters,
      [field]: e.target.value,
    });
    // applyFilters({ ...filters, [field]: e.target.value });
  };
  const style = { width: "158px", height: "48px" };
  return (
    <>
  {isOpen && <SingleImage setIsOpen={setIsOpen} photo={imgPath} imageData={imageData} /> }
  
    <Container fluid={true} style={{ paddingTop: "30px" }}>
      {loader ? (
        <div style={{ marginTop: 90 }}>
          <Loader1 />
        </div>
      ) : (
        <section>
          <Row className="mb-4 d-flex justify-content-between align-items-center">
            <Col xl="6" lg="5" md="12">
              <H4>Helmet Module</H4>
            </Col>
            <Col
              xl="6"
              lg="7"
              md="12"
              className="d-flex justify-content-xl-end justify-content-lg-end justify-content-sm-center justify-content-md-center justify-content-center "
            >
              <AllFilters
                handleInputChange={handleInputChange}
                style={style}
                selectedDate={selectedDate}
                startDate={startDate}
                handleDateChange={handleDateChange}
                typedate={"date"}
                dateInputShow={true}
              />
            </Col>
          </Row>

          {/* GRAPHS */}
          <Row>
            {/* OVERALL COMPLIANCE */}
            <Col xxl="4" xl="4" lg="6" md="6" sm="6" xs="12">
              <OverAllComplianceDonutChart
                data={dashboardData?.overall_compliance}
              />
            </Col>
            {/*  VIOLATION OVER TIME */}
            <Col xxl="4" xl="4" lg="6" md="6" sm="6" xs="12">
              <p
                style={{ fontSize: "17px", fontWeight: "200" }}
                className="heroCardHeadingfactoryHomepage"
              >
                Violation Over Time
              </p>
              <Card style={{ marginRight: -10, marginBottom: 10 }}>
                <CardBody>
                  <ReactApexChart
                    options={violationOverTime?.options}
                    series={violationOverTime?.series}
                    height="250"
                    type="area"
                  />
                </CardBody>
              </Card>
            </Col>

            {/* CAMERA WISE ALERTS */}
            <Col xxl="4" xl="4" lg="6" md="6" sm="6">
              <p
                style={{ fontSize: "17px", fontWeight: "200" }}
                className="heroCardHeadingfactoryHomepage"
              >
                Camera Vise Alerts
              </p>

              <Card style={{ marginRight: -10, marginBottom: 10 }}>
                <CardBody>
                  <ReactApexChart
                    options={cameraWiseAlerts}
                    series={cameraWiseAlerts?.series}
                    type="bar"
                    height={cameraWiseAlerts?.chart?.height}
                  />
                </CardBody>
              </Card>
            </Col>

            {/* <Col xxl='3' xl='6' lg='6' md='12'>
            <p style={{ fontSize: '17px', fontWeight: '200' }} className='heroCardHeadingfactoryHomepage'>Time Vise Alerts</p>

            <Card>
              <CardBody>
                <ReactApexChart
                  options={chartOptions2}
                  series={chartOptions2.series}
                  type="bar"
                  height={chartOptions2.chart.height}
                />
              </CardBody>
            </Card>
          </Col> */}
          </Row>

          {/* CAMERA GALLERY */}
          <Row>
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                flexWrap: "wrap",
              }}
            >
              <p className="m-0 p-0" style={{ fontSize: "17px" }}>
               Recent Alerts
              </p>

              <Link
                to={`${process.env.PUBLIC_URL}/dashboard/reports/${role}`}
              >
                <ViewAllButton btnText="View All" icon={img} />
              </Link>
            </div>
          </Row>
          <Row className="CameraParent mt-3">
            {dashboardData?.recent_alerts?.map((key, index) => (
              <Col xl="3" md="4" sm="4" xs="6" className="Cameracard " key={index}>
          
                <div
                  className="camera_iamges"
                  onClick={() => {
                    handleImage(key);
                  }}
                >
                  <img className="single_image" src={key?.image} alt="" />
                </div>
                
                <p style={{ marginBlock: "8px" }}>{key?.camera_name}</p>
              </Col>
            ))}
          </Row>

          {/* <section>
            <Modal
              show={show}
              onHide={() => {
                setShow(false);
              }}
              size="md"
              centered
              // style={{ width: "100%" }}
            >
              <div className="imageshow">
                <img src={imgPath} alt="image" className="img-fluid" />
              </div>
            </Modal>
          </section> */}
        </section>
      )}
    </Container>
      </>
  );
};

export default FactoryPPEModal;
