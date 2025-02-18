import React, { Fragment, useEffect, useState } from "react";
import { Card, Col, Container, Modal, Row } from "react-bootstrap";
import { H4, H5, H6, P } from "../../../../../AbstractElements";
import img from "../../../../../assets/images/dashboard/vieww.svg";
import ViewAllButton from "../../../../Common/newButton/index";
import AreaSpalineChartClass from "../../../../Charts/ApexCharts/AreaSpalineChart";
import AlertList from "../../../../Tables/DatatableForArea/DataTable/Index";
import {
  areaTableData,
  tableColumnsForArea,
} from "../../../../../Data/Table/DummyTableData";
import smallCards from "../../../CompanyDashbaord/StaticData/Data";
import ForkLiftTotalCard from "../../../CompanyDashbaord/Components/ForkLiftTotalCard";
import Chart from "react-apexcharts";
import "./production.css";
import AllFilters from "../../../../Common/allFilters/AllFilters";
import { areaSpaline } from "../../../../Charts/ApexCharts/apexData";
import { getLastFourDates } from "../../../../../utils/previousDates";
import AreaService from "../../../../../api/areaService";
import { Loader } from "react-feather";
import Loader1 from "../../../../../CommonElements/Spinner/loader";
import { areas, factories, modules } from "../../../../../Data/staticData/data";
import { Link } from "react-router-dom";
import { nextDay } from "date-fns";
import SingleImage from "../../../../../Gallery/zoomin/SingleImage";


import { TransformWrapper, TransformComponent } from 'react-zoom-pan-pinch';
import { Button } from 'react-bootstrap';
import moment from "moment";
import { classname } from "../../../../../Constant";
import { formateDate } from "../../../../../utils/formatDate";

const Production = ({ mainTitle, type }) => {
  // bellow editing done for the filter  ------------xxx------------xxx-------------------

  const formatDate = (dateString) => {
    const date = new Date(dateString);
    // Ensure the date object is correctly set to the local time zone
    const day = date.getUTCDate(); // Use UTC methods to avoid timezone issues
    const month = date.toLocaleString("default", { month: "long" }); // Full month name
    const year = date.getUTCFullYear();

    return `${day} ${month} ${year}`;
  };
  const initialRole = JSON.parse(localStorage.getItem("role"));
  const [role, setRole] = useState(initialRole);
  const [dateHeading, setDateHeading] = useState("");
  const [selectedMonth, setSelectedMonth] = useState("");
  const [monthFormatChange, setmonthFormatChange] = useState();
  const [isDatePickerVisible, setIsDatePickerVisible] = useState(false);
  const [year, setYear] = useState();
  const [selectedYear, setSelectedYear] = useState(new Date());
  const today = new Date();
  const endDate = new Date(today);
  endDate.setDate(today.getDate() + 7);

  const endDateString = endDate.toISOString().split("T")[0];
  const formattedEndDate = formatDate(endDateString);

  const handleChange = (event) => {
    const value = event.target.value; // value in yyyy-mm format
    setSelectedMonth(value);

    const [year, month] = value.split("-");
    // Correctly adjust month index for Date object
    const monthIndex = Number(month) - 1; // Convert 1-based month to 0-based index
    const monthName = new Date(year, monthIndex, 1).toLocaleString("default", {
      month: "long",
    });

    setmonthFormatChange(`${monthName} ${year}`);
  };

  const handleYear = (date) => {
    if (date) {
      setSelectedYear(date);
      setIsDatePickerVisible(!isDatePickerVisible);
    }
  };
  useEffect(() => {
    if (mainTitle === "Daily Report") {
      setDateHeading(`${formattedStartDate}`);
    } else if (mainTitle === "Weekly Report") {
      setDateHeading(`${formattedStartDate}   to   ${formattedEndDate}`);
    } else if (mainTitle == "Monthly Report") {
      const now = new Date();
      const year = now.getFullYear();
      const month = now.getMonth() + 1;
      const monthName = new Date(`${year}-${month}-01`).toLocaleString(
        "default",
        { month: "long" }
      );
      setmonthFormatChange(`${monthName} ${year}`);
    } else if (mainTitle == "Yearly Report") {
      if (selectedYear) {
        // Format the year to a string (e.g., '2024')
        setYear(selectedYear.getFullYear().toString());
      }
    }
  }, []);

  // end ------------xxx------------xxx-------------------

  const startDat = today.toLocaleDateString("en-CA");
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
  //filters end

  const [data, setData] = useState(areaTableData);
  const [newData, setNewData] = useState(undefined);
  const [initialLoad, setInitialLoad] = useState(true);
  const [loader, setLoader] = useState(false);


  const [allData, setAllData] = useState({
    donut: {
      series: [40, 40, 20],
    },
    barChart: {
      series: [450, 350, 250],
    },
    areaSpaline: areaSpaline,

    smallCards: smallCards,
  });
  const [columns, setColumns] = useState([
    {
      name: "Sr.",
      selector: (row) => row.id,
      // sortable: true,
    },

    {
      name: "Violation severity",
      selector: (row) => row.VioSeverity,
      // sortable: true,
    },

    {
      name: "Module",
      selector: (row) => row.module,
      // sortable: true,
    },
    {
      name: "Violation",
      selector: (row) => row.violation,
      // sortable: true,
    },
    {
      name: "Violation Area",
      selector: (row) => row.violationArea,
      // sortable: true,
    },
    // {
    //   name: "Camera Name",
    //   selector: (row) => row.camera_name,
    //   // sortable: true,
    // },
    {
      name: "Date",
      selector: (row) => row.date,
      sortable: true,
      sortFunction: (a, b) => new Date(b.date) - new Date(a.date),
    },
    {
      name: "Time",
      selector: (row) => row.time,
      sortable: true,
      sortFunction: (a, b) => {
        // First, compare by date in descending order
        const dateComparison = new Date(b.date) - new Date(a.date);
        if (dateComparison !== 0) return dateComparison;

        // If dates are the same, compare by time in descending order (AM/PM format)
        const convertTo24HourFormat = (timeStr) => {
          const [time, modifier] = timeStr.split(" "); // e.g., "02:30 PM" becomes ["02:30", "PM"]
          let [hours, minutes] = time.split(":").map(Number);

          // Convert hours to 24-hour format
          if (modifier === "PM" && hours !== 12) {
            hours += 12;
          } else if (modifier === "AM" && hours === 12) {
            hours = 0;
          }

          return { hours, minutes };
        };

        // Convert both times to 24-hour format
        const { hours: hoursA, minutes: minutesA } = convertTo24HourFormat(
          a.time
        );
        const { hours: hoursB, minutes: minutesB } = convertTo24HourFormat(
          b.time
        );

        // Compare by hours and minutes in descending order
        return hoursB - hoursA || minutesB - minutesA;
      },
    },
    {
      name: "Image",
      cell: (row) => (
        <img
          src={row.image}
          alt="Violation"
          onClick={() => handleRowClick(row)}
          style={{
            width: "70px",
            height: "50px",
            borderRadius: "10px",
            marginBlock: "10px",
          }}
        />
      ),
    },
  ]);
  const [filteredData, setFilteredData] = useState([]); // Store filtered data
  const [chartOptions, setChartOptions] = useState({
    chart: {
      type: "bar",
      height: 400,
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
        fontSize: "15px", // Font size of the title
        color: "#6d6f70", // Title color, you can change it dynamically
        fontFamily: "Arial",
        fontWeight: "400",
      },
    },
    plotOptions: {
      bar: {
        distributed: true, // Different colors for each bar
        borderRadius: 5, // Rounds the top borders of bars
        columnWidth: "40px", // Increase bar width, adjust as needed
        horizontal: false,
      },
    },
    colors: ["#0b76b7", "#41b2ef", "#83cdf6"], // Custom colors for each bar
    dataLabels: {
      enabled: false,
    },
    xaxis: {
      categories: ["Shift A", "Shift B", "Shift C"],
      // categories: ["Helmet Module", "Emergency Exit", "Machine Guard"],
      labels: {
        rotate: -45,
        rotateAlways: false,
        style: {
          colors: ["#6D6F70"], // Color for the x-axis values
          fontSize: "12px",
        },
      },
      title: {
     
        // text: 'Category'
      },
      // labels: {
      //   show:false}
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
    legend: {
      show: false,
      offsetX: 5, 
      offsetY: 0,
      formatter: function (label, opts) {
        const series = opts.w.globals.series[0]; // Access the data array
        const total = series.reduce((acc, val) => acc + val, 0);
        const percentage = ((series[opts.seriesIndex] / total) * 100).toFixed(
          1
        );
        return `<div style="width:150px; display:flex; justify-content:space-between; align-items:center;">${label} <span>${
          series[opts.seriesIndex]
        }</span></div>`;
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
        data: [], // Data for each bar
        // data: allData.barChart.series, // Data for each bar
      },
    ],
  });

  const [donut, setDonut] = useState({
    options: {
      grid: {
        padding: {
          top: 20,
          bottom: 30,
          left: 20,
          right: 20,
        },
      },
      chart: {
        height: 440,
        type: "radialBar",
        toolbar: {
          show: false,
        },
      },
      labels: ["Helmet Module", "Emergency Exit", "Machine Guard"], 
      colors: ["#0b76b7", "#41b2ef", "#bde3fa", "#1e67d6"],
      dataLabels: {
        enabled: false,
      },
      legend: {
        show: false,
        position: "bottom",
        markers: {
          size: 7,
          shape: "square",
        },
        formatter: function (label, opts) {
          const series = opts?.w?.globals.series;
          return `<div style="width:160px; display:flex;  align-items:center; color: #6D6F70;">${label} <span style="margin-left: 2px; font-size:15px; " >${
            series[opts?.seriesIndex]
          }</span></div>`;
        },
        labels: {
          colors: ["#6D6F70"], // Color for legend text
          fontSize: "12px",
        },
        offsetX: 0,
        offsetY: -15,
      },
      plotOptions: {
        pie: {
          donut: {
            size: "55%", // Increase the size of the donut
            labels: {
              show: true,
              name: {
                show: false,
                fontSize: "22px",
                fontFamily: "Helvetica, Arial, sans-serif",
                color: "#373d3f",
                offsetY: -10,
              },
              value: {
                show: true,
                fontSize: "30px",
                fontFamily: "Helvetica, Arial, sans-serif",
                fontWeight: "bold",
                color: "#6D6F70", // Set the color for the value inside the donut
                offsetY: 16,
                formatter: function (val) {
                  return val;
                },
              },
              total: {
                show: true,
                color: "#6D6F70",
                formatter: function (w) { 
                  const total = w.globals.seriesTotals.reduce((acc, val) => acc + val, 0);
                 
                  const percentages = w.globals.seriesTotals.map(value => (value / total) * 100);
                
                  const averagePercentage = percentages.reduce((acc, val) => acc + val, 0) / percentages.length;

                  // Display the average of the percentages
                  return `${averagePercentage.toFixed(0)}%`;
                }
                
              },
              // total: {
              //   show: true,
              //   color: "#6D6F70", // Set the color for the total
              //   formatter: function (w) {
              //     // Find and return the maximum value from the series
              //     const maxValue = w.globals.seriesTotals[0];
              //     return `${maxValue}`;
              //   },
              // },
            },
          },
        },
        radialBar: {
          hollow: {
            margin: 0,
            size: "70%",
            background: "#293450",
          },
          track: {
            dropShadow: {
              enabled: true,
              top: 2,
              left: 0,
              blur: 4,
              opacity: 0.15,
            },
          },
          dataLabels: {
            name: {
              offsetY: -10,
              color: "#fff",
              fontSize: "13px",
            },
            value: {
              color: "#fff",
              fontSize: "30px",
              show: true,
            },
          },
        },
      },
    },
    series: [0, 0, 0],
  });

  //fetch dashboard dashboard data
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
    AreaService.getAreaDashboard(payload)
      .then((res) => {
        const resp = res?.data?.data;

        // Set Modules Line Graph
        const helmet_data = {
          name: "Helmet Module",
          data: resp?.daily_alerts?.map((item) => item?.value !== 0 ? item?.value : null),
        };
        setAllData({
          ...allData,
          areaSpaline: {
            ...areaSpaline,
            series: [helmet_data],
            options: {
              ...areaSpaline.options,
              xaxis: {
                ...areaSpaline?.options?.xaxis,
                categories: resp?.daily_alerts?.map((i) => i?.label),
              },
            },
          },
        });

        const updated_alerts = [...resp?.recent_alert.slice(0, 4)]?.map(
          (i, index) => ({
            ...i,
            id: index + 1,
          })
        );
        setData(updated_alerts);

        // Set Donut Chart Data
        const total_daily_alerts = resp?.total_daily_alerts || 0;
        const total_daily_helmet_alerts = resp?.total_daily_helmet_alerts || 0;
        const remaining_alerts = total_daily_alerts - total_daily_helmet_alerts;

        let emergency_alerts = 0;
        let machine_alerts = 0;


        if (remaining_alerts % 2 === 0) {
          emergency_alerts = remaining_alerts / 2;
          machine_alerts = remaining_alerts / 2;
        } else {
          // If odd, assign one extra alert to emergency_alerts
          emergency_alerts = Math.ceil(remaining_alerts / 2); // Greater half goes to emergency alerts
          machine_alerts = Math.floor(remaining_alerts / 2); // Lesser half goes to machine alerts
        }
        
        setDonut({
          ...donut,
          series: [total_daily_helmet_alerts, emergency_alerts, machine_alerts],
        });
        handleAnalyticsData(resp, emergency_alerts, machine_alerts);


        const { shift1, shift2, shift3 } = groupByShifts(resp?.shift_alerts);

        // Shift wise Alerts
        setChartOptions({
          ...chartOptions,
          series: [
            {
              name: "Alerts",
              data: [shift1, shift2, shift3],
            },
          ],
        });

        setLoader(false);
      })
      .catch((e) => {
        setLoader(false);
      });
  };

  useEffect(() => {
    const today_date = new Date().toLocaleDateString("en-CA");
    if (selectedDate === today_date) {
      const interval = setInterval(() => {
        fetchDashboard(selectedDate);
      }, 5000);
      return () => clearInterval(interval);
    }
    return () => {};
  }, [selectedDate]);

  const groupByShifts = (daily_data) => {
    // console.log(daily_data)
    let shift1 = 0, shift2 = 0, shift3 = 0;

    daily_data?.forEach(item => {
      const hour = item.hour;
      const firstDate = daily_data?.length > 0 ? daily_data[0]?.date: "";
      const isFirstDay = item.date === firstDate;

      // Shift 1: 8 AM to 4 PM (8 - 14)
      if (isFirstDay && hour >= 8 && hour <= 14) {
        
        shift1 += item.value;
      }
      // Shift 2: 4 PM to 12 AM (16 - 24)
      else if (hour >= 16 && hour < 24) {
        shift2 += item.value; 
      }
      // Shift 3: 12 AM to 8 AM (0 - 8)
      else if ((hour >= 0 && hour < 8) || (hour === 8 && !isFirstDay)) {
       
        shift3 += item.value;
      } 
    });
    return { shift1, shift2, shift3 };
  };



  const handleAnalyticsData = (resp, emergency_alerts, machine_alert) => {
    // TOTAL
    const total_card = smallCards?.findIndex((i) => i.title === "Total");
    if (total_card !== -1 || total_card !== undefined) {
      smallCards[total_card].total = resp?.total_daily_alerts?.toString();
      smallCards[total_card].chart.series[0].data = [];
    }

    // HELMET MODULE
    const helmet_card = smallCards?.findIndex(
      (i) => i.title === "Helmet Module"
    );
    if (helmet_card !== -1 || helmet_card !== undefined) {
      smallCards[helmet_card].total =
        resp?.total_daily_helmet_alerts?.toString();
      smallCards[helmet_card].chart.series[0].data = resp?.daily_alerts?.map(
        (i) => i?.value
      );
    }

    // EMERGENCY EXIT MODULE
    const emergency_card = smallCards?.findIndex(
      (i) => i.title === "Emergency Exit"
    );
    if (emergency_card !== -1 || emergency_card !== undefined) {
      smallCards[emergency_card].total = emergency_alerts?.toString();
    }

    // MACHINE GUARD MODULE
    const machine_guard_card = smallCards?.findIndex(
      (i) => i.title === "Machine Guard"
    );
    if (machine_guard_card !== -1 || machine_guard_card !== undefined) {
      smallCards[machine_guard_card].total = machine_alert?.toString();
    }
  };

  const sortbyHour = (list) => {
    return list?.sort((a, b) => parseInt(a.hour) - parseInt(b.hour));
  };
  
  const sortbyMonth = (list) => {
    return list?.sort((a, b) => parseInt(a.month) - parseInt(b.month));
  };
  const sortbyDay = (list) => {
    return list?.sort((a, b) => parseInt(a.day) - parseInt(b.day));
  };

  function handleDeleteClick(row) {
    const filteredd = data.filter((item) => item !== row);
    setData(filteredd);
  }

  function handleDateChange(e) {
    if (!e.target.value) {
      const today_date = new Date().toLocaleDateString("en-CA");

      setSelectedDate(today_date);
      setStartDate(today_date);
      setLoader(true);
      fetchDashboard(today_date);
    } else {
      setSelectedDate(e.target.value);
      setLoader(true);
      fetchDashboard(e.target.value);
    }

    // if (mainTitle === 'Daily Report') {
    //   const date = new Date(e.target.value); // Selected date
    //   const newDate = date.toISOString().split('T')[0]
    //   const formattedNewDate = formatDate(newDate)
    //   setSelectedDate(newDate)
    //   console.log('daily date',selectedDate)
    //   setDateHeading(formattedNewDate);
    //   // setOpenDate(true)
    // }
    // else if (mainTitle == 'Weekly Report') {
    //   const date = new Date(e.target.value); // Selected date
    //   const endDate = new Date(date);
    //   endDate.setDate(date.getDate() + 7); // Add 7 days to the selected date

    //   // Format dates to yyyy-mm-dd
    //   const formattedStartDate = e.target.value;
    //   const formattedEndDate = endDate.toISOString().split('T')[0];
    //   const newFirstDate = formatDate(formattedStartDate)
    //   const newEndDate = formatDate(formattedEndDate)
    //   setSelectedDate(formattedStartDate);
    //   setDateHeading(`${newFirstDate} to ${newEndDate}`);

    // }
  }

  const handleInputChange = (e, field) => {
    setFilters({
      ...filters,
      [field]: e.target.value,
    });
    // applyFilters({ ...filters, [field]: e.target.value });
  };
  const style = { width: "158px", height: "48px" };
  // filters functions end

  const [modalData, setModalData] = useState({});
  const [showModal, setShowModal] = useState(false);
  const [isOpen, setIsOpen] = useState(false)
  const [imageData, setImageData] = useState({})


  
  const handleRowClick = (item) => {
    console.log("Item:",item)
    setImageData({
      cameraName: item?.camera_name,
      date: item?.date,
      time: item?.time
    })
    setModalData(item);
    // setShowModal(!showModal);
    setIsOpen(true)
  };

  return (
    <Fragment>
       {isOpen && <SingleImage photo={modalData?.image} isOpen={isOpen} setIsOpen={setIsOpen} imageData={imageData}  />  }
      <Container className="dashboard-first-page" fluid={true}>
        {loader ? (
          <div style={{ marginTop: 90 }}>
            <Loader1 />
          </div>
        ) : (
          <>
            {/* DATE FILTER */}
            <Row className="mb-4">
            
            </Row>
            <Row className="d-flex justify-content-between align-items-center mb-4">
              {type === "Distribution" ? (
                <>
                  <Col xs="12" lg="5">
                    <H4>{mainTitle}</H4>
                  </Col>
                  <AllFilters
                    handleInputChange={handleInputChange}
                    style={style}
                    areas={areas}
                    selectedDate={selectedDate}
                    startDate={startDate}
                    handleDateChange={handleDateChange}
                    typedate={"date"}
                    dateInputShow={true}
                  />
                </>
              ) : type === 'area' ? <>
              <Col xs="12" lg="6">
                <H4 attrH4={{
                  className:"d-inline",
                }} >{mainTitle ? mainTitle : "Refrigeration Area"} - </H4>
                <H5
                attrH5={{
                  className:"d-inline",
                }}
                >{ moment(selectedDate, "YYYY-MM-DD").format("DD MMM, YYYY")}</H5>
              </Col>
              <Col xs="12" lg="6" className="d-flex justify-content-end">
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
              </> : type === "Warehouse" ? (
                <>
                  <Col xs="12" lg="5">
                    <H4>{mainTitle}</H4>
                  </Col>
                  <AllFilters
                    handleInputChange={handleInputChange}
                    style={style}
                    modules={modules}
                    selectedDate={selectedDate}
                    startDate={startDate}
                    handleDateChange={handleDateChange}
                    typedate={"date"}
                    dateInputShow={true}
                  />
                </>
              ) : type === "Production" ? (
                <>
                  <Col xs="12" lg="5">
                    <H4>{mainTitle}</H4>
                  </Col>
                  <AllFilters
                    handleInputChange={handleInputChange}
                    style={style}
                    selectedDate={selectedDate}
                    startDate={startDate}
                    handleDateChange={handleDateChange}
                    typedate={"date"}
                    dateInputShow={true}
                  />
                </>
              ) : type === "Default" ? (
                <>
                  <Col xs="12" lg="5">
                    <H4>{mainTitle}</H4>
                  </Col>

                  <AllFilters
                    handleInputChange={handleInputChange}
                    style={style}
                    selectedDate={selectedDate}
                    startDate={startDate}
                    handleDateChange={handleDateChange}
                    typedate={"date"}
                    dateInputShow={true}
                  />
                </>
              ) : mainTitle === "Refrigeration Area" ? (
                <>
                  <Col xs="12" lg="5">
                    <H4>{mainTitle}</H4>
                  </Col>

                  <AllFilters
                    handleInputChange={handleInputChange}
                    style={style}
                    selectedDate={selectedDate}
                    startDate={startDate}
                    handleDateChange={handleDateChange}
                    typedate={"date"}
                    dateInputShow={true}
                  />
                </>
              ) : mainTitle === "Daily Report" ? (
                <>
                  <Col xs="12" lg="5">
                    <H4>
                      Day -{" "}
                      <span style={{ color: "black" }}>{dateHeading}</span>
                    </H4>
                  </Col>

                  <AllFilters
                    handleInputChange={handleInputChange}
                    style={style}
                    selectedDate={selectedDate}
                    startDate={startDate}
                    handleDateChange={handleDateChange}
                    typedate={"date"}
                    dateInputShow={true}
                  />
                </>
              ) : mainTitle === "Weekly Report" ? (
                <>
                  <Col xs="12" lg="5">
                    <H4>
                      Week -{" "}
                      <span style={{ color: "black", fontWeight: "0" }}>
                        {dateHeading}
                      </span>
                    </H4>
                  </Col>
                  <AllFilters
                    handleInputChange={handleInputChange}
                    style={style}
                    modules={modules}
                    selectedDate={selectedDate}
                    startDate={startDate}
                    handleDateChange={handleDateChange}
                    typedate={"date"}
                    dateInputShow={true}
                  />
                </>
              ) : mainTitle === "Monthly Report" ? (
                <>
                  <Col xs="12" lg="5">
                    <H4>Month - {monthFormatChange}</H4>
                  </Col>
                  <AllFilters
                    handleInputChange={handleInputChange}
                    style={style}
                    modules={modules}
                    selectedDate={selectedDate}
                    startDate={startDate}
                    handleDateChange={handleDateChange}
                    typedate={"date"}
                    dateInputShow={false}
                    monthly={true}
                    handleChange={handleChange}
                    selectedMonth={selectedMonth}
                    setSelectedMonth={setSelectedMonth}
                    monthFormatChange={monthFormatChange}
                  />
                </>
              ) : mainTitle === "Yearly Report" ? (
                <>
                  <Col xs="12" lg="5">
                    <H4>Year - {year}</H4>
                  </Col>
                  <AllFilters
                    handleInputChange={handleInputChange}
                    style={style}
                    modules={modules}
                    selectedDate={selectedDate}
                    startDate={startDate}
                    handleDateChange={handleDateChange}
                    typedate={"date"}
                    dateInputShow={false}
                    yearly={true}
                    handleYear={handleYear}
                    selectedYear={selectedYear}
                    setSelectedYear={setSelectedYear}
                    setYear={setYear}
                    year={year}
                    isDatePickerVisible={isDatePickerVisible}
                    setIsDatePickerVisible={setIsDatePickerVisible}
                  />
                </>
              ) : type === "emergency" ? (
                <>
                  <Col xs="12" lg="5">
                    <H4>{mainTitle}</H4>
                  </Col>
                  <AllFilters
                    handleInputChange={handleInputChange}
                    style={style}
                    selectedDate={selectedDate}
                    startDate={startDate}
                    handleDateChange={handleDateChange}
                    typedate={"date"}
                    dateInputShow={true}
                  />
                </>
              ) : type === "factory-one" ? (
                <>
                  <Col xs="12" lg="5">
                    <H4>{mainTitle}</H4>
                  </Col>
                  <AllFilters
                    handleInputChange={handleInputChange}
                    modules={modules}
                    style={style}
                    areas={areas}
                    selectedDate={selectedDate}
                    startDate={startDate}
                    handleDateChange={handleDateChange}
                    typedate={"date"}
                    dateInputShow={true}
                  />
                </>
              ) : type === "factory-two" ? (
                <>
                  <Col xs="12" lg="5">
                    <H4>{mainTitle}</H4>
                  </Col>
                  <AllFilters
                    handleInputChange={handleInputChange}
                    modules={modules}
                    style={style}
                    areas={areas}
                    selectedDate={selectedDate}
                    startDate={startDate}
                    handleDateChange={handleDateChange}
                    typedate={"date"}
                    dateInputShow={true}
                  />
                </>
              ) : type === "factory-three" ? (
                <>
                  <Col xs="12" lg="5">
                    <H4>{mainTitle}</H4>
                  </Col>
                  <AllFilters
                    handleInputChange={handleInputChange}
                    modules={modules}
                    style={style}
                    areas={areas}
                    selectedDate={selectedDate}
                    startDate={startDate}
                    handleDateChange={handleDateChange}
                    typedate={"date"}
                    dateInputShow={true}
                  />
                </>
              ) : null}
            </Row>

            {/* MODULES , ANALYTICS & MODULES PERCENTAGE */}
            <Row xs="12" className="mt-2">
              <Col xs="12" xl="6" xxl="3">
                <P attrPara={{ className: "", style: { fontSize: "16px" } }}>
                    Alerts distribution
                </P>
                <Card className="area-cardd" style={{marginRight: -15, marginBottom: 10 }}>
                  <Chart
                    options={donut?.options}
                    series={donut?.series}
                    type="donut"
                    height={donut?.options?.chart?.height}
                  />
                </Card>
              </Col>

              <Col xs="12" xl="6" xxl="4">
                <P attrPara={{ className: "", style: { fontSize: "16px" } }}>
                  Shifts
                </P>
                <Card
                  className="area-cardd"
                  style={{ marginRight: -15, marginBottom: 10 }}
                >
                  <Chart
                    options={chartOptions}
                    series={chartOptions.series}
                    type="bar"
                    height={chartOptions.chart.height}
                  />
                </Card>
              </Col>

              <AreaSpalineChartClass areaSpaline={allData?.areaSpaline} colSize={'5'} />
            </Row>

            {/* CURRENT MONTH ALERTS & RECENT ALERTS */}
            <Row>
              {/* <Col xs="12" xxl="5" xl="6">
                <P attrPara={{ className: "", style: { fontSize: "16px" } }}>
                  Module Results
                </P>
                <Card
                  className="area-card-bar"
                  style={{ marginRight: -10, marginBottom: 10 }}
                >
                  <Chart
                    options={chartOptions}
                    series={chartOptions.series}
                    type="bar"
                    height={chartOptions.chart.height}
                  />
                </Card>
              </Col> */}
              <Col xs="12">
                <Row>
                  <Col xs='12' className="d-flex justify-content-between">
                    <P attrPara={{ className: "", style: { fontSize: "16px" } }}>
                      Recent Alerts
                    </P>
                    <Link to={`${process.env.PUBLIC_URL}/dashboard/reports/${role}`}>
                      <ViewAllButton btnText={'View All Alerts'} />
                    </Link>
                  </Col>
                </Row>


                <AlertList
                  dummytabledata={data}
                  tableColumns={columns}
                  noCardHeader={true}
                  pagination_options={[]}
                  pagination={false}
                  // height={430}
                />
              </Col>
            </Row>

          


            
            {/* {showModal && (
              <Modal
                show={showModal}
                onHide={() => {
                  setShowModal(false);
                }}
                centered
                style={{ width: "100%" }}
              >
                <div className="imageshow">
                  <img
                    src={modalData?.image}
                    alt="image"
                    className="img-fluid"
                  />
                </div>
            
              </Modal>
            )} */}
        

          </>
        )}
      </Container>
      
    </Fragment>
  );
};

export default Production;
